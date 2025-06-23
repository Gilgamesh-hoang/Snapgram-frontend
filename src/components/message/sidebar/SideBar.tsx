import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui";
import {SidebarItem} from "@/components/message/sidebar";
import {MessageResponse} from "@/model/type.ts";
import {RECEIVE_MESSAGE_EVENT} from "@/constants";
import {Loader} from "@/components/shared";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import CreateGroupModal from "@/components/message/groupForm/CreateGroupModal.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {addLastMessage, fetchLastMessages} from "@/redux/sidebarMessageSlice.ts";

const SideBar = () => {
    const {socket} = useSocketContext();
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { lastMessages, isLoading, hasMore } = useSelector((state: RootState) => state.sidebarMessage);

    useEffect(() => {
        loadMoreLastMessages();
    }, [dispatch]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (messageJson: string) => {
            const newMessage: MessageResponse = JSON.parse(messageJson);
            dispatch(addLastMessage(newMessage));
        };

        socket.on(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        return () => {
            socket.off(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        };
    }, [socket, dispatch]);


    const handleShowCreateGroupModal = () => {
        setShowModal(true);
    }

    const loadMoreLastMessages = () => {
        if (isLoading || !hasMore) {
            return;
        }
        dispatch(fetchLastMessages());
    };

    return (
        <>
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
                <div className='mb-4 flex items-center justify-between gap-1'>
                    <form className="relative w-[85%] gap-1 rounded-lg bg-dark-4">
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
                    <div className='mr-1 cursor-pointer rounded-lg p-2 hover:bg-dark-4'
                         onClick={handleShowCreateGroupModal}
                    >
                        <MdOutlineGroupAdd className='h-8 w-6'/>
                    </div>
                </div>

                <div className='custom-scrollbar h-[calc(100vh-165px)] w-[96%] overflow-y-auto overflow-x-hidden'
                     id="sidebarMessageScrollable"
                >
                    {
                        lastMessages.length === 0 && (
                            <div className='mt-12'>
                                <p className='text-center text-lg text-slate-400'>Không tìm thấy tin nhắn nào.</p>
                            </div>
                        )
                    }

                    <InfiniteScroll
                        dataLength={lastMessages.length}
                        next={loadMoreLastMessages}
                        hasMore={hasMore}
                        loader={<Loader/>}
                        scrollableTarget="sidebarMessageScrollable"
                        style={{overflow: "hidden"}}
                    >
                        {lastMessages.map((user, index) =>
                            <SidebarItem key={index} {...user} />
                        )}
                    </InfiniteScroll>
                </div>
            </div>
            {showModal && <CreateGroupModal onClose={() => setShowModal(false)}/>}
        </>
    );
}


export default SideBar;