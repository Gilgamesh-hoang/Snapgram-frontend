import {ApiResponse, JwtResponse} from "@/model/response.ts";
import {httpPost} from "@/utils/httpRequest.ts";

const AUTH_TOKEN = 'auth_token';
const getRefreshToken = async (): Promise<ApiResponse<JwtResponse>> => {
    return httpPost<ApiResponse<JwtResponse>>("/auth/refresh-token", {}, {withCredentials: true});
}
const getAccessToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};
const removeAccessToken = () => {
    return localStorage.removeItem(AUTH_TOKEN);
};

const updateAccessToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
};

const TokenService = {
    AUTH_TOKEN,
    getAccessToken,
    updateAccessToken,
    removeAccessToken,
    getRefreshToken
};

export default TokenService;