import {useState} from "react";
import moment from 'moment';
import {isValidURL} from "@/utils/linkUtil.ts";

export interface Message {
    name: string;
    type: 0 | 1 | number;
    to: string;
    mes: string;
    createAt: Date;
}

interface MessageItemProps {
    msg: Message;
    username: string;
    type: 0 | 1;
}

const MessageItem: React.FC<MessageItemProps> = ({msg, username, type}) => {
    const [isImageError, setImageError] = useState(false);
    const renderMessageContent = (mes: string) => {
        if (isValidURL(mes)) {
            // const cloudinaryURL: FileType | null = isCloudinaryURL(mes);
            // if (cloudinaryURL) {
            //     if (cloudinaryURL.isImage) {
            //         return (
            //             <Tippy
            //                 placement='right-start'
            //                 content={<FileDownload url={mes}/>}
            //                 interactive={true}
            //                 delay={[200, 100]}
            //                 animation={'shift-away'}
            //                 theme={'translucent'}
            //                 disabled={isImageError}
            //             >
            //                 <img
            //                     src={mes}
            //                     className="w-auto h-full max-h-[260px] sm:max-h-[300px] md:max-h-[280px] object-scale-down"
            //                     alt={mes}
            //                     onError={(e) => {
            //                         (e.target as HTMLImageElement).src = "/assets/images/side-img.svg";
            //                         setImageError(true);
            //                     }}
            //                 />
            //             </Tippy>
            //
            //         );
            //
            //     } else if (cloudinaryURL.isVideo) {
            //         return <video src={mes} controls
            //                       className="w-auto h-full max-h-[260px] sm:max-h-[300px] md:max-h-[280px] object-scale-down"/>;
            //     }
            // } else {
            return <a href={mes} target="_blank" rel="noreferrer"
                      className={'break-words px-2 text-blue-500 underline'}>{mes}</a>;
            // }

        } else {
            return <p className={'break-words px-2'}>{mes}</p>;
        }
    };
    return (
        <div className={'flex flex-col'}>

            <div
                className={`w-fit max-w-[243px] rounded-xl p-2 md:max-w-sm lg:max-w-md ${username === msg.name ? 'ml-auto bg-primary-500' : 'bg-dark-4'}`}>
                <div className="relative w-full">
                    {renderMessageContent(msg.mes)}
                </div>

            </div>
            <div className='mt-2'>
                <p className={`w-fit px-1 text-xs text-light-4 ${username === msg.name ? 'ml-auto' : ''}`}>
                    {moment(new Date(msg.createAt).getTime()).isSame(new Date(), 'day')
                        ? moment(new Date(msg.createAt).getTime()).format('HH:mm')
                        : moment(new Date(msg.createAt).getTime()).format('DD/MM/YYYY HH:mm')}
                </p>
            </div>
        </div>
    );
};
export default MessageItem;