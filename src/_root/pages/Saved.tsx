import {GridPostList} from "@/components/shared";
import React from "react";

const Saved: React.FC = () => {

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
        <div className="saved-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <img
                    src="/assets/icons/save.svg"
                    width={36}
                    height={36}
                    alt="edit"
                    className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold text-left w-full">Đã lưu</h2>
            </div>

            <div className="flex w-full max-w-5xl">
                <div
                    className="flex items-center justify-center gap-3 bg-dark-3 rounded-s-md px-8 py-2 cursor-pointer hover:bg-dark-3">
                    <img
                        src="/assets/icons/posts.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Bài viết</p>
                </div>

                <div
                    className="flex items-center justify-center gap-3 bg-dark-2 px-8 py-2 cursor-pointer border-2 border-dark-3 hover:bg-dark-3">
                    <img
                        src="/assets/icons/reel.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Video</p>
                </div>
                <div
                    className="flex items-center justify-center gap-3 bg-dark-2 rounded-e-md px-8 py-2 cursor-pointer  border-2 border-dark-3 hover:bg-dark-3">
                    <img
                        src="/assets/icons/collection.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Bộ sưu tập</p>
                </div>
            </div>

            <ul className="w-full flex justify-center max-w-5xl gap-9">
                {savePosts.length === 0 ? (
                    <p className="text-light-4">Chưa có lưu bài viết nào</p>
                ) : (
                    <GridPostList posts={savePosts} showStats={false}/>
                )}
            </ul>
        </div>
    );
};

export default Saved;
