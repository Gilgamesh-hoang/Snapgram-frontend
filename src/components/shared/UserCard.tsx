import {Link} from "react-router-dom";
import {Button} from "@/components/ui";
import React, {useState} from "react";
import {generateProfileLink} from "@/utils/common.ts";
import {followUser} from "@/services/follow.ts";
import {Loader} from "@/components/shared/index.tsx";
import Avatar from "@/components/shared/Avatar.tsx";

type UserCardProps = {
    id: string;
    name: string;
    nickname: string;
    imageUrl: string;
    onFollowSuccess?: (userId: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({id, name, nickname, imageUrl,onFollowSuccess}) => {
    const [isLoading, setIsLoading] = useState(false);

    function handleFollow() {
        setIsLoading(true);
        followUser(id)
            .then(() => {
                setIsLoading(false);
                // return callback including the user id to the parent component (AllUsers.tsx component)
                if (onFollowSuccess) {
                    onFollowSuccess(id); // Call the callback function with the user id
                }
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <div className="user-card">
                <Link to={generateProfileLink(nickname)}
                      className="flex flex-col items-center gap-4 "
                >
                    <Avatar name={nickname} imageUrl={imageUrl} style={"size-16"}/>

                    <div className="flex-center flex-col gap-1">
                        <p className="base-medium line-clamp-1 text-center text-light-1">
                            {name}
                        </p>
                        <p className="small-regular line-clamp-1 text-center text-light-3">
                            @{nickname}
                        </p>
                    </div>
                </Link>


                <Button size="sm" className="shad-button_primary bg-primary-500 px-5"
                        onClick={handleFollow}
                >
                    {isLoading ? <Loader/> : "Theo dõi"}
                </Button>
            </div>
        </>
    );
};

export default UserCard;