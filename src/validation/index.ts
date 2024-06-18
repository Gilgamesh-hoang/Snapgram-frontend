import * as z from "zod";

// ============================================================
// USER
// ============================================================

export const SignupValidation = z.object({
    nickname: z.string().min(2, {message: "Nickname phải có ít nhất 2 ký tự"}),
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
    confirmPassword: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export const SigninValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
});


// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Nhập ít nhất 5 ký tự." }).max(2200, { message: "Đã quá 2,200 ký tự" }),
    file: z.custom<File[]>(),
});
