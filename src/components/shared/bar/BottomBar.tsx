import {Link, useLocation} from "react-router-dom";

import {bottomBarLinks} from "@/constants";
import {clsx} from "clsx";
import {routes} from "@/route";

const BottomBar = () => {
    const {pathname} = useLocation();

    return (
        <section className="bottom-bar">
            {bottomBarLinks.map((link) => {
                const isActive = pathname === link.route;
                const isMessages = link.route === routes.messages;
                const isNotify = link.route === routes.notifies;
                return (
                    <Link
                        key={`bottombar-${link.label}`}
                        to={link.route}
                        className={clsx("flex-center relative flex-col gap-1 rounded-lg p-2 transition", (isActive && "bg-primary-500"))}
                    >
                        <img
                            src={link.imgURL}
                            alt={link.label}
                            width={16}
                            height={16}
                            className={`${isActive && "invert-white"}`}
                        />

                        <p className="tiny-medium text-light-2">{link.label}</p>

                        {isMessages && (
                            <span className="absolute right-2.5 top-1.5 size-2 rounded-full bg-red"></span>
                        )}
                        {isNotify && (
                            <span className="absolute right-2.5 top-1.5 size-2 rounded-full bg-red"></span>
                        )}
                    </Link>
                );
            })}
        </section>
    );
};

export default BottomBar;