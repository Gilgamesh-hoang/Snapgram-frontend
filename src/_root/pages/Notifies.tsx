import React, {useEffect, useState} from "react";
import {Loader} from "@/components/shared";
import {Notification} from "@/model/type.ts";
import {getNotifications} from "@/services/notification.ts";
import {PAGE_SIZE_NOTIFICATION} from "@/constants";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import NotificationItem from "@/components/shared/NotificationItem.tsx";
import {useSocketContext} from "@/context/SocketContext.tsx";

const Notifies: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const {socket} = useSocketContext();

    useEffect(() => {
        if (!socket) return;
        socket.on("notification", (response: string) => {
            const data: Notification[] = JSON.parse(response);
            updateNotification(data);
        });

        return () => {
            console.log("Removing notification listener");
            socket.off("notification");
        };
    }, [socket]);

    useEffect(() => {
        setIsLoading(true);
        getNotifications(page, PAGE_SIZE_NOTIFICATION).then(res => {
            updateNotification(res);
            res.length < PAGE_SIZE_NOTIFICATION ? setHasMore(false) : setHasMore(true);
        }).catch(() => {
            setHasMore(false);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [page]);

    const updateNotification = (data: Notification[]) => {
        setNotifications(prev => {
            // Tạo một Map để lưu trữ các thông báo duy nhất theo ID
            const notifyMap = new Map(prev.map(item => [item.id, item]));

            // Ghi đè các thông báo cũ bằng thông báo mới (dựa theo ID)
            data.forEach(item => notifyMap.set(item.id, item));

            // Chuyển Map trở lại thành mảng
            return Array.from(notifyMap.values());
        });
    }

    const handleDeleteSuccess = (id: string) => {
        setNotifications(prev => prev.filter(item => item.id !== id));
    }

    const renderNotifies = (): React.ReactNode => {
        return notifications.map((item) => {
            return (
                <NotificationItem notification={item} handleDeleteSuccess={handleDeleteSuccess} key={item.id}/>
            );
        });
    }

    return (
        <div className="common-container">
            <div className="flex w-full max-w-5xl flex-col items-start">
                <div className="mb-4 flex w-full max-w-5xl gap-2 ">
                    <img
                        src="/assets/icons/notify.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold w-full text-left">Thông báo</h2>
                </div>
                <ul className='flex w-4/5 flex-col'>
                    <InfiniteScroll
                        loader={<Loader/>}
                        fetchMore={() => setPage((prev) => prev + 1)}
                        hasMore={hasMore}
                    >
                        {renderNotifies()}
                    </InfiniteScroll>
                </ul>
            </div>
        </div>
    );
};
export default Notifies;