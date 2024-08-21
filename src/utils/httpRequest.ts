import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Swal from "sweetalert2";
import {routes} from "@/route";
import {getAccessToken, getRefreshToken, removeAccessToken, updateAccessToken} from "@/services/token.ts";

const httpRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8182/api/v1',
    withCredentials: true,
});
httpRequest.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = getAccessToken();

        // If token exists, set the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

httpRequest.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;


        if (originalConfig.url !== "/auth/login" && err.response) {
            // If the error status is 401 and there is no originalRequest._retry flag,
            // it means the token has expired and we need to refresh it
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                await getRefreshToken()
                    .then((response) => {
                        const accessToken = response.data.token;
                        updateAccessToken(accessToken);
                        return httpRequest(originalConfig);
                    })
                    .catch((_error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Phiên làm việc hết hạn, vui lòng đăng nhập lại',
                        }).then((result) => {
                            removeAccessToken();
                            window.location.href = routes.signin;
                        });
                        // return Promise.reject(_error);
                    });
            }
        }
        return Promise.reject(err);
    }
);

export const httpGet = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.get<T>(path, option);
    return response.data;
}

export const httpPost = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.post<T>(path, data, option);
    return response.data;
}
