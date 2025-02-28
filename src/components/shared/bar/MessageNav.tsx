import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {INavLink} from "@/model/type.ts";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {RECEIVE_MESSAGE_EVENT} from "@/constants";
import {countUnreadMessages} from "@/services/message.ts";

interface MessageNavParams {
    link: INavLink,
    isActive: boolean,

}

const MessageNav: React.FC<MessageNavParams> = ({link, isActive}) => {
    const [markAsRead, setMarkAsRead] = React.useState<boolean>(true);
    const {socket} = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        socket.on(RECEIVE_MESSAGE_EVENT, () => {
            setMarkAsRead(false);
        });

        return () => {
            socket.off(RECEIVE_MESSAGE_EVENT);
        };
    }, [socket]);

    useEffect(() => {
        countUnreadMessages().then(res => {
            setMarkAsRead(res === 0);
        });
    }, []);


    return (
        <>
            <NavLink onClick={() => setMarkAsRead(true)}
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
export default MessageNav;