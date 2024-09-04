import {FC, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Post} from "@/model/type.ts";
import {likedPost} from "@/services/post.ts";

type PostStatsProps = {
    userId?: string;
    post: Post;
    isShowShare?: boolean;
};

const PostStats: FC<PostStatsProps> = ({post, userId, isShowShare = false}) => {
    const location = useLocation();
    const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
    const [likeCount, setLikeCount] = useState<number>(post.likeCount);
    const [commentCount, setCommentCount] = useState<number>(post.commentCount);

    const handleLike = () => {
        const oldValue = isLiked;
        const newValue = !isLiked;
        setIsLiked(newValue);
        likedPost(post.id, newValue)
            .then((metric) => {
                setLikeCount(metric.likeCount);
                setCommentCount(metric.commentCount)
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
                <Link
                    to={`/posts/1`}
                >
                    <div className="flex gap-2">
                        <img
                            src={'/assets/icons/comment.svg'}
                            alt="comment"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                        />
                        <p className="small-medium lg:base-medium">{commentCount}</p>
                    </div>
                </Link>
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