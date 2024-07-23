import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const httpRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8182/api/v1',
    timeout: 2000,
});

export const httpGet = async <T>(path: string, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.get<T>(path, option);
    return response.data;
}

export const httpPost = async <T>(path: string, data?: any, option: AxiosRequestConfig = {}): Promise<T> => {
    const response: AxiosResponse<T> = await httpRequest.post<T>(path,data, option);
    return response.data;
}
export default httpRequest;
