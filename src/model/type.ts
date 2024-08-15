export interface ApiResponse<T = null> {
    status: number;
    message: string;
    data: T;
}

export interface JwtResponse {
    token: string;
}

export interface User {
    email: string;
    id: string;
    nickname: string;
    fullName: string;
    avatarUrl: string;
    bio?: string;
}

export interface MediaUrl {
    isImage?: boolean;
    isVideo?: boolean;
    src?: string;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
};