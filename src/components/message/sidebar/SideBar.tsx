import React from "react";
import {Input} from "@/components/ui";
import {SidebarItem} from "@/components/message/sidebar";

const SideBar = () => {
    //fake data for all user

    const allUser = [
        {
            _id: 1,
            userDetails: {
                _id: 1,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 2,
        },
        {
            _id: 2,
            userDetails: {
                _id: 2,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 3,
            userDetails: {
                _id: 3,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 4,
            userDetails: {
                _id: 4,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 1,
            userDetails: {
                _id: 1,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 2,
        },
        {
            _id: 2,
            userDetails: {
                _id: 2,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 3,
            userDetails: {
                _id: 3,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 4,
            userDetails: {
                _id: 4,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 1,
            userDetails: {
                _id: 1,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 2,
        },
        {
            _id: 2,
            userDetails: {
                _id: 2,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 3,
            userDetails: {
                _id: 3,
                name: "John Doe",
                username: "john_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
        {
            _id: 4,
            userDetails: {
                _id: 4,
                name: "Jane Doe",
                username: "jane_doe",
                imageUrl: "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain",
            },
            lastMsg: {
                text: "Hello, how are you?",
                time: "12:00 PM",
            },
            unseenMsg: 0,
        },
    ];

    return (
        <div className='size-full'>
            <div className="mb-4 flex w-full max-w-5xl gap-2 ">
                <img
                    src="/assets/icons/chat.svg"
                    width={36}
                    height={36}
                    alt="edit"
                    className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold w-full text-left">Tin nhắn</h2>
            </div>
            <form className="relative mb-4 w-[96%] gap-1 rounded-lg bg-dark-4">
                <img className='absolute top-[13px] ml-2'
                     src="/assets/icons/search.svg"
                     width={24}
                     height={24}
                     alt="search"
                />
                <Input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="explore-search w-full pe-2 ps-11"
                />
            </form>

            <div className='custom-scrollbar h-[calc(100vh-165px)] overflow-y-auto overflow-x-hidden'>
                {
                    allUser.length === 0 && (
                        <div className='mt-12'>
                            <p className='text-center text-lg text-slate-400'>Explore users to start a
                                conversation with.</p>
                        </div>
                    )
                }

                {
                    allUser.map((user, index) =>
                        <SidebarItem key={index} {...user} />
                    )
                }
            </div>
        </div>
    );
}

export default SideBar;