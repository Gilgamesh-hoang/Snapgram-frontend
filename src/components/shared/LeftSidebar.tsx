import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";

import {INavLink} from "@/types";
import { sidebarLinks} from "@/constants";
import {Button} from "@/components/ui/button";
import React from "react";
import {clsx} from "clsx";
import {routes} from "@/route";
import {httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, JwtResponse} from "@/model/response.ts";
import axios from "axios";
import TokenService from "@/services/token";
const LeftSidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();


    const handleSignOut = async () => {
        const token : string|null = localStorage.getItem(TokenService.AUTH_TOKEN);
        if (token) {

            await httpPost<ApiResponse>('/auth/logout', {token}, {withCredentials: true})
                .catch((error) => {
                console.log('Logout failed');
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const errorData = error.response?.data;
                    console.log('Status:', status);
                    console.log('Error:', errorData);
                }
            }).finally(() => {
                localStorage.removeItem(TokenService.AUTH_TOKEN);
                navigate(routes.signin);
            });
        }

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

                <Link to={`/profile/1`} className="flex items-center gap-3">
                    <img
                        src='https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg'
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
                        const isNotify = link.route === routes.notifies;
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
                                {isNotify && (
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
                onClick={handleSignOut}>
                <img src="/assets/icons/logout.svg" alt="logout"/>
                <p className="small-medium lg:base-medium">Đăng xuất</p>
            </Button>
        </nav>
    );
};

export default LeftSidebar;