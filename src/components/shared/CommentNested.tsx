import {Link} from "react-router-dom";
import {generateProfileLink} from "@/utils/common.ts";
import Avatar from "@/components/shared/Avatar.tsx";
import React, {FC, useEffect, useRef, useState} from "react";
import Tippy from "@tippyjs/react";
import {formatDateString, multiFormatDateString2} from "@/utils/dateUtil.ts";
import {Comment} from "@/model/type";
import {clsx} from "clsx";
import {getRepliesByComment, replyComment} from "@/services/comment.ts";
import {incrementCommentCount} from "@/redux/postSlice.ts";
import {useDispatch} from "react-redux";
/*
* đang bị lỗi
* ví dụ tôi có comment A (A có 2 reply), và comment B (B có 0 reply) và A được comment sau B.
* khi tôi thực hiện một comment mới là C thì C sẽ hiện ở phía trước A và C có 0 reply, 
* nhưng khi hiển thị lên trước A thì C lại chiếm 2 reply của A, chỉ khi reload lại thì nó mới hiển thị đúng
* */
interface CommentNestedProps {
    comment: Comment;
    postId: string;
    level?: number;
    replyCount?: number;
}

const CommentNested: FC<CommentNestedProps> = ({postId, comment, level = 0, replyCount = 0}) => {
    const [isReplying, setIsReplying] = useState(false);
    const submitRef = useRef<HTMLButtonElement>(null);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const [showCommentChild, setShowCommentChild] = useState(false);
    const [commentChild, setCommentChild] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [replyCountState, setReplyCountState] = useState(replyCount);
    const dispatch = useDispatch();

    const handleReplySubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const content = commentInputRef.current?.value;
        if (content && content.trim()) {
            replyComment(postId, comment.id, content).then((comment) => {
                // setCommentChild([comment, ...commentChild])
                commentInputRef.current!.value = '';
                dispatch(incrementCommentCount(postId));
                setIsReplying(false);
                setReplyCountState(prev => prev + 1);
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
                setCommentChild(prev => [...prev, ...comments]);
                if (comments.length < 5) {
                    setHasMore(false);
                } else {
                    setPage(page + 1);
                    setHasMore(comments.length === 5);
                }
            })
            .catch(() => {
                setHasMore(false);
            })
    }

    return (
        <>
            <div className={clsx('mb-4 flex', {'mt-3': level === 1})}>
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
                    <Link className='mb-1'
                          to={generateProfileLink(comment.creator.nickname)}>
                        <p className='text-light-3'>{comment.creator.nickname}</p>
                    </Link>
                    <div>
                        <p className='small-regular mb-2'>
                            {comment.content.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br/>
                                </React.Fragment>
                            ))}
                        </p>
                        <div className="flex-start gap-2 text-light-3">
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
                                <p className="subtle-semibold lg:small-regular me-3">
                                    {multiFormatDateString2(comment.createdAt)}
                                </p>
                            </Tippy>

                            {level === 0 &&
                                <div className='flex cursor-pointer items-center'
                                     onClick={() => setIsReplying(!isReplying)}>
                                    <img
                                        src={"/assets/icons/reply.svg"}
                                        alt="reply"
                                    />
                                    <button className='small-regular ms-1.5 text-light-2'>Trả lời</button>
                                </div>
                            }
                        </div>
                        {isReplying && (
                            <div className='my-3 mr-0.5'>
                                <form className="relative flex gap-5" onSubmit={handleReplySubmit}>
                                    <textarea
                                        rows={1}
                                        className="w-full overflow-y-hidden rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                if (!(event.altKey || event.shiftKey) && submitRef.current) {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    submitRef.current.click();
                                                }
                                            }
                                        }}
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
                        {showCommentChild && level === 0 && (
                            commentChild.map((comment, index) => (
                                <CommentNested key={index} comment={comment} postId={postId} level={1}/>
                            ))
                        )}
                        {level === 0 && replyCountState > 0 && hasMore &&
                            <button className='small-regular mt-4 text-gray-500'
                                    onClick={showMoreCommentChild}>{`Xem tất cả ${replyCountState} phản hồi`}</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
        ;
}
export default CommentNested;