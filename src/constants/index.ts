import {routes} from "@/route";

export const PAGE_SIZE_COMMENT:number = 30;
export const PAGE_SIZE_POST_IN_PROFILE:number = 10;
export const PAGE_SIZE_POST_IN_SAVED:number = 10;
export const PAGE_SIZE_ALL_USER:number = 10;
export const PAGE_SIZE_FRIEND_SUGGESTION:number = 15;
export const PAGE_SIZE_USER_FOLLOW:number = 15;
export const PAGE_SIZE_HOME_FRIEND:number = 6;
export const PAGE_SIZE_TIMELINE:number = 15;
export const sidebarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: routes.home,
        label: "Trang chủ",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: routes.explore,
        label: "Khám phá",
    },
    {
        imgURL: "/assets/icons/people.svg",
        route: routes.allUsers,
        label: "Người dùng",
    },
    {
        imgURL: "/assets/icons/notify.svg",
        route: routes.notifies,
        label: "Thông báo",
    },
    {
        imgURL: "/assets/icons/chat.svg",
        route: routes.messages,
        label: "Tin nhắn",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: routes.saved,
        label: "Đã lưu",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: routes.createPost,
        label: "Bài viết",
    },
];

export const bottomBarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: routes.home,
        label: "Trang chủ",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: routes.explore,
        label: "Khám phá",
    },
    {
        imgURL: "/assets/icons/chat.svg",
        route: routes.messages,
        label: "Tin nhắn",
    },
    {
        imgURL: "/assets/icons/notify.svg",
        route: routes.notifies,
        label: "Thông báo",
    },
];
export const TopBarLinks = [
    {
        imgURL: "/assets/icons/people.svg",
        route: routes.allUsers,
        label: "Người dùng",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: routes.saved,
        label: "Đã lưu",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: routes.createPost,
        label: "Bài viết",
    },
];
