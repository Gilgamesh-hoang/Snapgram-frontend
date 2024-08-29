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
    gender: 'MALE' | 'FEMALE';
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

export interface Creator {
    id: string;
    nickname: string;
    fullName: string;
    avatarUrl: string;
}

export interface Comment {
    id: string;
    creator: Creator;
    content: string;
    parentComment: Comment;
    createdAt: string;
    likeCount: number;
}


export interface Post {
    creator: Creator;
    id: string;
    caption: string;
    media: MediaUrl[];
    tags: Tag[];
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
}