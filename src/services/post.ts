import {httpGet, httpPost, httpPut} from "@/utils/httpRequest.ts";
import {ApiResponse, Post} from "@/model/type.ts";


export const createPost = async (caption: string, media: File[], tags: string[]) => {
    const requestBody = {caption, tags}
    const formData = new FormData();
    formData.append("post", JSON.stringify(requestBody));
    media.forEach((item) => {
        formData.append("media", item);
    });
    return await httpPost<ApiResponse>("/posts", formData,
        {headers: {"Content-Type": "multipart/form-data"}});
}

export const updatePost = async (postId: string, caption: string, media: File[], tags: string[], removeMedia: string[]) => {
    const requestBody = {id: postId, caption, tags, removeMedia}
    const formData = new FormData();
    formData.append("post", JSON.stringify(requestBody));
    media.forEach((item) => {
        formData.append("media", item);
    });
    return await httpPut<ApiResponse<Post>>("/posts", formData,
        {headers: {"Content-Type": "multipart/form-data"}})
        .then(response => {
            return response.data;
        });
}

export const getPostsById = async (id: string) => {
    return await httpGet<ApiResponse<Post>>(`/posts/${id}`)
        .then(response => {
            return response.data;
        });

}

export const savedPost = async (postId: string, isSaved: boolean) => {
    return await httpPut<ApiResponse>(`/posts/saved`, {postId, isSaved});
}

export const getPostsByUser = async (nickname: string, pageNum: number, pageSize:number) => {
    return await httpGet<ApiResponse<Post[]>>("/posts/user", {params: {nickname, pageNum, pageSize}})
        .then(response => {
            return response.data;
        });

}
export const getSavedPostsByUser = async (pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<Post[]>>("/posts/saved", {params: {pageNum, pageSize}})
        .then(response => {
            return response.data;
        });

}