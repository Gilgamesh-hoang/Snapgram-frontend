import { Outlet } from "react-router-dom";
import {BottomBar, LeftSidebar, TopBar} from "@/components/shared";



const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <TopBar />
            <LeftSidebar />

            <section className="flex h-full flex-1">
                <Outlet />
            </section>

            <BottomBar />
        </div>
    );
};

export default RootLayout;
