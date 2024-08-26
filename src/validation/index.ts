import * as z from "zod";

// ============================================================
// USER
// ============================================================

export const SignupValidation = z.object({
    nickname: z.string().min(2, {message: "Biệt danh phải có ít nhất 2 ký tự"}),
    fullName: z.string().min(2, {message: "Họ tên phải có ít nhất 2 ký tự"}),
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
    confirmPassword: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
    gender: z.enum(["MALE", "FEMALE"], { message: "Vui lòng chọn giới tính." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});
export const ChangePasswordValidation = z.object({
    currentPassword: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
    newPassword: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
    confirmNewPassword: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
});

export const SigninValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
});
export const ForgotPasswordValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
});

export const ProfileValidation = z.object({
    file: z.custom<File>(),
    fullName: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
    nickname: z.string().min(2, {message: "Biệt danh phải có ít nhất 2 ký tự"}),
    email: z.string().email({message: 'Email không hợp lệ'}),
    bio: z.string().max(400,{ message: "Đã quá 400 ký tự" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "Vui lòng chọn giới tính." })
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
    caption: z.string().max(2200, { message: "Đã quá 2,200 ký tự" }),
    files: z.custom<File[]>(),
});
