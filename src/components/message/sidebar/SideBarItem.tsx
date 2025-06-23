import {NavLink, useParams} from "react-router-dom";
import React, {useState} from "react";
import {MessageResponse} from "@/model/type.ts";
import Avatar from "@/components/shared/Avatar.tsx";
import {multiFormatDateString} from "@/utils/dateUtil.ts";
import {isCloudinaryURL, isValidURL} from "@/utils/linkUtil.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {clsx} from "clsx";
import {CiImageOn, CiVideoOn} from "react-icons/ci";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store.ts";
import {markAsReadMessage} from "@/services/message.ts";
import {generateMessageLink} from "@/utils/common.ts";
import {markAsRead as markAsReadState} from "@/redux/sidebarMessageSlice.ts";

const SideBarItem: React.FC<MessageResponse> = (message) => {
    const {userContext} = useUserContext();
    const [isRead, setIsRead] = useState<boolean>(() => {
        if (message.sender?.id === userContext.id) {
            return true;
        }
        return message.isRead;
    });
    const conversationInfo = message.conversation;
    const params = useParams();
    const currentConversationId = params.conservationId;
    const isActive = currentConversationId === conversationInfo.id;
    const dispatch = useDispatch<AppDispatch>();

    const getUrl = () => {
        if (message.conversation.type === "USER") {
            return generateMessageLink('u', conversationInfo.id)
        } else {
            return generateMessageLink('g', conversationInfo.id)
        }
    }

    const markAsRead = () => {
        if (!isRead) {
            setIsRead(true);
            // Gọi API đánh dấu tin nhắn đã đọc
            markAsReadMessage(conversationInfo.id);
            dispatch(markAsReadState(conversationInfo.id));
        }
    }

    const renderLastMess = (lastMessage: MessageResponse) => {
        if (!lastMessage.id) {
            return '';
        }

        const content = lastMessage.content;
        const isURL = isValidURL(content);
        const cloudinaryURL = isURL ? isCloudinaryURL(content) : null;
        const isImage = cloudinaryURL?.isImage;
        const isVideo = cloudinaryURL?.isVideo;
        const isSender = lastMessage.sender.id === userContext.id;
        const sender = isSender ? 'Bạn: ' : (lastMessage.conversation.type === 'USER' ? '' : `${lastMessage.sender.nickname}: `);


        let msg;
        if (isURL) {
            if (isImage) {
                msg = 'Gửi ảnh ';
            } else if (isVideo) {
                msg = 'Gửi video ';
            } else {
                msg = content;
            }
        } else {
            msg = content;
        }
        return (
            <span className={clsx('truncate', {'font-bold': !isRead})}>
                <span>{sender + msg}</span>
                {isImage && <CiImageOn className="ml-1 inline size-4"/>}
                {isVideo && <CiVideoOn className="ml-1 inline size-4"/>}
            </span>
        );
    };

    return (
        <NavLink to={getUrl()} onClick={markAsRead}
                 className={clsx('flex cursor-pointer items-center gap-2 rounded border border-transparent px-2 py-3 hover:bg-dark-4',
                     {"bg-dark-4": isActive})}>
            <div>
                <Avatar
                    imageUrl={conversationInfo.avatar}
                    name={conversationInfo.name}
                    style="size-12"
                    type={conversationInfo.type}
                />
            </div>
            {/*<div className="lg:max-w-[200px]">*/}
            <div className="w-full">
                <div className='flex items-center justify-between '>
                    <h3 className='line-clamp-1 text-ellipsis text-base font-semibold'>{conversationInfo.name}</h3>
                    {
                        Boolean(!isRead) && (
                            <span
                                className="size-2 rounded-full bg-red p-1"></span>
                        )
                    }
                </div>
                <div className='flex items-center justify-between gap-1 text-xs text-slate-500'>
                    <p className='small-regular line-clamp-1 text-ellipsis'>{renderLastMess(message)}</p>
                    <p className='text-right'>{message.createdAt && multiFormatDateString(message.createdAt)}</p>
                </div>

            </div>

        </NavLink>
    )
}
export default SideBarItem;