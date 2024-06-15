import React from "react";
import {PostCard, UserCard} from "@/components/shared";

const Home: React.FC = () => {

    const post = {
        creator: {
            id: "1",
            name: "John Doe",
            imageUrl: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fVjYL.img?w=768&h=431&m=6",
        },
        createdAt: new Date().toDateString(),
        id: "1",
        caption: "This is a caption",
        location: "Lagos, Nigeria",
        imageUrl: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fVjYL.img?w=768&h=431&m=6",
        tags: ["#tag1", "#tag2"],
    };

    // fake data for user card
    const creator = {
        $id: "1",
        name: "John Doe",
        username: "john_doe",
        imageUrl: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1fVjYL.img?w=768&h=431&m=6",
    };


    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9 ">
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Gợi ý cho bạn</h3>
                <ul className="grid grid-cols-2 gap-6">
                    <li>
                        <UserCard user={creator}/>
                    </li>
                    <li>
                        <UserCard user={creator}/>
                    </li>
                    <li>
                        <UserCard user={creator}/>
                    </li>
                    <li>
                        <UserCard user={creator}/>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Home;