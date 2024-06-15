import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/LeftSidebar";



const RootLayout = () => {
  return (
    <div className="w-full md:flex">
        <LeftSidebar />

      <section className="flex h-full flex-1">
        <Outlet />
      </section>

    </div>
  );
};

export default RootLayout;
