import {httpDelete, httpGet, httpPut} from "@/utils/httpRequest.ts";
import {ApiResponse, Notification} from "@/model/type.ts";

export const getNotifications = async (pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<Notification[]>>(`/notifications`, {params: {pageNum, pageSize}})
        .then(response => {
            return response.data;
        });
}

export const getIsReadNotification = async () => {
    return await httpGet<ApiResponse<boolean>>(`/notifications/is-read`)
        .then(response => {
            return response.data;
        })
}

export const markAsReadNotification = async () => {
    return await httpPut<ApiResponse<void>>(`/notifications`)
}

export const deleteNotification = async (id: string) => {
    return await httpDelete<ApiResponse<void>>(`/notifications/${id}`)
}