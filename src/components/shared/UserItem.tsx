import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from "@/components/shared/Avatar.tsx";
import { Button } from "@/components/ui";
import {routes} from "@/route";

interface UserItemProps {
    imageUrl: string;
    name: string;
    nickname: string;
}

const UserItem: React.FC<UserItemProps> = ({ imageUrl, name, nickname }) => {
    return (
        <div className="flex items-center justify-between">
            <Link to={routes.profile.replace(':nickname/*', nickname)} className="flex items-center gap-4">
                <Avatar
                    type={0}
                    imageUrl={imageUrl}
                    style={'size-11'}
                    name={name}
                />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">@{nickname}</p>
                    <p className="text-sm font-extralight">{name}</p>
                </div>
            </Link>
            <Button type="button" className="shad-button_primary bg-primary-500 px-3">
                Đang theo dõi
            </Button>
        </div>
    );
}

export default UserItem;