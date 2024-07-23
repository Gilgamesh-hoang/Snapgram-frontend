import {Outlet, useLocation} from "react-router-dom";
import React from "react";
import {Sidebar} from "@/components/message/sidebar";
import {routes} from "@/route";

const Messages = () => {
    const location = useLocation();
    const isMessagePath = location.pathname === routes.messages;

    return (
        <div className='grid h-screen max-h-screen w-full px-2.5 py-6 lg:grid-cols-[300px,1fr]'>
            <section className={'lg:block'}>
                <Sidebar/>
            </section>

            {isMessagePath ? (
                <div className={`flex-col items-center justify-center gap-2 lg:flex`}>
                    <p className='mt-2 text-lg text-slate-500'>Select user to send message</p>
                </div>
            ) : (
                <section className={``}>
                    <Outlet/>
                </section>
            )}
        </div>
    )
};


export default Messages;
