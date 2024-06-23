import React, {useState} from "react";
import {GridPostList} from "@/components/shared";

const Explore: React.FC = () => {

    // fake data for posts
    const [posts, setPosts] = useState({
        pages: [
            {
                documents: [
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
                ],
            },
        ],
    });

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Phổ biến</h2>
            </div>

            <div className="flex-between mb-7 mt-8 w-full max-w-5xl">

                <div className="flex-center cursor-pointer gap-3 rounded-xl bg-dark-3 px-4 py-2">
                    <p className="small-medium md:base-medium text-light-2">Tất cả</p>
                    <img
                        src="/assets/icons/filter.svg"
                        width={20}
                        height={20}
                        alt="filter"
                    />
                </div>
            </div>

            <div className="flex w-full max-w-5xl flex-wrap gap-9">
                {
                    posts.pages.map((item, index) => (
                        <GridPostList key={`page-${index}`} posts={item.documents}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Explore;