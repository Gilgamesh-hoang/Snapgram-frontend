import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";

export const searchUsers = async (keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users', {
        params: {
            keyword, pageNum, pageSize
        }
    });
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
