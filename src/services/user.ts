import {httpGet, httpPost} from "@/utils/httpRequest.ts";
import {ApiResponse, User} from "@/model/type.ts";
import Swal from "sweetalert2";
import {routes} from "@/route";
import {SignUpRequest} from "@/model/request.ts";

export const verifyEmail = async (email: string, code: string) => {
    await httpPost<ApiResponse<boolean>>('/auth/verification-email', {
        email, code
    }).then((response) => {
        if (response.data) {
            Swal.fire({
                icon: 'success',
                title: 'Xác thực tài khoản thành công',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = routes.signin;
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Hết hạn xác thực',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = routes.signin;
                }
            });
        }

    }).catch(() => {
        Swal.fire({
            icon: 'error',
            title: 'Xác thực tài khoản thất bại',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = routes.signin;
            }
        });
    });
}

export const isEmailExist = async (email: string): Promise<boolean> => {
    return await httpGet<ApiResponse<boolean>>('/users/email-exists', {
        params: {email}
    }).then(response => {
        return response.data;
    });
}

export const isNicknameExist = async (nickname: string): Promise<boolean> => {
    return await httpGet<ApiResponse<boolean>>('/users/nickname-exists', {
        params: {nickname}
    }).then(response => {
        return response.data;
    });
}

export const signup = async (user: SignUpRequest) => {

    return await httpPost<ApiResponse>('/users/signup', user)
        .then(response => {
            // If the response status is 201 (Created), show a success alert and navigate to the signin page.
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký tài khoản thành công',
                    text: 'Vui lòng kiểm tra email của bạn để xác thực tài khoản Snapgram',
                }).then((result) => {
                    window.location.href = routes.signin;
                });
            }
        });

}
export const getCurrentUser = async () => {
    return await httpGet<ApiResponse<User>>('/users/me')
        .then(response => {
            return response.data;
        });

}
export const forgotPassword = async (email: string) => {
    return await httpPost<ApiResponse>("/users/forgot-password", {email})
        .then((response) => {
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Gửi yêu cầu thành công!',
                    text: 'Vui lòng kiểm tra email của bạn để nhận mật khẩu mới.',
                }).then((result) => {
                    window.location.href = routes.signin;
                });
            }
        }).catch(() => {
            Swal.fire({
                icon: 'warning',
                title: 'Gửi yêu cầu thất bại',
                text: 'Email không tồn tại hoặc đã bị khóa. Vui lòng thử lại.',
            });
        });
}