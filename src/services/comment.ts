import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, Comment} from "@/model/type.ts";

export const getCommentsByPostId = async (postId: string, pageNum: number, pageSize = 30) => {
    return await httpGet<ApiResponse<Comment[]>>(`/comments/posts`, {params: {postId, pageNum, pageSize}})
        .then(response => {
            return response.data;
        });
}