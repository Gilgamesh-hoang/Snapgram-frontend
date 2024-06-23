import {NavLink} from "react-router-dom";
import React from "react";
import {routes} from "@/route";

interface IConv {
    _id: number;
    userDetails: {
        _id: number;
        name: string;
        username: string;
        imageUrl: string;
    };
    lastMsg: {
        text: string;
        time: string;
    };
    unseenMsg: number;

}

const SideBarItem : React.FC<IConv> = (conv) => {
    return (
        <NavLink to={`${routes.messages}/u/1`} key={conv?._id}
                 className='flex cursor-pointer items-center gap-2 rounded border border-transparent px-2 py-3 hover:bg-dark-4'>
            <div>
                <img
                    src={"https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?rs=1&pid=ImgDetMain"}
                    alt="creator"
                    className="size-14 rounded-full"
                />
            </div>
            <div className="lg:max-w-[200px]">
                <h3 className='line-clamp-1 text-ellipsis text-base font-semibold'>{conv?.userDetails?.name}</h3>
                <div className='flex items-center gap-1 text-xs text-slate-500'>
                    <p className='small-regular line-clamp-1 text-ellipsis'>{conv?.lastMsg?.text}</p>
                </div>
            </div>
            {
                Boolean(conv?.unseenMsg) && (
                    <span
                        className="ml-auto flex size-2 items-center justify-center rounded-full bg-red p-1"></span>
                )
            }
        </NavLink>
    )
}
export default SideBarItem;