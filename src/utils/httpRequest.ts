import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getAccessToken, getRefreshToken, removeAccessToken, updateAccessToken} from "@/services/token.ts";
import Swal from "sweetalert2";
import {routes} from "@/route";

const url = import.meta.env.VITE_REACT_APP_SERVER_URL || '';
const httpRequest: AxiosInstance = axios.create({
    baseURL: url,
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

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

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

                if (isRefreshing) {
                    // Nếu đang refresh, thêm request vào queue và chờ
                    return new Promise((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    })
                        .then((token) => {
                            originalConfig.headers.Authorization = `Bearer ${token}`;
                            return httpRequest(originalConfig);
                        })
                        .catch((err) => Promise.reject(err));
                }

                isRefreshing = true;
                await getRefreshToken()
                    .then((response) => {
                        const accessToken = response.data.token;
                        updateAccessToken(accessToken);
                        originalConfig.headers.Authorization = `Bearer ${accessToken}`;

                        // Xử lý các request trong queue
                        processQueue(null, accessToken);

                        return httpRequest(originalConfig);
                    })
                    .catch((_error) => {
                        processQueue(_error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Phiên làm việc hết hạn, vui lòng đăng nhập lại',
                        }).then((result) => {
                            window.location.href = routes.signin;
                        });
                        removeAccessToken();
                        return Promise.reject(_error);
                    }).finally(() => {
                        isRefreshing = false;
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
export const httpPut = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.put<T>(path, data, option);
    return response.data;
}
export const httpDelete = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.delete<T>(path, option);
    return response.data;
}