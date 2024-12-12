import React, {useEffect, useRef, useState} from "react";
import {Loader, PostCard, UserCard} from "@/components/shared";
import {User} from "@/model/type.ts";
import {friendSuggestions} from "@/services/user.ts";
import {PAGE_SIZE_HOME_FRIEND} from "@/constants";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimelines} from "@/redux/timelineSlice.ts";

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const page = useRef(1);
    const isInitialMount = useRef(true);
    const dispatch: AppDispatch = useDispatch();
    const {posts, hasMore, isLoading, savedIds, likedIds} = useSelector(
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
            dispatch(fetchTimelines(page.current));
            page.current += 1;
        }
    }, [dispatch, posts.length, isLoading]);


    const fetchMore = () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (hasMore && !isLoading) {
            dispatch(fetchTimelines(page.current));
            page.current += 1;
        }
    };

    const onFollowSuccess = (userId: string) => {
        // filter out the user who has been followed
        setUsers((prev) => prev.filter((user) => user.id !== userId));
    }

    const renderPosts = (): React.ReactNode => {
        if (isLoading) {
            return <Loader/>;
        }
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
            <div className="home-container">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9">
                        <InfiniteScroll
                            fetchMore={fetchMore}
                            hasMore={hasMore}
                            loader={<Loader/>}
                            endMessage={<p
                                className="text-center text-light-3">Không {page.current === 1 ? 'có' : 'còn'} bài
                                viết để hiển thị</p>}
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


// const Home: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [savedIds, setSavedIds] = useState<Set<string>>(new Set<string>([]));
//     const [likedIds, setLikedIds] = useState<Set<string>>(new Set<string>([]));
//     const isInitialMount = useRef(true);
//
//     useEffect(() => {
//         friendSuggestions(1, PAGE_SIZE_HOME_FRIEND).then((res: User[]) => {
//             setUsers((prev) => [...prev, ...res]);
//         });
//     }, []);
//
//     useEffect(() => {
//         const fetchTimelinePosts = async () => {
//             try {
//                 setIsLoading(true);
//
//                 // Lấy các bài viết từ timeline
//                 const res = await getTimeline(page, PAGE_SIZE_TIMELINE);
//
//                 // Cập nhật danh sách bài viết
//                 setPosts((prev) => [...prev, ...res]);
//                 if (res.length < PAGE_SIZE_TIMELINE) {
//                     setHasMore(false);
//                 }
//
//                 // Lấy danh sách ID bài viết
//                 const postIds = res.map(post => post.id);
//                 if (postIds.length === 0) {
//                     return;
//                 }
//
//                 // Kiểm tra các bài viết đã được lưu và đã thích
//                 const [savedPostIds, likedPostIds] = await Promise.all([
//                     checkSaved(postIds),
//                     checkLikedPost(postIds),
//                 ]);
//
//                 // Cập nhật trạng thái saved và liked
//                 setSavedIds((prev) => addToSet(Array.from(prev), savedPostIds));
//                 setLikedIds((prev) => addToSet(Array.from(prev), likedPostIds));
//             } catch (error) {
//                 setHasMore(false);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         fetchTimelinePosts();
//     }, [page]);
//
//     const addToSet = ((oldVals: string[], newVals: string[]) => {
//         const newSet = new Set(oldVals);
//         newVals.forEach(id => newSet.add(id));
//         return newSet;
//     });
//
//     const onFollowSuccess = (userId: string) => {
//         // filter out the user who has been followed
//         setUsers((prev) => prev.filter((user) => user.id !== userId));
//     }
//
//     const renderPosts = (): React.ReactNode => {
//         if (isLoading) {
//             return <Loader/>;
//         }
//         console.log("render", new Date().getTime())
//         return posts.map((post) => {
//             post.isSaved = savedIds.has(post.id);
//             post.isLiked = likedIds.has(post.id);
//             return (
//                 <li key={post.id} className="flex w-full justify-center">
//                     <PostCard post={post}/>
//                 </li>
//             );
//         });
//     };
//
//     const fetchMore = () => {
//         if (isInitialMount.current) {
//             isInitialMount.current = false;
//             return;
//         }
//         setPage(prev => prev + 1);
//     }
//     return (
//         <div className="flex flex-1">
//             <div className="home-container">
//                 <div className="home-posts">
//                     <ul className="flex w-full flex-1 flex-col gap-9">
//                         <InfiniteScroll
//                             fetchMore={fetchMore}
//                             hasMore={hasMore}
//                             loader={<Loader/>}
//                             endMessage={<p className="text-center text-light-3">Không {page === 1 ? 'có' : 'còn'} bài
//                                 viết để hiển thị</p>}
//                         >
//                             {renderPosts()}
//                         </InfiniteScroll>
//                     </ul>
//                 </div>
//             </div>
//
//             <div className="home-creators">
//                 <h3 className="h3-bold text-light-1">Gợi ý cho bạn</h3>
//                 <ul className="grid grid-cols-2 gap-6">
//                     {users.map((user, index) => (
//                         <li key={index}>
//                             <UserCard id={user.id} name={user.fullName} imageUrl={user.avatarUrl}
//                                       nickname={user.nickname} key={index}
//                                       onFollowSuccess={onFollowSuccess}
//                             />
//                         </li>
//                     ))}
//
//                 </ul>
//             </div>
//         </div>
//     );
// };

export default Home;