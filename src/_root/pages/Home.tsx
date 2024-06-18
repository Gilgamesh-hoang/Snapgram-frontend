import React from "react";
import {PostCard, UserCard} from "@/components/shared";

const Home: React.FC = () => {

    const post = {
        creator: {
            id: "1",
            name: "John Doe",
            imageUrl: "https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a",
        },
        createdAt: new Date().toDateString(),
        id: "1",
        caption: "This is a caption",
        location: "Lagos, Nigeria",
        imageUrl: [
            {
                isImage: true,
                isVideo: false,
                src: "https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a",
            },
            {
                isImage: true,
                isVideo: false,
                src: "blob:http://localhost:5173/4ae848c8-a359-4a08-8d53-4a372d2b3d64",
            },
            {
                isImage: true,
                isVideo: false,
                src: "blob:http://localhost:5173/f29dca93-c11b-48a4-a969-329b1e70d406",
            },
            {
                isImage: true,
                isVideo: false,
                src: "blob:http://localhost:5173/7649a79b-0b09-4857-a660-76de874c63a5",
            },
            ],
        tags: ["#tag1", "#tag2"],
    };

    // fake data for user card
    const creator = {
        $id: "1",
        name: "John Doe",
        username: "john_doe",
        imageUrl: "https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a",
    };


    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9">
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