import {ApiResponse, CloudinaryMedia, User} from "@/model/type.ts";
import {httpPost} from "@/utils/httpRequest.ts";

export const searchUsersByImage = async (image: CloudinaryMedia) => {
    return await httpPost<ApiResponse<User[]>>('/faces/identify', image, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.data);
};

export const sendImagesToTrain = async (images: CloudinaryMedia[]) => {
    return await httpPost<ApiResponse>('faces/trainings', images);
}