import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MessageResponse} from "@/model/type.ts";
import Avatar from "@/components/shared/Avatar.tsx";
import {multiFormatDateString} from "@/utils/dateUtil.ts";
import {isCloudinaryURL, isValidURL} from "@/utils/linkUtil.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {clsx} from "clsx";
import {CiImageOn, CiVideoOn} from "react-icons/ci";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {createSelector} from "@reduxjs/toolkit";
import {markAsReadMessage} from "@/services/message.ts";
import {generateMessageLink} from "@/utils/common.ts";

const selectMessagesById = createSelector(
    (state: RootState) => state.messages.messages,
    (_, id: string) => id,
    (messages, id) => messages[id] || []
);

const SideBarItem: React.FC<MessageResponse> = (message) => {
    const {userContext} = useUserContext();
    const [isRead, setIsRead] = useState<boolean>(() => {
        if (message.sender?.id === userContext.id) {
            return true;
        }
        return message.isRead;
    });
    const [lastMessage, setLastMessage] = useState<MessageResponse>(message);
    const conversationInfo = message.conversation;
    const messages = useSelector((state: RootState) => selectMessagesById(state, conversationInfo.id));
    const params = useParams();
    const currentConversationId = params.conservationId;
    const isActive = currentConversationId === conversationInfo.id;

    useEffect(() => {
        if (messages.length > 0) {
            console.log('Updating last message for conversation:', conversationInfo.id, messages[0])
            setLastMessage(messages[0]);
        }
    }, [messages]);


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
                    <p className='small-regular line-clamp-1 text-ellipsis'>{renderLastMess(lastMessage)}</p>
                    <p className='text-right'>{lastMessage.createdAt && multiFormatDateString(lastMessage.createdAt)}</p>
                </div>

            </div>

        </NavLink>
    )
}
export default SideBarItem;