import React, {useEffect, useState} from "react";
import {PostCard, UserCard} from "@/components/shared";
import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";
import {friendSuggestions} from "@/services/user.ts";

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // httpGet<ApiResponse<User>>('/users').then((response) => {
        //     console.log(response.data);
        // })
        //     .catch((error) => {
        //         console.log('Error:', error);
        //     });
    }, []);

    const post = {
        creator: {
            id: "1",
            name: "John Doe",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
        },
        createdAt: new Date().toDateString(),
        id: "1",
        caption: "This is a caption",
        location: "Lagos, Nigeria",
        imageUrl: [
            {
                id: "1",
                type: "IMAGE",
                url: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
            {
                id: "2",
                type: "VIDEO",
                url: "https://res.cloudinary.com/dvh2rphf4/video/upload/v1718880120/chatify/river_l1qf3t.mp4",
            },

        ],
        tags: ["#tag1", "#tag2"],
    };
    const post2 = {
        creator: {
            id: "1",
            name: "John Doe",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
        },
        createdAt: new Date().toDateString(),
        id: "1",
        caption: "This is a caption",
        location: "Lagos, Nigeria",
        imageUrl: [

            {
                id: "1",
                type: "VIDEO",
                src: "https://res.cloudinary.com/dvh2rphf4/video/upload/v1718880120/chatify/river_l1qf3t.mp4",
            },

        ],
        tags: ["#tag1", "#tag2"],
    };

    useEffect(() => {
        friendSuggestions(1, 6).then((res: User[]) => {
            setUsers((prev) => [...prev, ...res]);
        });
    }, []);


    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9">
                        <li className="flex w-full justify-center">
                            <PostCard post={post}/>
                        </li>
                        <li className="flex w-full justify-center">
                            <PostCard post={post2}/>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Gợi ý cho bạn</h3>
                <ul className="grid grid-cols-2 gap-6">
                    {users.map((user, index) => (
                        <li key={index}>
                            <UserCard id={user.id} name={user.fullName} imageUrl={user.avatarUrl}
                                      nickname={user.nickname} key={index}/>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default Home;