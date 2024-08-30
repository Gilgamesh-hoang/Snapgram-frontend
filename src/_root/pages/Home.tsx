import React, {useEffect, useState} from "react";
import {PostCard, UserCard} from "@/components/shared";
import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";
import {friendSuggestions} from "@/services/user.ts";
import {PAGE_SIZE_HOME_FRIEND} from "@/constants";

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

    useEffect(() => {
        friendSuggestions(1, PAGE_SIZE_HOME_FRIEND).then((res: User[]) => {
            setUsers((prev) => [...prev, ...res]);
        });
    }, []);


    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <ul className="flex w-full flex-1 flex-col gap-9">
                        {/*<li className="flex w-full justify-center">*/}
                        {/*    <PostCard post={post}/>*/}
                        {/*</li>*/}
                        {/*<li className="flex w-full justify-center">*/}
                        {/*    <PostCard post={post2}/>*/}
                        {/*</li>*/}
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