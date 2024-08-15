import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {TopBarLinks} from "@/constants";
import {clsx} from "clsx";
import React, {useEffect, useState} from "react";
import {BiLogOut} from "react-icons/bi";
import {IoMdClose} from "react-icons/io";
import {logout} from "@/services/auth.ts";
import {routes} from "@/route";
import {INavLink} from "@/model/type.ts";
import {useUserContext} from "@/context/AuthContext.tsx";

const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {logoutContext} = useUserContext();

    useEffect(() => {
        if (showMenu) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Delay matches the transition duration
        }
    }, [showMenu]);


    const handleSignOut = async () => {
        await logout()
            .finally(() => {
                logoutContext();
                navigate(routes.signin);
            });
    };

    return (
        <section className="topbar">
            <div className="flex-between px-5 py-4">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-3">
                    <Link to={`/profile/1`} className="flex-center gap-3">
                        <img
                            src={"/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="size-8 rounded-full"
                        />
                    </Link>
                    {showMenu ? (
                        <button className="p-1" onClick={() => setShowMenu(false)}>
                            <IoMdClose className="size-8"/>
                        </button>
                    ) : (
                        <button className="" onClick={() => setShowMenu(true)}>
                            <img src="/assets/icons/nav-menu.svg" alt="Menu"/>
                        </button>
                    )}
                </div>
            </div>
            {isVisible && (
                <div
                    className={clsx(
                        "absolute top-[71px] w-full rounded-e-xl rounded-s-xl bg-gradient-to-b from-[#101012] to-[#6B6B78] px-6 py-3 transition-all duration-300",
                        showMenu ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                    )}
                >
                    <ul className="flex flex-col gap-2">
                        {TopBarLinks.map((link: INavLink) => {
                            const isActive = pathname === link.route;
                            return (
                                <li onClick={() => setShowMenu(false)}
                                    key={link.label}
                                    className={clsx(
                                        "leftsidebar-link group flex items-center justify-between",
                                        isActive && "bg-primary-500"
                                    )}
                                >
                                    <NavLink
                                        to={link.route}
                                        className="flex w-full items-center gap-4 p-3"
                                    >
                                        <img
                                            src={link.imgURL}
                                            alt={link.label}
                                            className={`group-hover:invert-white ${
                                                isActive && "invert-white"
                                            }`}
                                        />
                                        {link.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        onClick={handleSignOut}
                        className="mb-6 mt-4 flex w-full items-center justify-center gap-3 rounded-lg bg-red p-3 text-light-2">
                        <BiLogOut className="size-6"/>
                        <p className="small-medium lg:base-medium">Đăng xuất</p>
                    </button>
                </div>
            )}
        </section>
    );
};

export default TopBar;