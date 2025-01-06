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
}

export interface UserInfo extends User {
    gender: 'MALE' | 'FEMALE';
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

export type FollowTab = 'FOLLOWER' | 'FOLLOWING';

export interface Creator {
    id: string;
    nickname: string;
    fullName: string;
    avatarUrl: string;
}

export interface CloudinarySignature {
    apiKey: string;
    timestamp: number;
    folder: string;
    signature: string;
    publicId: string;
}

export interface CloudinaryMedia {
    url: string;
    version: number;
    signature: string;
    publicId: string;
    resourceType: string;
}

export interface Comment {
    id: string;
    creator: Creator;
    content: string;
    parentCommentId: string | null;
    items: Comment[];
    level: number;
    createdAt: string;
    likeCount: number;
    isLiked: boolean;
    replyCount: number;
}

export interface PostMetric {
    likeCount: number;
    commentCount: number;
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

export interface Notification {
    id: string;
    entityId: string;
    actor: Creator;
    type:
        'LIKE_POST' |
        'COMMENT_POST' |
        'REPLY_COMMENT' |
        'LIKE_COMMENT' |
        'FOLLOW_USER';
    isRead: boolean;
    createdAt: string;
    content: string;
    options: Record<string, any>;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
}