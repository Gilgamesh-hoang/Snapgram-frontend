import React, {FC} from "react";
import {User} from "@/model/type.ts";
import {clsx} from "clsx";
import Avatar from "@/components/shared/Avatar.tsx";

interface UserItemProps {
    user: User;
    onClick?: (user: User) => void;
    className?: string;
}

const UserItem: FC<UserItemProps> = ({user, onClick, className = ""}) => {

    const handleClick = () => {
        onClick && onClick(user);
    }

    return (
        <div className={clsx('flex w-full items-center', className)}>
            <label onClick={handleClick}
                   htmlFor={`checkbox-${user.id}`} className='flex items-center gap-2'>
                <Avatar imageUrl={user.avatarUrl} name={user.nickname} style="size-10"/>
                <div className="ml-3">
                    <p className="base-semibold line-clamp-1 block text-ellipsis whitespace-nowrap">{user.nickname}</p>
                    <p className="small-regular line-clamp-1 block text-ellipsis whitespace-nowrap text-gray-500">
                        {user.fullName}
                    </p>
                </div>
            </label>
        </div>
    )
        ;
};

export default UserItem;