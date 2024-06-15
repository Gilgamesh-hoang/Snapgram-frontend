import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/LeftSidebar";
import BottomBar from "@/components/shared/BottomBar.tsx";
import TopBar from "@/components/shared/TopBar.tsx";



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
