import {routes} from "@/route";

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
    // {
    //     imgURL: "/assets/icons/bookmark.svg",
    //     route: routes.saved,
    //     label: "Đã lưu",
    // },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: routes.createPost,
        label: "Bài viết",
    },
];
