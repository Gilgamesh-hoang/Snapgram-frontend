import {Link, Outlet, Route, Routes, useLocation, useParams,} from "react-router-dom";
import {LikedPosts} from "@/_root/pages";
import {GridPostList} from "@/components/shared";
import React, {useEffect, useState} from "react";
import {getUserInfo} from "@/services/user.ts";
import {Post, User} from "@/model/type.ts";
import {routes} from "@/route";
import {getPostsByUser} from "@/services/post.ts";

interface StabBlockProps {
    value: number;
    label: string;
}

const StatBlock = ({value, label}: StabBlockProps) => (
    <div className="flex flex-col items-center justify-center gap-2">
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);
const INITIAL_USER: User = {
    id: "",
    fullName: "",
    nickname: "",
    email: "",
    avatarUrl: "",
    bio: "",
    gender: 'MALE',
};

const Profile: React.FC = () => {
    const {pathname} = useLocation();
    const {nickname} = useParams();
    const [user, setUser] = useState<User>(INITIAL_USER);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (nickname) {
            getUserInfo('vwunschz_sadas').then((res) => {
                setUser(res);
            });
        }
    }, []);
    useEffect(() => {
        if (nickname) {
            console.log(page);
            getPostsByUser('vwunschz_sadas', page).then((res) => {
                if (res.length === 0) {
                    console.log('no more posts')
                    setHasMore(false);
                } else {
                    console.log('more posts')
                    return setPosts(res);
                }
            }).catch(() => {
                setHasMore(false);
            });
        }
    }, [page]);

    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex flex-1 flex-col gap-7 max-xl:items-center xl:flex-row">
                    <img
                        src={user.avatarUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="size-28 rounded-full lg:size-36"
                    />
                    <div className="flex flex-1 flex-col justify-between md:mt-2">
                        <div className="flex w-full flex-col">
                            <h1 className="h3-bold md:h1-semibold w-full text-center xl:text-left">
                                {user.fullName}
                            </h1>
                            <p className="small-regular md:body-medium text-center text-light-3 xl:text-left">
                                @{user.nickname}
                            </p>
                        </div>

                        <div className="z-20 mt-10 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
                            <StatBlock value={user.postNumber || 0} label="bài viết"/>
                            <StatBlock value={user.followerNumber || 0} label="người theo dõi"/>
                            <StatBlock value={user.followeeNumber || 0} label="đang theo dõi"/>
                        </div>

                        <p className="small-medium md:base-medium mt-7 max-w-screen-sm text-center xl:text-left">
                            {user.bio}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div>
                            <Link
                                to={routes.updateProfile}
                                className={`flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1`}>
                                <img
                                    src={"/assets/icons/edit-profile.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <i></i>
                                <p className="small-medium flex whitespace-nowrap">
                                    Thay dổi thông tin
                                </p>
                            </Link>
                        </div>
                        {/*<div className={``}>*/}
                        {/*    <Button type="button" className="shad-button_primary px-8 bg-primary-500">*/}
                        {/*        Theo dõi*/}
                        {/*    </Button>*/}
                        {/*    <Button type="button" className="text-dark-2 px-8 bg-light-2 ms-3 hover:text-light-2">*/}
                        {/*        Nhắn tin*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {/*{currentUser.$id === user.id && (*/}
            <div className="flex w-full max-w-5xl">
                <Link
                    to={`${routes.profile.replace(':nickname', user.nickname)}`}
                    className={`profile-tab rounded-l-lg ${
                        pathname === `${routes.profile.replace(':nickname', user.nickname)}` && "!bg-dark-3"
                    }`}>
                    <img
                        src={"/assets/icons/posts.svg"}
                        alt="posts"
                        width={20}
                        height={20}
                    />
                    Bài viết
                </Link>
                <Link
                    to={`${routes.profile.replace(':nickname', user.nickname).concat('/liked-posts')}`}
                    className={`profile-tab rounded-r-lg ${
                        pathname === `/profile/${nickname}/liked-posts` && "!bg-dark-3"
                    }`}>
                    <img
                        src={"/assets/icons/like.svg"}
                        alt="like"
                        width={20}
                        height={20}
                    />
                    Bài viết đã thích
                </Link>
            </div>
            {/*)}*/}

            <Routes>
                <Route
                    index
                    element={<GridPostList page={page} setPage={setPage} hasMore={hasMore} posts={posts} showUser={false}/>}
                />
                {/*{currentUser.$id === user.id && (*/}
                <Route path="/liked-posts" element={<LikedPosts/>}/>
                {/*)}*/}
            </Routes>
            <Outlet/>
        </div>
    );
};

export default Profile;
