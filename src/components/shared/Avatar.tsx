import {PiUserCircle} from "react-icons/pi";
import React, {useMemo} from "react";
import {HiMiniUserGroup} from "react-icons/hi2";
import {clsx} from "clsx";
import {ConservationType} from "@/model/type.ts";

interface AvatarProps {
    type?: ConservationType;
    name: string;
    imageUrl?: string|null;
    style?: string;
}

const Avatar: React.FC<AvatarProps> = ({type='USER', name, imageUrl, style}) => {
    const avatarName = useMemo(() => {
        if (!name) return '';

        const splitName = name.split(" ");
        if (splitName.length > 1) {
            return splitName[0][0] + splitName[1][0];
        } else if (splitName[0].length > 1) {
            return splitName[0][0] + splitName[0][1];
        } else {
            return splitName[0][0];
        }
    }, [name]);

    // This function is responsible for rendering the avatar based on the provided props.
    const renderAvatar = () => {
        // If the type prop is 'room', render a group icon.
        if (imageUrl) {
            return (
                <img
                    src={imageUrl}
                    alt={name}
                    className={clsx('overflow-hidden rounded-full object-cover', style)}
                />
            );
        }
        // If an imageUrl prop is provided, render an image with the provided URL.
        else if (type === 'GROUP') {
            return (
                <div className={`flex items-center justify-center rounded-full border-2 border-gray-700`}>
                    <HiMiniUserGroup className={style}/>
                </div>
            );

        }
        // If a name prop is provided but no imageUrl, render a div with the initials of the name.
        else if (name) {
            return (
                <div
                    className={clsx(`flex items-center justify-center rounded-full bg-primary-500 text-lg`, style)}>
                    {avatarName}
                </div>
            );
        }
        // If no imageUrl or name prop is provided, render a default user circle icon.
        else {
            return <PiUserCircle className={style}/>;
        }
    };

    return (
        <div className={clsx(`relative rounded-full`, style)}>
            {renderAvatar()}
        </div>
    );
}

export default React.memo(Avatar);