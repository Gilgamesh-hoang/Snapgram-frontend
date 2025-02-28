import {FunctionComponent} from "react";
import {
    AllUsers,
    CreatePost,
    EditPost,
    Explore,
    Home,
    Messages,
    Notifies,
    PostDetails,
    Profile,
    Saved,
    UpdateProfile
} from "@/_root/pages";
import MessageBox from "@/components/message/messageBox/MessageBox.tsx";
import {ForgotPassword, Signin, Signup,} from "@/_auth/forms";

export interface RouteType {
    path: string;
    element: FunctionComponent;
    index?: boolean;
    child?: RouteType[];
}

export const routes = {
    home: "/home",
    signin: "/sign-in",
    signup: "/sign-up",
    forgotPassword: "/forgot-password",
    explore: "/explore",
    saved: "/posts/saved",
    messages: "/messages",
    notifies: "/notifies",
    allUsers: "/all-users",
    createPost: "/create-post",
    updatePost: "/posts/update-post/:id",
    posts: "/posts/:id",
    profile: "/users/profile/:nickname/*",
    updateProfile: "/users/update-profile"
};


export const publicRoutes: RouteType[] = [
    {path: routes.signin, element: Signin,},
    {path: routes.signup, element: Signup,},
    {path: routes.forgotPassword, element: ForgotPassword,},
]

export const privateRoutes: RouteType[] = [
    {path: routes.home, element: Home, index: true,},
    {path: routes.explore, element: Explore,},
    {path: routes.saved, element: Saved,},
    {path: routes.allUsers, element: AllUsers,},
    {
        path: routes.messages, element: Messages,
        child: [
            {path: ':type/:conservationId', element: MessageBox,},
        ]
    },
    {path: routes.notifies, element: Notifies,},
    {path: routes.createPost, element: CreatePost,},
    {path: routes.updatePost, element: EditPost,},
    {path: routes.posts, element: PostDetails,},
    {path: routes.profile, element: Profile,},
    {path: routes.updateProfile, element: UpdateProfile,},
]