import React, {useEffect, useMemo, useRef} from "react";
import MessageItem from "@/components/message/messageBox/MessageItem.tsx";
import {Loader} from "@/components/shared";
import {ConservationInfo, MessageResponse} from "@/model/type.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {addNewMessage, fetchMessages, setPage} from "@/redux/messageSlice.ts";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {RECEIVE_MESSAGE_EVENT} from "@/constants";
import {useSearchParams} from "react-router-dom";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";

interface MessagePanelProps {
    info: ConservationInfo;
}
const MessagesPanel: React.FC<MessagePanelProps> = ({info}) => {

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const rawMessages = useSelector((state: RootState) => state.messages.messages[info.id]);
    const messages = useMemo(() => rawMessages || [], [rawMessages]);
    const page = useSelector((state: RootState) => state.messages.page[info.id] || 1);
    const isLoading = useSelector((state: RootState) => state.messages.isLoading);
    const hasMore = useSelector((state: RootState) => state.messages.hasMore[info.id] || false);
    const {socket} = useSocketContext();
    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");


    useEffect(() => {
        if (messages.length > 0 || action === 'new') {
            return;
        }
        dispatch(fetchMessages({id: info.id, type: info.type, page: 1}));
        dispatch(setPage({id: info.id, page: 1}));
        // dispatch(fetchMessages({id: info.id, type: info.type, page: 1}));
        // dispatch(setPage({id: info.id, page: 1}));
    }, [dispatch, info.id, info.type, messages.length]);


    useEffect(() => {
        scrollToBottom();
    }, []);

    // Lắng nghe sự kiện tin nhắn mới từ WebSocket
    useEffect(() => {
        if (!socket || !info || !info.id || !info.type) {
            return;
        }

        const handleNewMessage = (messageJson: string) => {
            const newMessage: MessageResponse = JSON.parse(messageJson);
            if (newMessage.conversation.id === info.id) {
                dispatch(addNewMessage({id: newMessage.conversation.id, message: newMessage}));
                // dispatch(addNewMessage({id: newMessage.conversation.id, message: newMessage}));
            }
        };

        socket.on(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        return () => {
            socket.off(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        };
    }, [dispatch, info.id, info.type, socket]);

    const loadMoreMessages = () => {
        if (isLoading || !hasMore) {
            console.log(`Not fetching more messages - isLoading: ${isLoading}, hasMore: ${hasMore}`);
            return;
        }
        dispatch(fetchMessages({ id: info.id, type: info.type, page: page + 1 }));
        dispatch(setPage({ id: info.id, page: page + 1 }));
        // dispatch(fetchMessages({ id: info.id, type: info.type, page: page + 1 }));
        // dispatch(setPage({ id: info.id, page: page + 1 }));
    };



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'auto', block: 'end'});
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }, 500);
    };

    return (
        <section
            className="custom-scrollbar relative h-[calc(100vh-213px)] overflow-x-hidden overflow-y-scroll">
            {/**all messages show here */}
            <div className="mx-5 flex flex-col-reverse gap-1 py-2"
                 ref={messagesEndRef}
            >

                <InfiniteScroll
                    loader={<Loader/>}
                    fetchMore={loadMoreMessages}
                    hasMore={hasMore}
                >
                    {
                        messages.map((msg: MessageResponse, index: number) =>
                            <MessageItem key={msg.id} message={msg}/>,
                        )
                    }
                </InfiniteScroll>
                {/*<div ref={messagesEndRef}/>*/}
            </div>

            {
                isLoading && (
                    <div className="sticky bottom-0 flex size-full items-center justify-center">
                        <Loader/>
                    </div>
                )
            }
        </section>
    );
}
export default MessagesPanel;
