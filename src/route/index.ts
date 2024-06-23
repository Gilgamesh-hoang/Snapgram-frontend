import {FunctionComponent} from "react";
import SigninForm from "@/_auth/forms/SigninForm.tsx";
import SignupForm from "@/_auth/forms/SignupForm.tsx";
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

export interface RouteType {
    path: string;
    element: FunctionComponent;
    index?: boolean;
    child?: RouteType[];
}

export const routes = {
    home: "/",
    signin: "/sign-in",
    signup: "/sign-up",
    explore: "/explore",
    saved: "/saved",
    messages: "/messages",
    notifies: "/notifies",
    allUsers: "/all-users",
    createPost: "/create-post",
    updatePost: "/update-post/:id",
    posts: "/posts/:id",
    profile: "/profile/:id/*",
    updateProfile: "update-profile/:id"
};


export const publicRoutes: RouteType[] = [
    {path: routes.signin, element: SigninForm},
    {path: routes.signup, element: SignupForm},
]

export const privateRoutes: RouteType[] = [
    {path: routes.home, element: Home, index: true},
    {path: routes.explore, element: Explore},
    {path: routes.saved, element: Saved},
    {path: routes.allUsers, element: AllUsers},
    {
        path: routes.messages, element: Messages,
        child: [
            {path: ':type/:name', element: MessageBox},
        ]
    },
    {path: routes.notifies, element: Notifies},
    {path: routes.createPost, element: CreatePost},
    {path: routes.updatePost, element: EditPost},
    {path: routes.posts, element: PostDetails},
    {path: routes.profile, element: Profile},
    {path: routes.updateProfile, element: UpdateProfile},
]