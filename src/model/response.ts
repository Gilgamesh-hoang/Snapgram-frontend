export interface ApiResponse<T = null> {
    status: number;
    message: string;
    data: T;
}
export interface JwtResponse {
    token: string;
    refreshToken: string;
}