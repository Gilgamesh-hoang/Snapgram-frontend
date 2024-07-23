export interface SignUpRequest {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
}
