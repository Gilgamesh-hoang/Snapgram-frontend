import {CloudinaryMedia, ConservationType, MessageType} from "@/model/type.ts";

export interface SignUpRequest {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
}

export interface ProfileRequest {
    nickname: string;
    email: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    bio: string;
    profilePicture: CloudinaryMedia;
}

export interface MessageRequest {
    senderId: string;
    conversationId?: string;
    recipientId?: string;
    content: string;
    contentType: MessageType;
    conversationType: ConservationType;
}