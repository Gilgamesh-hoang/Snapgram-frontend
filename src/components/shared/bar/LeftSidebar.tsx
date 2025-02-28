import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";

import {sidebarLinks} from "@/constants";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {clsx} from "clsx";
import {routes} from "@/route";
import {logout} from "@/services/auth.ts";
import {INavLink} from "@/model/type.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {generateProfileLink} from "@/utils/common.ts";
import NotificationNav from "@/components/shared/bar/NotificationNav.tsx";
import Avatar from "@/components/shared/Avatar.tsx";
import MessageNav from "@/components/shared/bar/MessageNav.tsx";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {logoutContext, userContext, isLoadingContext} = useUserContext();

    // if (!userContext.nickname) {
    //     return <Loader/>;
    // }
    const handleSignOut = async () => {
        await logout()
            .finally(() => {
                logoutContext();
                navigate(routes.signin);
            });
    };

    const renderNavBar = () => {
       return sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route || pathname.includes(link.route);
            const isNotify = link.route === routes.notifies;
            const isMessage = link.route.includes(routes.messages)
            let item;
            if (isNotify) {
                item = <NotificationNav link={link} isActive={isActive}/>
            } else if (isMessage) {
                item = <MessageNav link={link} isActive={isActive}/>
            } else {
                item = (<NavLink
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
                </NavLink>)
            }
            return (
                <li
                    key={link.label}
                    className={clsx('leftsidebar-link group flex items-center justify-between', isActive && 'bg-primary-500')}
                >
                    {item}
                </li>
            );
        })
    }

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to={routes.home} className="flex items-center gap-3">
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36}
                    />
                </Link>

                <Link
                    to={generateProfileLink(userContext.nickname)}
                    className="flex items-center gap-3">
                    {/*<img*/}
                    {/*    src={userContext.avatarUrl}*/}
                    {/*    alt="profile"*/}
                    {/*    className="size-12 rounded-full"*/}
                    {/*/>*/}
                    <Avatar
                        imageUrl={userContext.avatarUrl}
                        style={"size-12"}
                        name={userContext.fullName}
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">{userContext.nickname}</p>
                        <p className="small-regular text-light-3">{userContext.fullName}</p>
                    </div>
                </Link>

                <ul className="flex flex-col gap-2">
                    {renderNavBar()}
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