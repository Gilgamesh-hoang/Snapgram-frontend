import {Link, useNavigate, useParams} from "react-router-dom";

import {Button} from "@/components/ui";
import {Loader, PostStats} from "@/components/shared";

import {formatDateString, multiFormatDateString2} from "@/utils/dateUtil";
import React, {useEffect, useState} from "react";
import {getPostsById, savedPost} from "@/services/post.ts";
import {Comment, Post} from "@/model/type.ts";
import {getCommentsByPostId} from "@/services/comment.ts";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import {routes} from "@/route";
import Tippy from "@tippyjs/react";
import {useUserContext} from "@/context/AuthContext.tsx";
import CarouselPost from "@/components/shared/CarouselPost.tsx";
import {PAGE_SIZE_COMMENT} from "@/constants";

const PostDetails: React.FC = () => {
    const navigate = useNavigate();
    const {user, isLoadingContext} = useUserContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        if (id) {
            getPostsById(id).then((data) => {
                setPost(data);
                setIsLoading(false)
                setIsSaved(data.isSaved)
            }).catch(() => {
                navigate(-1);
            });
        }
    }, []);

    useEffect(() => {
        if (id) {
            getCommentsByPostId(id, page, PAGE_SIZE_COMMENT).then((data) => {
                setComments((prev) => [...prev, ...data]);
                if (data.length < PAGE_SIZE_COMMENT) {
                    setHasMore(false);
                }
            }).catch(() => {
                setHasMore(false);
            });
        }
    }, [page]);

    if (!post || isLoading || isLoadingContext) {
        return <Loader/>;
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
                            <Link to={routes.profile.replace(":nickname/*", post.creator.nickname)}>
                                <img
                                    src={post.creator.avatarUrl || "/assets/icons/profile-placeholder.svg"}
                                    alt="creator"
                                    className="size-8 rounded-full lg:size-12"
                                />
                            </Link>
                            <div className="flex flex-col gap-1">
                                <Link to={routes.profile.replace(":nickname/*", post.creator.nickname)}>
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
                            {user.id === post.creator.id && (
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
                            <PostStats post={post}/>
                        </div>
                        <hr className=" border border-dark-4/80"/>
                    </div>
                    {/*show comments*/}
                    <div className='show_comments-container'>
                        <ul className='flex flex-col'>
                            {comments.length > 0 && (
                                <InfiniteScroll
                                    loader={<Loader/>}
                                    fetchMore={() => setPage((prev) => prev + 1)}
                                    hasMore={hasMore}
                                >
                                    {comments.map((comment, index) => (
                                        <li className='mb-7' key={index}>
                                            <Link className='mb-3 flex items-center'
                                                  to={routes.profile.replace(":nickname/*", comment.creator.nickname)}>
                                                <img
                                                    src={comment.creator.avatarUrl || "/assets/icons/profile-placeholder.svg"}
                                                    alt="user"
                                                    className="mr-3 size-7 rounded-full"
                                                />
                                                <p className='text-light-3'>{comment.creator.nickname}</p>
                                            </Link>
                                            {/*<div className='mb-3 flex items-center'>*/}
                                            {/*    <img*/}
                                            {/*        src={comment.creator.avatarUrl || "/assets/icons/profile-placeholder.svg"}*/}
                                            {/*        alt="user"*/}
                                            {/*        className="mr-3 size-7 rounded-full"*/}
                                            {/*    />*/}
                                            {/*    <p className='text-light-3'>{comment.creator.nickname}</p>*/}
                                            {/*</div>*/}

                                            <div>
                                                <p className='small-regular mb-2'>{comment.content}</p>
                                                <div className="flex-start gap-2 text-light-3">
                                                    <Tippy
                                                        placement={"bottom-start"}
                                                        delay={[200, 0]}
                                                        offset={[0, -2]}
                                                        content={
                                                            <div
                                                                className="subtle-semibold rounded-xl bg-white p-2 text-dark-2">
                                                                {formatDateString(post.createdAt)}
                                                            </div>}
                                                    >
                                                        <p className="subtle-semibold lg:small-regular me-3">
                                                            {multiFormatDateString2(comment.createdAt)}
                                                        </p>
                                                    </Tippy>

                                                    <div className='flex cursor-pointer items-center'>
                                                        <img
                                                            src={"/assets/icons/reply.svg"}
                                                            alt="reply"
                                                        />
                                                        <span className='ms-1.5 text-light-2'>Trả lời</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </InfiniteScroll>
                            )}
                        </ul>
                    </div>

                    {/*comment input*/}
                    <div className='flex h-7 w-full items-center'>
                        <img
                            src={"/assets/icons/profile-placeholder.svg"}
                            alt="user"
                            className="mr-3 size-7 rounded-full"
                        />

                        <form className="relative flex w-full gap-5">
                            <input
                                type="text"
                                className="h-9 w-full rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                                placeholder='Thêm bình luận...'
                            />
                            <button className='absolute bottom-1/4 right-3'>
                                <img
                                    src={"/assets/icons/send-secondary.svg"}
                                    alt="send"
                                    width={20}
                                    height={20}
                                    className={'text-secondary-500'}
                                />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
};

export default PostDetails;
