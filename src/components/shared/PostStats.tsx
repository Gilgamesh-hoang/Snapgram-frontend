import React, {FC, RefObject, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {likedPost} from "@/services/post.ts";
import {Post} from "@/model/type.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {updateCommentCount} from "@/redux/postSlice.ts";

type PostStatsProps = {
    post: Post;
    isShowShare?: boolean;
    commentInputRef?: RefObject<HTMLTextAreaElement>;
};

const PostStats: FC<PostStatsProps> = ({post, isShowShare = false, commentInputRef}) => {
    const location = useLocation();const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
    const [likeCount, setLikeCount] = useState<number>(post.likeCount);
    const commentCountState = useSelector((state: RootState) => state.post.commentCounts[post.id] || post.commentCount);
    const [commentCount, setCommentCount] = useState<number>(commentCountState);

    useEffect(() => {
        setCommentCount(commentCountState);
    }, [commentCountState]);

    const handleLike = () => {
        const oldValue = isLiked;
        const newValue = !isLiked;
        setIsLiked(newValue);
        likedPost(post.id, newValue)
            .then((metric) => {
                setLikeCount(metric.likeCount);
                setCommentCount(metric.commentCount)
                dispatch(updateCommentCount({postId: post.id, count: metric.commentCount}));
            })
            .catch(() => {
                setIsLiked(oldValue);
            })
    }

    const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

    return (
        <div
            className={`z-20 flex items-center justify-between ${containerStyles}`}>
            <div className='flex'>
                <div className="mr-7 flex gap-2">
                    <img
                        src={`${
                            isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
                        }`}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                    <p className="small-medium lg:base-medium">{likeCount}</p>
                </div>
                <div className="flex gap-2" onClick={() => commentInputRef?.current?.focus()}>
                    <img
                        src={'/assets/icons/comment.svg'}
                        alt="comment"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                    <p className="small-medium lg:base-medium">{commentCount}</p>
                </div>
                {isShowShare && (
                    <div className="ml-7 flex gap-2">
                        <img
                            src={'/assets/icons/share.svg'}
                            alt="share"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                        />
                        <p className="small-medium lg:base-medium">5</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostStats;