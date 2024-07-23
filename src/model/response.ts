interface ApiResponse<T = null> {
    status: number;
    message: string;
    data: T;
}