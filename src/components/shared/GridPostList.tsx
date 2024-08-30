import {Link} from "react-router-dom";

import {Loader, PostStats} from "@/components/shared";
import {routes} from "@/route";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import React, {FC} from "react";
import {Post, User} from "@/model/type.ts";

type GridPostListProps = {
    showUser?: boolean;
    showStats?: boolean;
    hasMore: boolean;
    setPage: (prev: number) => void;
    page: number;
    posts: Post[];
    // creator?: User;
};

const GridPostList: FC<GridPostListProps> = ({
                                                 posts,
                                                 // creator,
                                                 showUser = true,
                                                 showStats = true,
                                                 page,
                                                 setPage,
                                                 hasMore
                                             }) => {

    return (
        <ul className="grid-container">
            {posts.length > 0 && (
                <InfiniteScroll
                    loader={<Loader/>}
                    fetchMore={() => setPage(page + 1)}
                    hasMore={hasMore}
                >
                    {posts.map((post) => (
                        <li key={post.id} className="relative h-80 min-w-80">
                            <Link to={`${routes.posts.replace(':id', post.id)}`} className="grid-post_link">
                                <img
                                    src={post.media[0].url}
                                    alt="post"
                                    className="size-full object-cover"
                                />
                            </Link>

                            <div className="grid-post_user">
                                {showUser  && (
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
                                {showStats && <PostStats post={post}/>}
                            </div>
                        </li>
                    ))}
                </InfiniteScroll>
            )}
        </ul>
    );
};

export default GridPostList;