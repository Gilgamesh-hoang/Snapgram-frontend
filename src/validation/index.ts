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