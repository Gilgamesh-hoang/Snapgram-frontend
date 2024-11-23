import {ApiResponse, CloudinarySignature} from "@/model/type.ts";
import {httpPost} from "@/utils/httpRequest.ts";

export const getSignatures = async (sigNums: number) => {
    return httpPost<ApiResponse<CloudinarySignature[]>>(`/cloudinary/signature/${sigNums}`).then(res => res.data);
};