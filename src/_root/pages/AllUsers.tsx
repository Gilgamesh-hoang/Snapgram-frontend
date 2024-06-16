import {Loader, UserCard} from "@/components/shared";
import React from "react";

const AllUsers: React.FC = () => {

    const [isLoading, setIsLoading] = React.useState(false);

    const creator = {
        $id: "1",
        name: "John Doe",
        username: "john_doe",
        imageUrl: "https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a",
    };

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold w-full text-left">Người dùng</h2>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <ul className="user-grid">

                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllUsers;