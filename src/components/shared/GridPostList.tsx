import {Link, useNavigate} from "react-router-dom";

import {Loader, PostStats} from "@/components/shared";
import {routes} from "@/route";
import React, {FC} from "react";
import {Post} from "@/model/type.ts";
import {generatePostLink} from "@/utils/common.ts";
import InfiniteScroll from "react-infinite-scroll-component";

type GridPostListProps = {
    showUser?: boolean;
    showStats?: boolean;
    hasMore: boolean;
    setPage: (prev: number) => void;
    page: number;
    posts: Post[];
};

const GridPostList: FC<GridPostListProps> = ({
                                                 posts,
                                                 showUser = true,
                                                 showStats = true,
                                                 page,
                                                 setPage,
                                                 hasMore
                                             }) => {
    const navigate = useNavigate();
    return (

        <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<Loader/>}
            style={{overflow: "hidden"}}
        >
            <ul className="grid-container">
                {posts.map((post) => (
                    <li key={post.id} className="relative h-80 min-w-80">
                        <Link to={generatePostLink(post.id)} className="grid-post_link">
                            <img
                                src={post.media[0].url}
                                alt="post"
                                className="size-full object-cover"
                            />
                        </Link>

                        <div className="grid-post_user">
                            {showUser && (
                                <div className="flex flex-1 items-center justify-start gap-2">
                                    <img
                                        src={
                                            post.creator.avatarUrl ||
                                            "/assets/icons/profile-placeholder.svg"
                                        }
                                        alt="creator"
                                        className="size-8 rounded-full"
                                    />
                                    <p className="line-clamp-1 xl:w-[100px]">{post.creator.nickname}</p>
                                </div>
                            )}
                            {showStats && <PostStats post={post}
                                                     onClickOnComment={() => navigate(routes.posts.replace(':id', post.id))}/>}
                        </div>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>

    );
};

export default GridPostList;