import React, {FC, useEffect, useRef, useState} from "react";
import {clsx} from "clsx";
import {Link} from "react-router-dom";
import {generateProfileLink} from "@/utils/common.ts";
import Avatar from "@/components/shared/Avatar.tsx";
import {Comment, Post} from "@/model/type.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {useDispatch} from "react-redux";
import {deleteComment, editComment, getRepliesByComment, replyComment} from "@/services/comment.ts";
import {adjustCommentCount, incrementCommentCount} from "@/redux/postSlice.ts";
import Tippy from "@tippyjs/react";
import {IoIosMore} from "react-icons/io";
import {formatDateString, multiFormatDateString2} from "@/utils/dateUtil.ts";
import Element = React.JSX.Element;

interface CommentNestedProps {
    comment: Comment;
    post: Post;
    handleInsertNode: (parentId: string, item: Comment | Comment[], placement?: 'BEGIN' | 'END') => void;
    handleEditNode: (commentId: string, content: string) => void;
    handleDeleteNode: (commentId: string) => void;
}

const CommentNested: FC<CommentNestedProps> = ({
                                                      post,
                                                      handleInsertNode,
                                                      handleEditNode,
                                                      handleDeleteNode,
                                                      comment,
                                                  }) => {
    const submitRef = useRef<HTMLButtonElement>(null);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch();
    const {userContext} = useUserContext();
    const [editMode, setEditMode] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [isReplying, setIsReplying] = useState(false);
    const [showCommentChild, setShowCommentChild] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [replyCountState, setReplyCountState] = useState(comment.replyCount);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setEditContent(comment.content);
    }, [comment]);

    const handleReplySubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const content = commentInputRef.current?.value;
        if (content && content.trim()) {
            replyComment(comment.id, content).then((res) => {
                if (showCommentChild) {
                    handleInsertNode(comment.id, res);
                }
                commentInputRef.current!.value = '';
                dispatch(incrementCommentCount(post.id));
                setIsReplying(false);
                setReplyCountState(prev => prev + 1);
            });
        }
    };

    const handleEditComment = (event: React.FormEvent) => {
        event.preventDefault();
        const content = editContent.trim();
        if (content) {
            editComment(comment.id, content).then((res) => {
                handleEditNode(comment.id, res.content);
            }).finally(() => {
                setEditMode(false);
            });
        }
    };

    const showMoreCommentChild = () => {
        if (!hasMore) {
            return;
        }

        setShowCommentChild(true);
        getRepliesByComment(comment.id, page, 5)
            .then((comments) => {
                handleInsertNode(comment.id, comments, 'END');
                if (comments.length < 5) {
                    setHasMore(false);
                } else {
                    setPage(page + 1);
                }
            })
            .catch(() => {
                setHasMore(false);
            })
    }

    const handleButtonClick = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    const handleClickOutside = () => {
        setVisible(false); // Hide Tippy when clicking outside
    };

    const handleEditButton = () => {
        setEditMode(true);
        setVisible(false);
    }

    const renderContentOptions = () => {
        let editButton: Element | null = null;
        let deleteButton: Element | null = null;

        if (userContext.id === post.creator.id || userContext.id === comment.creator.id) {
            deleteButton = (
                <button className='small-regular w-full p-3 text-left text-light-2 hover:opacity-80'
                        onClick={handleDeleteComment}>
                    Xóa
                </button>
            );
        }
        if (userContext.id === comment.creator.id) {
            editButton = (
                <button className='small-regular w-full p-3 text-left text-light-2 hover:opacity-80'
                        onClick={handleEditButton}>
                    Chỉnh sửa
                </button>
            );
        }

        if (!editButton && !deleteButton) {
            return <></>;
        }

        return (
            <div>
                <Tippy
                    content={
                        <div className='w-36 rounded-md bg-dark-4 shadow-md'>
                            {deleteButton}
                            {editButton}
                        </div>}
                    placement='right-end'
                    visible={visible}
                    interactive={true}
                    onClickOutside={handleClickOutside}
                >
                    <div onClick={handleButtonClick}>
                        <IoIosMore className='cursor-pointer text-gray-500' size={25}/>
                    </div>
                </Tippy>
            </div>

        );
    }

    const handleDeleteComment = () => {
        deleteComment(comment.id).then((res) => {
            handleDeleteNode(comment.id);
            setReplyCountState(0);
            dispatch(adjustCommentCount({postId: post.id, adjustment: -(res)}));
        }).finally(() => {
            handleClickOutside();
        });
    };

    const handleTextareaInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    const onKeyDown = (event) => {
        // On plain enter or ctrl + enter, send message.
        // On shift + enter or alt + enter, add a new line to it
        if (event.key === 'Enter') {
            if (!(event.altKey || event.shiftKey) && submitRef.current) {
                event.preventDefault();
                event.stopPropagation();
                submitRef.current.click();
            }
        }
    }

    return (
        <>
            <div className={clsx('mb-4 flex', {'mt-3': comment.level === 1})}>
                <div>
                    <Link className=''
                          to={generateProfileLink(comment.creator.nickname)}>
                        <Avatar
                            type={0}
                            imageUrl={comment.creator.avatarUrl}
                            style={'mr-3 size-8'}
                            name={comment.creator.fullName}
                        />
                    </Link>
                </div>

                <div className='flex w-full flex-col'>
                    <Link className='mb-1 w-fit'
                          to={generateProfileLink(comment.creator.nickname)}>
                        <p className='text-light-3'>{comment.creator.nickname}</p>
                    </Link>
                    <div>
                        {editMode ? (
                            <>
                                <form className="relative flex gap-5" onSubmit={handleEditComment}>
                                    <textarea
                                        value={editContent}
                                        onInput={handleTextareaInput}
                                        className="w-full overflow-y-hidden rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                                        onKeyDown={onKeyDown}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        autoFocus
                                    />
                                    <button type='submit' ref={submitRef} className='absolute bottom-1/4 right-3'>
                                        <img
                                            src={"/assets/icons/send-secondary.svg"}
                                            alt="send"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </form>
                                <button className='px-3.5 py-2 text-sm hover:text-primary-500'
                                        onClick={() => setEditMode(false)}
                                >Hủy
                                </button>
                            </>
                        ) : (
                            <p className='small-regular mb-2 w-fit'>
                                {comment.content.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br/>
                                    </React.Fragment>
                                ))}
                            </p>
                        )}

                        <div className="flex-start gap-5 text-light-3">
                            <Tippy
                                placement={"bottom-start"}
                                delay={[200, 0]}
                                offset={[0, -2]}
                                content={
                                    <div
                                        className="subtle-semibold rounded-xl bg-white p-2 text-dark-2">
                                        {formatDateString(comment.createdAt)}
                                    </div>}
                            >
                                <p className="subtle-semibold lg:small-regular">
                                    {multiFormatDateString2(comment.createdAt)}
                                </p>
                            </Tippy>

                            <div className="flex gap-1">
                                <img
                                    src={`/assets/icons/liked.svg`}
                                    alt="like"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                                <p className="small-medium lg:base-medium">10</p>
                            </div>

                            {comment.level === 0 &&
                                <div className='flex cursor-pointer items-center'
                                     onClick={() => setIsReplying(!isReplying)}>
                                    <img
                                        src={"/assets/icons/reply.svg"}
                                        alt="reply"
                                    />
                                    <button className='small-regular ms-1.5 text-light-2'>Trả lời</button>
                                </div>
                            }
                            {renderContentOptions()}
                        </div>
                        {isReplying && (
                            <div className='my-3 mr-0.5'>
                                <form className="relative flex gap-5" onSubmit={handleReplySubmit}>
                                    <textarea
                                        rows={1}
                                        className="w-full overflow-y-hidden rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                                        onKeyDown={onKeyDown}
                                        autoFocus
                                        ref={commentInputRef}
                                        placeholder={`Trả lời bình luận của @${comment.creator.nickname}`}
                                    />
                                    <button type='submit' ref={submitRef} className='absolute bottom-1/4 right-3'>
                                        <img
                                            src={"/assets/icons/send-secondary.svg"}
                                            alt="send"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </form>
                            </div>
                        )}
                        {showCommentChild && comment.level === 0 && (
                            comment?.items?.map((comment, index) => (
                                <CommentNested key={index}
                                               post={post}
                                               comment={comment}
                                               handleInsertNode={handleInsertNode}
                                               handleEditNode={handleEditNode}
                                               handleDeleteNode={handleDeleteNode}/>
                            ))
                        )}
                        {comment.level === 0 && replyCountState > 0 && hasMore &&
                            <button className='small-regular mt-4 text-gray-500'
                                    onClick={showMoreCommentChild}>{`Xem tất cả ${replyCountState} phản hồi`}</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentNested;