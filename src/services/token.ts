import {ApiResponse, JwtResponse} from "@/model/type.ts";
import {httpPost} from "@/utils/httpRequest.ts";

const AUTH_TOKEN = 'auth_token';
export const getRefreshToken = async (): Promise<ApiResponse<JwtResponse>> => {
    return await httpPost<ApiResponse<JwtResponse>>("/auth/refresh-token", {}, {withCredentials: true});
}
export const getAccessToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};
export const removeAccessToken = () => {
    return localStorage.removeItem(AUTH_TOKEN);
};

export const updateAccessToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
};