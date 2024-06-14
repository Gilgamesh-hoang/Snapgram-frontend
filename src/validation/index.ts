import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters."}),
    username: z.string().min(2, {message: "Name must be at least 2 characters."}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."}),
});

export const SigninValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
});


// ============================================================
// POST
// ============================================================