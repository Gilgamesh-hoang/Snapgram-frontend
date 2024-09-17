import React, {ChangeEvent, FC, useRef} from "react";
import {Comment, Creator} from "@/model/type.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import Avatar from "@/components/shared/Avatar.tsx";
import {useDispatch} from "react-redux";
import {incrementCommentCount} from "@/redux/postSlice.ts";
import {createComment} from "@/services/comment.ts";

interface CommentProps {
    postId: string;
    onCommentSuccess: (comment: Comment) => void;
    commentInputRef: React.RefObject<HTMLTextAreaElement>;
}

const CommentForm: FC<CommentProps> = ({postId, onCommentSuccess, commentInputRef}) => {
    const submitRef = useRef<HTMLButtonElement>(null);
    const {userContext} = useUserContext();
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const content = commentInputRef.current?.value;
        if (content && content.trim()) {
            createComment(postId, content).then((comment) => {
                onCommentSuccess(comment);
                commentInputRef.current!.value = '';
                dispatch(incrementCommentCount(postId));
            });
        }

    }

    // text area auto-size
    const handleSizeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.currentTarget.rows = 1;
        const isWarpTooMuch = event.currentTarget.scrollHeight > 20 + 12 + 2;
        // const numberOfLineBreaks = (event.currentTarget.value.match(/\n/g) || []).length;
        // console.log(event.currentTarget.value)
        event.currentTarget.rows = isWarpTooMuch ? 2 : 1;
    };

    return (
        <>
            <Avatar
                type={0}
                imageUrl={userContext.avatarUrl}
                style={'mr-3 size-8'}
                name={userContext.fullName}
            />

            <form onSubmit={handleSubmit} className="relative flex w-full gap-5">
                <textarea
                    rows={1}
                    className="w-full overflow-y-hidden rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                    onKeyDown={(event) => {
                        // On plain enter or ctrl + enter, send message.
                        // On shift + enter or alt + enter, add a new line to it
                        if (event.key === 'Enter') {
                            if (!(event.altKey || event.shiftKey) && submitRef.current) {
                                event.preventDefault();
                                event.stopPropagation();
                                submitRef.current.click();
                            }
                        }
                    }}
                    onChange={handleSizeChange}
                    ref={commentInputRef}
                    placeholder='Thêm bình luận...'
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
        </>
    );
}
export default CommentForm;