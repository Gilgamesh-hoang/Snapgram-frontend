import {Outlet} from "react-router-dom";
import React from "react";
import {Sidebar} from "@/components/message/sidebar";

const Messages = () => {
    const basePath = location.pathname === '/';


    return (
        <div className='grid w-full h-screen max-h-screen px-2.5 py-6 lg:grid-cols-[300px,1fr]'>
            <section className={!basePath ? 'lg:block' : 'hidden'}>
                <Sidebar/>
            </section>

            {/**message component**/}
            <section className={`${basePath && "hidden"}`}>
                <Outlet/>
            </section>


            <div className={`flex-col items-center justify-center gap-2 ${!basePath ? "hidden" : "lg:flex"}`}>
                <p className='mt-2 text-lg text-slate-500'>Select user to send message</p>
            </div>
        </div>
    )
};

export default Messages;
