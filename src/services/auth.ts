import {httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, JwtResponse} from "@/model/response.ts";
import {getAccessToken, removeAccessToken} from "@/services/token.ts";
import axios from "axios";

export const login = async (email: string, password: string) => {
    return await httpPost<ApiResponse<JwtResponse>>('/auth/login', {email, password});
};

export const logout = async () => {
    const token: string | null = getAccessToken();
    if (token) {
        await httpPost<ApiResponse>('/auth/logout', {token}, {withCredentials: true})
            .catch((error) => {
                console.log('Logout failed');
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const errorData = error.response?.data;
                    console.log('Status:', status);
                    console.log('Error:', errorData);
                }
            }).finally(() => {
                removeAccessToken();
            });
    }
};
