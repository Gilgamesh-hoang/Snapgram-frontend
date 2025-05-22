import React, {useEffect, useRef} from "react";
import {Loader} from "@/components/shared";
import {ConservationInfo, MessageResponse} from "@/model/type.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {addNewMessage, fetchMessages} from "@/redux/messageSlice.ts";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {RECEIVE_MESSAGE_EVENT} from "@/constants";
import {useSearchParams} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "@/components/message/messageBox/MessageItem.tsx";

interface MessagePanelProps {
    info: ConservationInfo;
}

const MessagesPanel: React.FC<MessagePanelProps> = ({info}) => {

    const dispatch = useDispatch<AppDispatch>();
    const messageState = useSelector((state: RootState) => state.messages.messages[info.id]);
    const conversation = messageState || {messages: [], page: 1, hasMore: true, isLoading: false};
    const messages = conversation.messages;
    const hasMore = conversation.hasMore;
    const isLoading = conversation.isLoading;
    const {socket} = useSocketContext();
    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");


    useEffect(() => {
        if (action === 'new') {
            return;
        }
        // Gọi fetchMessages nếu chưa có tin nhắn hoặc conversation chưa được khởi tạo
        if ((!messageState || messages.length === 0) && hasMore && !isLoading) {
            dispatch(fetchMessages({id: info.id, type: info.type}));
        }
    }, [dispatch, info.id, info.type, messageState, hasMore, isLoading]);


    // Lắng nghe sự kiện tin nhắn mới từ WebSocket
    useEffect(() => {
        if (!socket || !info || !info.id || !info.type) {
            return;
        }

        const handleNewMessage = (messageJson: string) => {
            const newMessage: MessageResponse = JSON.parse(messageJson);
            if (newMessage.conversation.id === info.id) {
                dispatch(addNewMessage({id: newMessage.conversation.id, message: newMessage}));
            }
        };

        socket.on(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        return () => {
            socket.off(RECEIVE_MESSAGE_EVENT, handleNewMessage);
        };
    }, [dispatch, info.id, info.type, socket]);

    const loadMoreMessages = () => {
        if (isLoading || !hasMore) {
            return;
        }
        dispatch(fetchMessages({id: info.id, type: info.type}));
    };


    return (
        <section
            className="custom-scrollbar relative flex h-[calc(100vh-213px)] flex-col-reverse overflow-y-auto overflow-x-hidden"
            id="messageScrollable"
        >
            {/**all messages show here */}
            <InfiniteScroll
                dataLength={messages.length}
                next={loadMoreMessages}
                hasMore={hasMore}
                loader={<Loader/>}
                scrollableTarget="messageScrollable"
                inverse={true}
                className="flex flex-col-reverse overflow-hidden"
            >
                {messages.map((msg: MessageResponse, index: number) => (
                    <MessageItem key={msg.id} message={msg}/>
                ))}
            </InfiniteScroll>

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
