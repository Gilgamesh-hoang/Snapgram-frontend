import {Link, useNavigate, useParams} from "react-router-dom";

import {Button} from "@/components/ui";
import {Loader, PostStats} from "@/components/shared";

import {formatDateString, multiFormatDateString2} from "@/utils/dateUtil";
import React, {useEffect, useRef, useState} from "react";
import {getPostsById, savedPost} from "@/services/post.ts";
import {Comment, Post} from "@/model/type.ts";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import {routes} from "@/route";
import Tippy from "@tippyjs/react";
import {useUserContext} from "@/context/AuthContext.tsx";
import CarouselPost from "@/components/shared/CarouselPost.tsx";
import {generateProfileLink} from "@/utils/common.ts";
import CommentForm from "@/components/forms/CommentForm.tsx";
import {useDispatch} from "react-redux";
import {setCommentCount} from "@/redux/postSlice.ts";
import useCommentNode from "@/hooks/useCommentNode.ts";
import CommentNested from "@/components/shared/CommentNested.tsx";
import {filterLiked, getCommentsByPostId} from "@/services/comment.ts";
import {PAGE_SIZE_COMMENT} from "@/constants";
import {AppDispatch} from "@/redux/store.ts";
import Element = React.JSX.Element;

const PostDetails: React.FC = () => {
    const dispatch =  useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {id} = useParams();
    const {userContext, isLoadingContext} = useUserContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const [commentLikedIds, setCommentLikedIds] = useState<string[]>([]);
    const [isFilterCommentLikedFetching, setIsFilterCommentLikedFetching] = useState(false);
    const {insertNode, editNode, deleteNode} = useCommentNode();

    const handleInsertNode = (parentId: string | null, item: Comment | Comment[], placement?: 'BEGIN' | 'END') => {
        const finalStructure = insertNode(comments, parentId, item, placement);
        setComments(finalStructure);
    };

    const handleEditNode = (commentId: string, content: string) => {
        const finalStructure = editNode(comments, commentId, content);
        setComments(finalStructure);
    };

    const handleDeleteNode = (commentId: string) => {
        const finalStructure = deleteNode(comments, commentId);
        setComments(finalStructure);
    };


    useEffect(() => {
        if (id) {
            getPostsById(id).then((data) => {
                setPost(data);
                setIsLoading(false)
                setIsSaved(data.isSaved)
                // set comment count in redux
                dispatch(setCommentCount({postId: data.id, count: data.commentCount}));
            }).catch(() => {
                navigate(-1);
            });
        }
    }, []);

    useEffect(() => {
        if (id) {
            getCommentsByPostId(id, page, PAGE_SIZE_COMMENT)
                .then((data) => {
                    setComments((prev) => [...prev, ...data]);
                    if (data.length < PAGE_SIZE_COMMENT) {
                        setHasMore(false);
                    }
                    return data.map((item) => item.id);
                })
                .then((commentIds) => {
                    setIsFilterCommentLikedFetching(true);
                    filterLiked(commentIds).then((data: string[]) => {
                        setCommentLikedIds(prev => [...prev, ...data]);
                    }).finally(() => {
                        setIsFilterCommentLikedFetching(false);
                    });
                })
                .catch(() => {
                    setHasMore(false);
                });
        }
    }, [page]);

    if (!post || isLoading || isLoadingContext) {
        return <Loader/>;
    }
    const onCommentSuccess = (comment: Comment) => {
        handleInsertNode(null, comment);
    }
    const handleDeletePost = () => {
        navigate(-1);
    };

    const handleSavePost = () => {
        const oldValue = isSaved;
        const newValue = !isSaved;
        setIsSaved(newValue);
        savedPost(post.id, newValue).catch(() => {
            setIsSaved(oldValue);
        })
    }

    const renderComment = () => {
        if (isFilterCommentLikedFetching) {
            return <Loader/>;
        }
        const results: Element[] = [];

        comments.forEach((item) => {
            if (commentLikedIds.includes(item.id)) {
                item.isLiked = true;
            }
            results.push(
                <CommentNested
                    key={item.id}
                    commentLikedIds={commentLikedIds}
                    setCommentLikedIds={setCommentLikedIds}
                    handleInsertNode={handleInsertNode}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    comment={item}
                    post={post}
                />
            );
        });
        return results;
    }

    return (
        <div className="post_details-container">
            <div className="hidden w-full max-w-5xl md:flex">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                    <img
                        src={"/assets/icons/back.svg"}
                        alt="back"
                        width={24}
                        height={24}
                    />
                    <p className="small-medium lg:base-medium">Trờ về</p>
                </Button>
            </div>

            <div className="post_details-card">
                <div
                    className="h-64 rounded-t-[30px] bg-dark-1 object-cover p-5 xs:h-[400px] lg:h-[450px] xl:w-[48%] xl:rounded-l-[24px] xl:rounded-tr-none">
                    <CarouselPost sources={post.media}/>

                </div>
                <div className="post_details-info">
                    <div className="flex-between w-full">
                        <div className="flex items-center gap-3">
                            <Link to={generateProfileLink(post.creator.nickname)}>
                                <img
                                    src={post.creator.avatarUrl || "/assets/icons/profile-placeholder.svg"}
                                    alt="creator"
                                    className="size-8 rounded-full lg:size-12"
                                />
                            </Link>
                            <div className="flex flex-col gap-1">
                                <Link to={generateProfileLink(post.creator.nickname)}>
                                    <p className="base-medium lg:body-bold text-light-1">
                                        {post.creator.nickname}
                                    </p>
                                </Link>
                                <div className=" gap-2 text-light-3">
                                    <Tippy
                                        placement={"bottom-end"}
                                        delay={[200, 0]}
                                        offset={[0, -2]}
                                        content={
                                            <div className="subtle-semibold rounded-xl bg-white p-2 text-dark-2">
                                                {formatDateString(post.createdAt)}
                                            </div>}
                                    >
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString2(post.createdAt)}
                                        </p>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        <div className="flex-center gap-4">
                            {userContext.id === post.creator.id && (
                                <>
                                    <Link to={routes.updatePost.replace(":id", post.id)}>
                                        <img
                                            src={"/assets/icons/edit.svg"}
                                            alt="edit"
                                            width={24}
                                            height={24}
                                        />
                                    </Link>

                                    <Button
                                        onClick={handleDeletePost}
                                        variant="ghost"
                                        className='post_details-delete_btn'>
                                        <img
                                            src={"/assets/icons/delete.svg"}
                                            alt="delete"
                                            width={24}
                                            height={24}
                                        />
                                    </Button>
                                </>
                            )}

                            <div className="flex gap-2"
                                 onClick={handleSavePost}
                            >
                                {isSaved ? (
                                    <img
                                        src={"/assets/icons/saved.svg"}
                                        alt="share"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <img
                                        src={"/assets/icons/save.svg"}
                                        alt="save"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer"
                                    />
                                )}

                            </div>
                        </div>

                    </div>
                    <div className="w-full">
                        <p className="small-regular lg:base-regular">{post.caption}</p>
                        <div className="w-full">
                            <ul className='mt-2 flex flex-wrap p-0'>
                                {post.tags.map((tag, index) => (
                                    <Link to={tag.name} key={index}>
                                        <li key={index}
                                            className="my-2 mr-4 flex list-none items-center justify-center rounded-md bg-primary-500 px-2">
                                            <span className='tag-title'>{tag.name}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <hr className=" border border-dark-4/80"/>
                        <div className=" my-4">
                            <PostStats post={post} commentInputRef={commentInputRef}/>
                        </div>
                        <hr className=" border border-dark-4/80"/>
                    </div>
                    {/*show comments*/}
                    <div className='show_comments-container'>
                        <div className='flex flex-col'>
                            {comments.length > 0 && (
                                <InfiniteScroll
                                    loader={<Loader/>}
                                    fetchMore={() => setPage((prev) => prev + 1)}
                                    hasMore={hasMore}
                                >
                                    {renderComment()}

                                </InfiniteScroll>
                            )}
                        </div>
                    </div>

                    {/*comment input*/}
                    <div className='flex h-fit w-full items-center'>
                        <CommentForm postId={post.id} onCommentSuccess={onCommentSuccess}
                                     commentInputRef={commentInputRef}/>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};
export default PostDetails;
