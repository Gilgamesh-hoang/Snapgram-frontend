import {Link} from "react-router-dom";
import {Button} from "@/components/ui";
import React from "react";
import {routes} from "@/route";


type UserCardProps = {
    id: string;
    name: string;
    nickname: string;
    imageUrl: string;
};

const UserCard: React.FC<UserCardProps> = ({id, name, nickname, imageUrl}) => {
    function handleFollow(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    return (
        <div className="user-card">
            <Link to={`${routes.profile.replace(':nickname/*', nickname)}`}
                  className="flex flex-col items-center gap-4 "
            >
                <img
                    src={imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="creator"
                    className="size-16 rounded-full"
                />

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
                Theo dõi
            </Button>
        </div>
    );
};

export default UserCard;