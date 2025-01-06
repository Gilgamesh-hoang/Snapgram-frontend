import React, {useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "@/components/shared/Avatar.tsx";
import {multiFormatDateString} from "@/utils/dateUtil.ts";
import {generatePostLink, generateProfileLink} from "@/utils/common.ts";
import {Notification} from "@/model/type.ts";
import Tippy from "@tippyjs/react";
import {IoIosMore} from "react-icons/io";
import {deleteNotification} from "@/services/notification.ts";

interface NotificationItemProps {
    notification: Notification;
    handleDeleteSuccess: (id:string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({notification, handleDeleteSuccess}) => {

    const [isOpenOption, setIsOpenOption] = useState(false);


    const handleDeleteNotify = () => {
        deleteNotification(notification.id).then(() => {
            handleDeleteSuccess(notification.id);
        });
    }
    const handleClickOutside = () => {
        setIsOpenOption(false); // Hide Tippy when clicking outside
    };

    const renderContentOptions = () => {
        return (
            <div className='flex flex-col justify-center pe-6'>
                <Tippy
                    content={
                        <div className='w-16 rounded-md bg-dark-4 shadow-md'>
                            <button className='small-regular w-full p-3 text-left text-light-2 hover:opacity-80'
                                    onClick={handleDeleteNotify}
                            >
                                Xóa
                            </button>
                        </div>}
                    placement='top-start'
                    offset={[-10, 5]}
                    visible={isOpenOption}
                    interactive={true}
                    onClickOutside={handleClickOutside}
                >
                    <div onClick={() => {
                        setIsOpenOption((prevVisible) => !prevVisible)
                    }}>
                        <IoIosMore className='cursor-pointer text-gray-500' size={25}/>
                    </div>
                </Tippy>
            </div>

        );
    }

    const renderItem = (): React.ReactNode => {
        let path = '';
        let content = '';
        switch (notification.type) {
            case "COMMENT_POST":
                path = generatePostLink(notification.options.postId);
                content = " đã bình luận bài viết của bạn: " + notification.content;
                break;
            case "LIKE_POST":
                path = generatePostLink(notification.entityId);
                content = " đã thích bài viết của bạn: " + notification.content;
                break;
            case "FOLLOW_USER":
                path = generateProfileLink(notification.actor.nickname);
                content = " đã theo dõi bạn";
                break;
            case "LIKE_COMMENT":
                path = generatePostLink(notification.options.postId);
                content = " đã thích bình luận của bạn: " + notification.content;
                break;
            case "REPLY_COMMENT":
                path = generatePostLink(notification.options.postId);
                content = " đã trả lời bình luận của bạn: " + notification.content;
                break;
        }
        return (
            <li key={notification.id} className='w-full rounded-2xl hover:bg-dark-3'>
                <div className='flex '>
                    <Link to={path} className='flex w-full p-6'>
                        <div className='mr-3 w-10'>
                            <Avatar
                                imageUrl={notification.actor?.avatarUrl}
                                style={'size-10'}
                                name={notification.actor?.nickname}
                            />
                        </div>

                        <div className='w-full'>
                            <span className='base-extrabold'>{notification.actor?.nickname}</span>
                            <span className='base-light'>{content}</span>
                            <div className="flex-start mt-2 gap-2 text-light-3">
                                <p className="subtle-semibold lg:small-regular">
                                    {multiFormatDateString(notification.createdAt)}
                                </p>
                            </div>
                        </div>
                    </Link>

                    {renderContentOptions()}

                </div>
                <hr className='h-px border-none bg-light-4'/>
            </li>
        );
    }

    return (
        <>
            {renderItem()}
        </>
    );
}

export default NotificationItem;