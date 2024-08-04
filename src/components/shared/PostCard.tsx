import {Link} from "react-router-dom";

import {PostStats} from "@/components/shared";
import {multiFormatDateString} from "@/utils/dateUtil";
import React, {useState} from "react";
import {MediaUrl} from "@/types";
import CarouselPost from "@/components/shared/CarouselPost.tsx";

type PostCardProps = {
    post: {
        creator: {
            id: string;
            name: string;
            imageUrl: string;
        };
        createdAt: string;
        id: string;
        caption: string;
        location: string;
        imageUrl: MediaUrl[];
        tags: string[];
    };

};

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const [isSaved, setIsSaved] = useState(true);
    if (!post.creator) return;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.id}`}>
                        <img
                            src={
                                post.creator?.imageUrl ||
                                "/assets/icons/profile-placeholder.svg"
                            }
                            alt="creator"
                            className="w-12 rounded-full lg:h-12"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                            {post.creator.name}
                        </p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">
                                {multiFormatDateString(post.createdAt)}
                            </p>
                            •
                            <p className="subtle-semibold lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="share"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </div>
            </div>


            <div className="small-medium lg:base-medium py-5">
                <p>{post.caption}</p>
                <ul className="mt-2 flex gap-1">
                    {post.tags.map((tag: string, index: number) => (
                        <li key={`${tag}${index}`} className="small-regular text-light-3">
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>

            <CarouselPost sources={post.imageUrl}/>

            {/*<img*/}
            {/*    src={post.imageUrl[0].src}*/}
            {/*    alt="post image"*/}
            {/*    className="post-card_img"*/}
            {/*/>*/}
            <PostStats isShowShare={true}/>

            {/*comment*/}
            <div className='mt-6 flex h-7 w-full items-center'>
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
                        />
                    </button>
                </form>

            </div>
        </div>
    );
};
export default PostCard;