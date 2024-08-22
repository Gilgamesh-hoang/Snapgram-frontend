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
    followerNumber?: number;
    followeeNumber?: number;
    postNumber?: number;
}

export interface MediaUrl {
    id: string;
    type: 'IMAGE' | 'VIDEO';
    url: string;
}

export interface Tag {
    name: string;
}

export interface Post {
    id: string;
    caption: string;
    media: MediaUrl[];
    tags: Tag[];
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    createdAt: Date;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
}