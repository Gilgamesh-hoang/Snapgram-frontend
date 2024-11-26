import {httpGet, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, CloudinaryMedia, User} from "@/model/type.ts";
import axios from "axios";

export const searchUsers = async (keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users', {
        params: {
            keyword, pageNum, pageSize
        }
    });
};
export const searchUsersByImage = async (image: CloudinaryMedia) => {
    return await httpPost<ApiResponse<User[]>>('/faces/identify', image, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.data);
};
export const searchUserFollowers = async (userId: string, keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users/followers', {
        params: {
            userId, keyword, pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
};
export const searchUserFollowing = async (userId: string, keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users/following', {
        params: {
            userId, keyword, pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
};
