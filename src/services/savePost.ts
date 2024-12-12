import {httpDelete, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse} from "@/model/type.ts";

export const savedPost = async (postId: string, isSaved: boolean) => {
    if (isSaved)
        return await httpPost<ApiResponse>(`/posts/${postId}/save`);
    else
        return await httpDelete<ApiResponse>(`/posts/${postId}/unsaved`);
}

export const checkSaved = async (postIds: string[]) => {
    return await httpPost<ApiResponse<string[]>>(`/posts/check-saves`, postIds)
        .then(response => {
            return response.data;
        });
}