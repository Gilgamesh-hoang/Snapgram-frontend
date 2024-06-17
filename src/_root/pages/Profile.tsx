import {Link, Outlet, Route, Routes, useLocation, useParams,} from "react-router-dom";
import {LikedPosts} from "@/_root/pages";
import {GridPostList} from "@/components/shared";
import React from "react";

interface StabBlockProps {
    value: string | number;
    label: string;
}

const StatBlock = ({value, label}: StabBlockProps) => (
    <div className="flex flex-col items-start justify-center gap-2">
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);

const Profile: React.FC = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const savePosts = [
        {
            id: "1",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "1",
                name: "John Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
    ]


    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex flex-1 flex-col gap-7 max-xl:items-center xl:flex-row">
                    <img
                        src={"/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="size-28 rounded-full lg:size-36"
                    />
                    <div className="flex flex-1 flex-col justify-between md:mt-2">
                        <div className="flex w-full flex-col">
                            <h1 className="h3-bold md:h1-semibold w-full text-center xl:text-left">
                                nguyen van a
                            </h1>
                            <p className="small-regular md:body-medium text-center text-light-3 xl:text-left">
                                @gilgamesh
                            </p>
                        </div>

                        <div className="z-20 mt-10 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
                            <StatBlock value={5} label="bài viết"/>
                            <StatBlock value={20} label="người theo dõi"/>
                            <StatBlock value={20} label="đang theo dõi"/>
                        </div>

                        <p className="small-medium md:base-medium mt-7 max-w-screen-sm text-center xl:text-left">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi eos exercitationem fugiat iusto minima molestiae nam nesciunt nihil nobis nostrum, nulla quae quis saepe unde veniam! Odit, voluptates!
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div>
                            <Link
                                to={`/update-profile/`}
                                className={`flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1`}>
                                <img
                                    src={"/assets/icons/edit-profile.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <i ></i>
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
                        to={`/profile/${id}`}
                        className={`profile-tab rounded-l-lg ${
                            pathname === `/profile/${id}` && "!bg-dark-3"
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
                        to={`/profile/${id}/liked-posts`}
                        className={`profile-tab rounded-r-lg ${
                            pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
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
                    element={<GridPostList posts={savePosts} showUser={false}/>}
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
