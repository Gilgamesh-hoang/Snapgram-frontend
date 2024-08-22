import {httpGet, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, Post} from "@/model/type.ts";


export const createPost = async (caption: string, media: File[], tags: string[]) => {
    // send request to server with caption and images, multipart/form-data
    const formData = new FormData();
    formData.append("caption", caption);
    media.forEach((item) => {
        formData.append("media", item);
    });
    tags.forEach((tag) => {
        formData.append("tags", tag);
    });
    return await httpPost<ApiResponse>("/posts", formData,
        {headers: {"Content-Type": "multipart/form-data"}});
}

export const getPostsByUser = async (nickname: string,pageNum: number, pageSize = 10) => {
    return await httpGet<ApiResponse<Post[]>>("/posts/user", {params:{nickname, pageNum, pageSize}})
        .then(response => {
            return response.data;
        });

}