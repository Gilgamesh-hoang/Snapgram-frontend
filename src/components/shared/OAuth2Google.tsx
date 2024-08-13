import {FcGoogle} from "react-icons/fc";
import {Button} from "@/components/ui";
import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import Swal from "sweetalert2";
import {loginGoogle} from "@/services/auth.ts";
import {updateAccessToken} from "@/services/token.ts";
import {routes} from "@/route";
import {useNavigate} from "react-router-dom";

const OAuth2Google = () => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            loginGoogle(tokenResponse.access_token)
                .then(response => {
                    if (response.status === 200) {
                        updateAccessToken(response.data.token);
                        navigate(routes.home);
                    }
                })
                .catch(() => {
                    showAlert('error', 'Đăng nhập thất bại');
                });
        },
        onError: error => {
            showAlert('error', 'Đăng nhập thất bại');
            console.log(error)
        },

    });

    function showAlert(type: 'success' | 'error', message: string, timeout = 1500) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: timeout
        });
    }

    return (

        <Button type="button"
                className="bg-white text-dark-2 hover:text-white hover:opacity-80"
                onClick={() => login()}

        >
            <>
                <FcGoogle className='mr-2.5' size={20}/>
                <span className=''>Đăng nhập với Google</span>
            </>
        </Button>

    );

}
export default OAuth2Google;