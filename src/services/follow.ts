import {httpDelete, httpGet, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, Comment, User} from "@/model/type.ts";

export const getFollowers = async (userId: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>(`/users/${userId}/followers`, {
        params: {
            pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
}
export const getFollowings = async (userId: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<User[]>>(`/users/${userId}/following`, {
        params: {
            pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
}
export const followUser = async (userId: string) => {
    return await httpPost<ApiResponse>(`/users/${userId}/follow`);
}
export const unfollowUser = async (userId: string) => {
    return await httpDelete<ApiResponse>(`/users/${userId}/unfollow`);
}
export const removeFollower = async (followerId: string) => {
    return await httpDelete<ApiResponse>(`/users/${followerId}/remove-follower`);
}
export const filterFollow = async (userIds: string[]) => {
    return await httpPost<ApiResponse<string[]>>(`/users/filter-following` , userIds)
        .then(response => {
            return response.data;
        });
}
