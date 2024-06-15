import { Link } from "react-router-dom";
import {Button} from "@/components/ui";
import React, {FC} from "react";


type UserCardProps = {
    user: {
        $id: string;
        name: string;
        username: string;
        imageUrl: string;
    };
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <Link to={`/profile/${user.$id}`} className="user-card">
            <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="size-14 rounded-full"
            />

            <div className="flex-center flex-col gap-1">
                <p className="base-medium line-clamp-1 text-center text-light-1">
                    {user.name}
                </p>
                <p className="small-regular line-clamp-1 text-center text-light-3">
                    @{user.username}
                </p>
            </div>

            <Button type="button" size="sm" className="shad-button_primary px-5">
                Theo dõi
            </Button>
        </Link>
    );
};

export default UserCard;