import {httpDelete, httpGet, httpPost, httpPut} from "@/utils/httpRequest.ts";
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
export const replyComment = async (parentCommentId: string, content: string) => {
    return await httpPost<ApiResponse<Comment>>(`/comments/reply`, {parentCommentId,content})
        .then(response => {
            return response.data;
        });
}
export const editComment = async (commentId: string, content: string) => {
    return await httpPut<ApiResponse<Comment>>(`/comments/${commentId}`, {content})
        .then(response => {
            return response.data;
        });
}
export const deleteComment = async (commentId: string) => {
    return await httpDelete<ApiResponse<number>>(`/comments/${commentId}`)
        .then(response => {
            return response.data;
        });
}