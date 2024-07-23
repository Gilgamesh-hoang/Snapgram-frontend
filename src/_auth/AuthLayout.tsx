import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";


export default function AuthLayout() {
    return (

        <>
            <Toaster position="top-right" reverseOrder={false} />
            <section className="flex flex-1 flex-col items-center justify-center py-10">
                <Outlet/>
            </section>

            <img
                src="/assets/images/side-img.svg"
                alt="logo"
                className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
            />
        </>
    );
}
