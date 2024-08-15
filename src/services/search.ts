import {httpGet} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";

export const searchUsers = async (keyword: string, pageNum: number, pageSize = 10) => {
    return await httpGet<ApiResponse<User[]>>('/search/users', {
        params: {
            keyword, pageNum, pageSize
        }
    });
};
