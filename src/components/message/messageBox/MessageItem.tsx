import React, {useState} from "react";
import moment from 'moment';
import {isCloudinaryURL, isValidURL, splitWithURLs} from "@/utils/linkUtil.ts";
import {FileType, MessageResponse} from "@/model/type.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import Tippy from "@tippyjs/react";
import Avatar from "@/components/shared/Avatar.tsx";
import FileDownload from "@/components/message/messageBox/FileDownload.tsx";
import MessageEmbedItem from "@/components/message/messageBox/MessageEmbedItem.tsx";
import {IoMdClose} from "react-icons/io";

interface MessageItemProps {
    message: MessageResponse;
}

interface MediaSource {
    url: string;
    type: "IMAGE" | "VIDEO";
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
    const {userContext} = useUserContext();
    const [isImageError, setImageError] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [mediaSelection, setMediaSelection] = useState<MediaSource | null>(null);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const closePreview = () => {
        setIsPreview(false);
        setMediaSelection(null);
    };

    const renderMessageContent = (mes: string) => {
        if (!isValidURL(mes)) {
            return renderPlainTextMessage(mes);
        }

        const cloudinaryURL: FileType | null = isCloudinaryURL(mes);
        if (cloudinaryURL) {
            return cloudinaryURL.isImage ? renderImageMessage(mes) : renderVideoMessage(mes);
        }

        return renderEmbedMessage(mes);
    };

    const renderPlainTextMessage = (mes: string) => {
        const splitMessageWithURL = splitWithURLs(mes);

        return (
            <>
                <p className="whitespace-pre-wrap break-words px-2">
                    {splitMessageWithURL.map((part, index) =>
                        isValidURL(part) ? (
                            renderLinkMessage(part)
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    )}
                </p>
                {splitMessageWithURL.map(
                    (part, index) =>
                        isValidURL(part) && (
                            <div key={`embed-${index}`} className="my-2">
                                <MessageEmbedItem url={part} width="100%" height={240}/>
                            </div>
                        )
                )}
            </>
        );
    };

    const renderImageMessage = (url: string) => (
        <Tippy
            placement="right-end"
            content={<FileDownload url={url}/>}
            interactive={true}
            delay={[200, 100]}
            animation="shift-away"
            theme="translucent"
            disabled={isImageError}
        >
            <img
                src={url}
                className="h-full max-h-[260px] w-auto rounded-xl object-scale-down sm:max-h-[300px] md:max-h-[280px]"
                alt={url}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/side-img.svg";
                    setImageError(true);
                }}
                onClick={() => handleMediaSelection(url, "IMAGE")}
            />
        </Tippy>
    );

    const renderVideoMessage = (url: string) => (
        <video
            src={url}
            controls
            className="h-full max-h-[260px] w-auto rounded-xl object-scale-down sm:max-h-[300px] md:max-h-[280px]"
            onClick={() => handleMediaSelection(url, "VIDEO")}
        />
    );

    const renderEmbedMessage = (url: string) => (
        <>
            {renderLinkMessage(url)}
            <MessageEmbedItem url={url} width="100%" height={240}/>
        </>
    );

    const renderLinkMessage = (url: string) => (
        <a href={url}
           key={`url-${url.length}`}
           target="_blank" rel="noreferrer"
           className="break-words px-2 text-gray-600 underline"
        >
            {url}
        </a>
    );

    const renderAvatar = () => {
        return (
            <Tippy
                placement="right-start"
                content={
                    <></>
                }
                interactive={true}
                delay={[100, 100]}
                animation={'shift-away'}
                theme={'translucent'}
                visible={visible}
                onClickOutside={hide}
            >
                <div
                    className="self-start px-2"
                    title={message.sender.nickname}
                    onClick={visible ? hide : show}
                >
                    <Avatar
                        imageUrl={message.sender.avatarUrl}
                        name={message.sender.nickname}
                        style="size-10"
                    />
                </div>
            </Tippy>
        );
    };

    const renderTime = () => {
        if (moment(new Date(message.createdAt).getTime()).isSame(new Date(), 'day')) {
            return moment(new Date(message.createdAt).getTime()).format('HH:mm');
        }
        if (moment(new Date(message.createdAt).getTime()).isSame(new Date(), 'year')) {
            return moment(new Date(message.createdAt).getTime()).format('DD/M HH:mm');
        }
        return moment(new Date(message.createdAt).getTime()).format('DD/M/YYYY HH:mm');
    }

    const handleMediaSelection = (url: string, type: "IMAGE" | "VIDEO") => {
        setMediaSelection({url, type});
        setIsPreview(true);
    }

    const renderShowPreview = () => {
        if (!mediaSelection || !isPreview) return null;
        let item;
        if (mediaSelection.type === "IMAGE") {
            item = (
                <img
                    src={mediaSelection.url}
                    alt={mediaSelection.url}
                    className="max-h-[88%] max-w-full rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                />
            );
        } else {
            item = (
                <video
                    src={mediaSelection.url}
                    className="max-h-[88%] max-w-full rounded-xl"
                    controls
                    muted
                    onClick={(e) => e.stopPropagation()}
                />
            );
        }
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                onClick={closePreview} // Close preview on click outside
            >
                {item}
                <IoMdClose
                    className="absolute right-4 top-4 cursor-pointer text-4xl text-white"
                    onClick={closePreview}
                />
            </div>
        );
    }

    return (

        <div className='flex my-1'>
            {message.sender.id !== userContext.id && renderAvatar()}
            <div
                className={`w-fit max-w-[243px] rounded-xl p-2 md:max-w-sm lg:max-w-md 
                        ${userContext.id === message.sender.id ? 'ml-auto bg-primary-500' : 'bg-dark-4'}`
                }
            >
                <div className={'flex flex-col'}>
                    <div className="relative w-full text-[15px] font-light leading-[140%]">
                        {renderMessageContent(message.content)}
                    </div>
                    <div className='mt-1'>
                        <p className={`w-fit px-2 text-xs text-light-4`}>
                            {/*<p className={`w-fit px-2 text-xs text-light-4 ${userContext.id === message.sender.id ? 'ml-auto' : ''}`}>*/}
                            {renderTime()}
                        </p>
                    </div>
                </div>
            </div>

            {renderShowPreview()}
        </div>

    );
};
export default MessageItem;