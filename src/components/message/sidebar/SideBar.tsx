import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui";
import {SidebarItem} from "@/components/message/sidebar";
import {MessageResponse} from "@/model/type.ts";
import {getAllConservations} from "@/services/message.ts";
import {PAGE_SIZE_NOTIFICATION, PAGE_SIZE_SIDE_BAR_MESSAGE, RECEIVE_MESSAGE_EVENT} from "@/constants";
import {Loader} from "@/components/shared";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import CreateGroupModal from "@/components/message/groupForm/CreateGroupModal.tsx";

const SideBar = () => {
    const [conservations, setConservations] = useState<MessageResponse[]>([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const {socket} = useSocketContext();
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getAllConservations(page, PAGE_SIZE_SIDE_BAR_MESSAGE).then((response) => {
            // sort response by last message time
            response.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            setConservations(response);
            response.length < PAGE_SIZE_NOTIFICATION ? setHasMore(false) : setHasMore(true);
        }).catch(() => {
            setHasMore(false);
        }).finally(() => {
        });
    }, [page]);

    // Lắng nghe sự kiện tin nhắn mới từ WebSocket
    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleNewMessage = (messageJson: string) => {
            const newMessage: MessageResponse = JSON.parse(messageJson);

            setConservations((prevConservations) => {
                const conversationId = newMessage.conversation.id;

                // Kiểm tra xem cuộc trò chuyện đã có trong danh sách chưa
                const existingIndex = prevConservations.findIndex(
                    (conv) => conv.conversation.id === conversationId
                );

                let updatedConversations;
                if (existingIndex !== -1) {
                    // Nếu đã có, đưa cuộc trò chuyện lên đầu và cập nhật tin nhắn mới nhất
                    const updatedConversation = {
                        ...prevConservations[existingIndex],
                        content: newMessage.content,
                        createdAt: newMessage.createdAt,
                        isRead: false,
                    };

                    updatedConversations = [
                        updatedConversation,
                        ...prevConservations.filter((_, idx) => idx !== existingIndex),
                    ];
                } else {
                    // Nếu chưa có, thêm cuộc trò chuyện mới vào đầu danh sách
                    updatedConversations = [newMessage, ...prevConservations];
                }

                return updatedConversations;
            });
        };

        socket.on(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        return () => {
            socket.off(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        };
    }, [socket]);

    const handleShowCreateGroupModal = () => {
        setShowModal(true);
    }

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

                <div className='custom-scrollbar h-[calc(100vh-165px)] w-[96%] overflow-y-auto overflow-x-hidden'>
                    {
                        conservations.length === 0 && (
                            <div className='mt-12'>
                                <p className='text-center text-lg text-slate-400'>Không tìm thấy tin nhắn nào.</p>
                            </div>
                        )
                    }

                    <InfiniteScroll
                        loader={<Loader/>}
                        fetchMore={() => setPage((prev) => prev + 1)}
                        hasMore={hasMore}
                    >
                        {conservations.map((user, index) =>
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