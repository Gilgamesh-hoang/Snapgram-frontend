import React, {useEffect, useState} from "react";
import {Loader, PostCard, UserCard} from "@/components/shared";
import {User} from "@/model/type.ts";
import {friendSuggestions} from "@/services/user.ts";
import {PAGE_SIZE_HOME_FRIEND} from "@/constants";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimelines} from "@/redux/timelineSlice.ts";
import InfiniteScroll from "react-infinite-scroll-component";

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const {posts, hasMore, isLoading, savedIds, likedIds, page} = useSelector(
        (state: RootState) => state.timeline
    );

    useEffect(() => {
        friendSuggestions(1, PAGE_SIZE_HOME_FRIEND).then((res: User[]) => {
            setUsers((prev) => [...prev, ...res]);
        });
    }, []);

    // Fetch posts when the component mounts
    useEffect(() => {
        if (posts.length === 0 && !isLoading) {
            dispatch(fetchTimelines());
        }
    }, [dispatch, posts.length, isLoading]);


    const fetchMore = () => {
        if (hasMore && !isLoading) {
            dispatch(fetchTimelines());
        }
    };

    const onFollowSuccess = (userId: string) => {
        // filter out the user who has been followed
        setUsers((prev) => prev.filter((user) => user.id !== userId));
    }

    const renderPosts = (): React.ReactNode => {
        return posts.map((post) => {
            const temp = {
                ...post,
                isSaved: savedIds.includes(post.id),
                isLiked: likedIds.includes(post.id),
            };
            return (
                <li key={post.id} className="flex w-full justify-center">
                    <PostCard post={temp}/>
                </li>
            );
        });
    };

    return (
        <div className="flex flex-1">
            <div className="home-container" id="homeScrollable">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9">
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={fetchMore}
                            hasMore={hasMore}
                            loader={<Loader/>}
                            scrollableTarget="homeScrollable"
                            style={{overflow: "hidden"}}
                            endMessage={
                                <p
                                    className="mt-3 text-center text-light-3">Không {page === 1 ? 'có' : 'còn'} bài
                                    viết để hiển thị
                                </p>
                            }
                        >
                            {renderPosts()}
                        </InfiniteScroll>
                    </ul>
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Gợi ý cho bạn</h3>
                <ul className="grid grid-cols-2 gap-6">
                    {users.map((user, index) => (
                        <li key={index}>
                            <UserCard id={user.id} name={user.fullName} imageUrl={user.avatarUrl}
                                      nickname={user.nickname} key={index}
                                      onFollowSuccess={onFollowSuccess}
                            />
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default Home;