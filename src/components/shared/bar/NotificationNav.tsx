import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {INavLink} from "@/model/type.ts";
import {getIsReadNotification, markAsReadNotification} from "@/services/notification.ts";
import {useSocketContext} from "@/context/SocketContext.tsx";

interface NotificationNavParams {
    link: INavLink,
    isActive: boolean,

}

const NotificationNav: React.FC<NotificationNavParams> = ({link, isActive}) => {
    const [markAsRead, setMarkAsRead] = React.useState<boolean>(false);
    const {socket} = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        socket.on("notification", (response: string) => {
            setMarkAsRead(false);
        });

        return () => {
            socket.off("notification");
        };
    }, [socket]);

    useEffect(() => {
        getIsReadNotification().then(res => {
            setMarkAsRead(res);
        });
    }, []);


    const handleClick = () => {
        markAsReadNotification().then(() => {
            setMarkAsRead(true);
        });
    }


    return (
        <>
            <NavLink onClick={handleClick}
                     to={link.route}
                     className="flex w-full items-center gap-4 p-3">
                <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                        isActive && "invert-white"
                    }`}
                />
                {link.label}
            </NavLink>
            {!markAsRead && <span className="mr-2 size-2.5 rounded-full bg-red"></span>}
        </>

    );
}
export default NotificationNav;