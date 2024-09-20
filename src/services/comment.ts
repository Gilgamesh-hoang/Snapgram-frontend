import {httpGet, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, Comment} from "@/model/type.ts";

export const getCommentsByPostId = async (postId: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<Comment[]>>(`/comments/posts`, {params: {postId, pageNum, pageSize}})
        .then(response => {
            return response.data;
        });
}
export const getRepliesByComment = async (commentId: string, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<Comment[]>>(`/comments/comment`, {params: {commentId, pageNum, pageSize}})
        .then(response => {
            return response.data;
        });
}
export const createComment = async (postId: string, content: string) => {
    return await httpPost<ApiResponse<Comment>>(`/comments`, {postId, content})
        .then(response => {
            return response.data;
        });
}
export const replyComment = async (postId: string, parentCommentId: string, content: string) => {
    return await httpPost<ApiResponse<Comment>>(`/comments/reply`, {postId, parentCommentId,content})
        .then(response => {
            return response.data;
        });
}