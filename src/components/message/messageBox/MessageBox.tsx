import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import React, {useRef, useState} from "react";
import {HiDotsVertical} from "react-icons/hi";
import FileUpload from "@/components/message/FileUpload.tsx";
import {Loader} from "@/components/shared";
import EmojiPicker from "@/components/message/EmojiPicker.tsx";
import MessageItem, {Message} from "@/components/message/messageBox/MessageItem.tsx";
import Avatar from "@/components/shared/Avatar.tsx";

interface FileUploadProps {
    isImage: boolean;
    file: File;
}

//fake data for allMessage
const allMessage: Message[] = [
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van b',
        type: 1,
        to: 'Nguyen van a',
        mes: 'Hello Nguyen van a',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van b',
        type: 1,
        to: 'Nguyen van a',
        mes: 'Hello Nguyen van a',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van b',
        type: 1,
        to: 'Nguyen van a',
        mes: 'Hello Nguyen van a',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van b',
        type: 1,
        to: 'Nguyen van a',
        mes: 'Hello Nguyen van a',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van b',
        type: 1,
        to: 'Nguyen van a',
        mes: 'Hello Nguyen van a',
        createAt: new Date(),
    },
    {
        name: 'Nguyen van a',
        type: 1,
        to: 'Nguyen van b',
        mes: 'Hello Nguyen van b',
        createAt: new Date(),
    },];

const MessageBox = () => {
    const [selectedFile, setSelectedFile] = useState<FileUploadProps | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [userOnline, setUserOnline] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    return (
        <div className="rounded-xl bg-dark-3 pb-4">
            <header className="sticky flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-4">
                    <Link to={'/'} className="lg:hidden">
                        <FaAngleLeft size={25}/>
                    </Link>
                    <Avatar
                        type={0}
                        imageUrl={"https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain"}
                        style={'size-14'}
                        name={'Nguyen van a'}
                    />
                    <div className='flex flex-col'>
                        <h3 className="line-clamp-1 text-ellipsis text-lg font-semibold">Nguyen van a</h3>
                        <p className="my-2 text-sm">
                            {
                                userOnline ? <span className="">online</span> :
                                    <span className="text-slate-400">offline</span>
                            }
                        </p>
                    </div>
                </div>

                <div>
                    <button className=" cursor-pointer">
                        <HiDotsVertical/>
                    </button>
                </div>
            </header>
            <hr className='mx-5 mb-6 h-px border-none bg-light-4'/>

            {/***show all messages */}
            <section
                className="custom-scrollbar relative h-[calc(100vh-213px)] overflow-x-hidden overflow-y-scroll">


                {/**all messages show here */}
                <div className="mx-5 flex flex-col-reverse py-2 ">
                    {
                        allMessage.map((msg: Message, index: number) =>
                            <MessageItem key={index} msg={msg} username={'Nguyen van a'} type={1}/>,
                        )
                    }
                </div>

                {
                    loading && (
                        <div className="sticky bottom-0 flex size-full items-center justify-center">
                            <Loader/>
                        </div>
                    )
                }
            </section>

            {/**send a message */}
            <section>
                <div className="mt-4 flex flex-col items-center px-4">
                    <form className="relative flex w-full gap-5">
                        <div className='absolute top-[3px] flex items-center '>
                            {/*show file upload*/}
                            <FileUpload setSelectedFile={setSelectedFile}/>

                            {/**emoji picker */}
                            <EmojiPicker inputRef={inputRef}/>
                        </div>

                        <input
                            type="text"
                            className="h-[3.2rem] w-full rounded-md border-none bg-dark-4 py-2 pl-[5.75rem] pr-12 text-sm placeholder:text-slate-500"
                            placeholder='Type here message...'
                        />
                        <button className='absolute top-[15px] right-3'>
                            <img
                                src={"/assets/icons/send-secondary.svg"}
                                alt="send"
                                width={20}
                                height={20}
                            />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default MessageBox;