import {httpDelete, httpGet, httpPost, httpPut} from "@/utils/httpRequest.ts";
import {ApiResponse, CloudinaryMedia, Post, PostMetric} from "@/model/type.ts";


// export const createPost = async (caption: string, media: File[], tags: string[]) => {
//     const requestBody = {caption, tags}
//     const formData = new FormData();
//     formData.append("post", JSON.stringify(requestBody));
//     media.forEach((item) => {
//         formData.append("media", item);
//     });
//     return await httpPost<ApiResponse>("/posts", formData,
//         {headers: {"Content-Type": "multipart/form-data"}});
// }
export const createPost = async (caption: string, media: CloudinaryMedia[], tags: string[]) => {
    return await httpPost<ApiResponse>("/posts", {caption, media, tags});
}

export const updatePost = async (postId: string, caption: string, media: CloudinaryMedia[], tags: string[], removeMedia: string[]) => {
    return await httpPut<ApiResponse<Post>>("/posts", {id: postId, caption, media, tags, removeMedia})
        .then(response => {
            return response.data;
        });
}
// export const updatePost = async (postId: string, caption: string, media: File[], tags: string[], removeMedia: string[]) => {
//     const requestBody = {id: postId, caption, tags, removeMedia}
//     const formData = new FormData();
//     formData.append("post", JSON.stringify(requestBody));
//     media.forEach((item) => {
//         formData.append("media", item);
//     });
//     return await httpPut<ApiResponse<Post>>("/posts", formData,
//         {headers: {"Content-Type": "multipart/form-data"}})
//         .then(response => {
//             return response.data;
//         });
// }

export const getPostsById = async (id: string) => {
    return await httpGet<ApiResponse<Post>>(`/posts/${id}`)
        .then(response => {
            return response.data;
        });

}

export const savedPost = async (postId: string, isSaved: boolean) => {
    if (isSaved)
        return await httpPost<ApiResponse>(`/posts/${postId}/save`);
    else
        return await httpDelete<ApiResponse>(`/posts/${postId}/unsaved`);
}
export const likedPost = async (postId: string, isLiked: boolean) => {
    if (isLiked)
        return await httpPost<ApiResponse<PostMetric>>(`/posts/${postId}/like`)
            .then(response => {
                return response.data;
            });
    else
        return await httpDelete<ApiResponse<PostMetric>>(`/posts/${postId}/unlike`)
            .then(response => {
                return response.data;
            });
}

export const getPostsByUser = async (nickname: string, pageNum: number, pageSize: number) => {
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