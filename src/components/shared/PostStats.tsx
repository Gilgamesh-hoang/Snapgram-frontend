import {FC, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import {checkIsLiked} from "@/utils";

type PostStatsProps = {
    userId?: string;
    post?: string;
    isShowShare?: boolean;
};

const PostStats: FC<PostStatsProps> = ({post, userId, isShowShare = false}: PostStatsProps) => {
    const location = useLocation();

    const [likes, setLikes] = useState<string[]>(['a', 'b', 'c']);


    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";

    return (
        <div
            className={`z-20 flex items-center justify-between ${containerStyles}`}>
            <div className='flex'>
                <div className="mr-7 flex gap-2">
                    <img
                        src={`${
                            checkIsLiked(likes, userId || '')
                                ? "/assets/icons/liked.svg"
                                : "/assets/icons/like.svg"
                        }`}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                    <p className="small-medium lg:base-medium">100</p>
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
                        <p className="small-medium lg:base-medium">5</p>
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