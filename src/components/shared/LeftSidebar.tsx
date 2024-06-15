import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import React from "react";
import {clsx} from "clsx";
import {routes} from "@/route";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();


    const handleSignOut = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        navigate(routes.signin);
    };

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36}
                    />
                </Link>

                {/*{isLoading || !user.email ? (*/}
                {/*    <div className="h-14">*/}
                {/*        <Loader />*/}
                {/*    </div>*/}
                {/*) : (*/}
                    <Link to={`/profile/1`} className="flex items-center gap-3">
                        <img
                            src='https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a'
                            alt="profile"
                            className="size-12 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="body-bold">gilgamesh</p>
                            <p className="small-regular text-light-3">Nguyen van a</p>
                        </div>
                    </Link>
                {/*)}*/}

                <ul className="flex flex-col gap-2">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        const isMessages = link.route === routes.messages;
                        return (
                            <li
                                key={link.label}
                                className={clsx('leftsidebar-link group flex items-center justify-between', isActive && 'bg-primary-500')}
                            >
                                <NavLink
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

                                {isMessages && (
                                    <span className="mr-2 size-2.5 rounded-full bg-red"></span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Button
                variant="ghost"
                className="shad-button_ghost flex justify-start gap-4"
                onClick={(e) => handleSignOut(e)}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="small-medium lg:base-medium">Đăng xuất</p>
            </Button>
        </nav>
    );
};

export default LeftSidebar;