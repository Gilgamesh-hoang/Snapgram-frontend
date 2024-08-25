export interface SignUpRequest {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
}
export interface ProfileRequest {
    nickname: string;
    email: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    bio: string;
}