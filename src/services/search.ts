import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";

export const searchUsers = async (keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users', {
        params: {
            keyword, pageNum, pageSize
        }
    });
};
export const searchUserFollowers = async (nickname: string, keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users/followers', {
        params: {
            nickname, keyword, pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
};
export const searchUserFollowings = async (nickname: string, keyword: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>('/search/users/followings', {
        params: {
            nickname, keyword, pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
};
