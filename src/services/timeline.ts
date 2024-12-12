import {ApiResponse, Post} from "@/model/type.ts";
import {httpGet} from "@/utils/httpRequest.ts";

export const getTimeline = async ( pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<Post[]>>("/timeline", {params: {pageNum, pageSize}})
        .then(response => {
            return response.data;
        });
};