import {Link, Outlet, Route, Routes, useLocation, useParams,} from "react-router-dom";
import {GridPostList} from "@/components/shared";
import React, {useEffect, useState} from "react";
import {getUserInfo} from "@/services/user.ts";
import {Post, UserInfo} from "@/model/type.ts";
import {routes} from "@/route";
import {getPostsByUser} from "@/services/post.ts";
import {PAGE_SIZE_POST_IN_PROFILE} from "@/constants";
import QRCode from "@/components/shared/QRCode.tsx";
import {BsQrCodeScan} from "react-icons/bs";
import {useUserContext} from "@/context/AuthContext.tsx";
import {Button} from "@/components/ui";
import FollowPopup from "@/components/shared/FollowPopup.tsx";
import {generateProfileLink, showConfirmDialog} from "@/utils/common.ts";
import {filterFollow, followUser, unfollowUser} from "@/services/follow.ts";


interface StabBlockProps {
    value: number;
    label: string;
    callback?: () => void;
    className?: string;
}

const StatBlock = ({value, label, callback, className = ''}: StabBlockProps) => (
    <div onClick={callback} className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);
const INITIAL_USER: UserInfo = {
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
    const {userContext} = useUserContext();
    const [user, setUser] = useState<UserInfo>(INITIAL_USER);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFollow, setIsFollow] = useState(false);
    const [isFollowerPopupOpen, setIsFollowerPopupOpen] = useState(false);
    const [isFollowingPopupOpen, setIsFollowingPopupOpen] = useState(false);
    const [isNicknameChanged, setIsNicknameChanged] = useState(false); // State mới để theo dõi khi nickname thay đổi
    useEffect(() => {
        if (nickname) {
            getUserInfo(nickname).then((res) => {
                setUser(res);
                if (userContext.nickname !== nickname) {
                    filterFollow([res.id]).then((ids) => {
                        setIsFollow(ids.length > 0 && ids[0] === res.id);
                    });
                }
            });

            setIsFollowingPopupOpen(false);
            setIsFollowerPopupOpen(false);
            setPosts([]);
            setPage(1);
            setHasMore(true);
            setIsNicknameChanged(true); // Đánh dấu rằng nickname đã thay đổi
        }
    }, [nickname]);

    useEffect(() => {
        if (!nickname || !isNicknameChanged) return;

        getPostsByUser(nickname, page, PAGE_SIZE_POST_IN_PROFILE).then((res) => {
            if (page === 1) {
                setPosts(res);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...res]);
            }

            if (res.length < PAGE_SIZE_POST_IN_PROFILE) {
                setHasMore(false);
            }
            setIsNicknameChanged(false);
        }).catch(() => {
            setHasMore(false);
        });
    }, [page, nickname, isNicknameChanged]);

    function handleFollow() {
        const oldValue = isFollow;
        const newValue = !isFollow;
        setIsFollow(newValue);
        followUser(user.id)
            .catch(() => {
                setIsFollow(oldValue);
            });
    }

    const handleUnfollow = () => {
        const confirm = () => {
            const oldValue = isFollow;
            const newValue = !isFollow;
            setIsFollow(newValue);
            unfollowUser(user.id).then(() => {
            }).catch(() => {
                setIsFollow(oldValue);
            });
        }
        showConfirmDialog(`Hủy theo dõi @${nickname}?`, 'Hủy theo dõi', 'pi pi-exclamation-triangle', confirm);

    };
    return (
        <>
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

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
                                <StatBlock value={user.postNumber || 0} label="bài viết"/>
                                <StatBlock value={user.followerNumber || 0} callback={() => {
                                    setIsFollowerPopupOpen(!isFollowerPopupOpen)
                                }}
                                           className='cursor-pointer' label="người theo dõi"/>
                                <StatBlock value={user.followeeNumber || 0} callback={() => {
                                    setIsFollowingPopupOpen(!isFollowingPopupOpen)
                                }}
                                           className='cursor-pointer' label="đang theo dõi"/>
                            </div>

                            <p className="small-medium md:base-medium mt-7 max-w-screen-sm text-center xl:text-left">
                                {user.bio}
                            </p>
                        </div>

                        <div className="flex justify-center gap-4">
                            {userContext?.nickname === user.nickname ? (
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
                            ) : (
                                <div className={``}>
                                    {isFollow ? (
                                        <Button type="button" className="shad-button_primary bg-primary-500 px-8"
                                                onClick={handleUnfollow}>
                                            Đang theo dõi
                                        </Button>
                                    ) : (
                                        <Button type="button" className="shad-button_primary bg-primary-500 px-8"
                                                onClick={handleFollow}>
                                            Theo dõi
                                        </Button>
                                    )}

                                    <Button type="button"
                                            className="ms-3 bg-light-2 px-8 text-dark-2 hover:text-light-2">
                                        Nhắn tin
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex w-full max-w-5xl">
                    <Link
                        to={generateProfileLink(user.nickname)}
                        className={`profile-tab rounded-l-lg ${
                            pathname === generateProfileLink(user.nickname) && "!bg-dark-3"
                        }`}>
                        <img
                            src={"/assets/icons/posts.svg"}
                            alt="posts"
                            width={20}
                            height={20}
                        />
                        Bài viết
                    </Link>
                    <Link to={`${generateProfileLink(user.nickname)}/qr`}
                          className={`profile-tab rounded-r-lg ${
                              pathname === `${generateProfileLink(user.nickname)}/qr` && "!bg-dark-3"
                          }`}>
                        <BsQrCodeScan size={20}/>
                        Mã QR
                    </Link>
                </div>
                {isFollowerPopupOpen && <FollowPopup userId={user.id} tab={'FOLLOWER'} onClose={() => {
                    setIsFollowerPopupOpen(!isFollowerPopupOpen)
                }}/>}
                {isFollowingPopupOpen && <FollowPopup userId={user.id} tab={'FOLLOWING'} onClose={() => {
                    setIsFollowingPopupOpen(!isFollowingPopupOpen)
                }}/>}
                <Routes>
                    <Route
                        index
                        element={<GridPostList page={page} setPage={setPage} hasMore={hasMore} posts={posts}
                                               showUser={false}/>}
                    />
                    <Route path="/qr" element={<QRCode nickname={user.nickname}/>}/>
                </Routes>
                <Outlet/>
            </div>
        </>
    );
};

export default Profile;

