import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import Loader from "@/components/shared/Loader.tsx";
import {SigninValidation} from "@/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {routes} from "@/route";
import Swal from "sweetalert2";
import {login} from "@/services/auth.ts";
import {verifyEmail} from "@/services/user.ts";
import {getAccessToken, updateAccessToken} from "@/services/token.ts";
import axios from "axios";
import {GoogleOAuthProvider} from "@react-oauth/google";
import OAuth2Google from "@/components/shared/OAuth2Google.tsx";
import {useUserContext} from "@/context/AuthContext.tsx";
import {showAlert} from "@/utils/common.ts";

const SigninForm: React.FC = () => {
    const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || '';
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {setIsAuthenticated} = useUserContext();

    // Verify email when a user clicks on an email link
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const action = queryParams.get('action');
        const code = queryParams.get('code');
        const email = queryParams.get('email');

        if (action === 'verify-email' && code && email) {
            verifyEmail(email, code);
        }
    }, []);


    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
        if (isLoading) return;
        setIsLoading(true);
        await login(user.email, user.password)
            .then(response => {
                if (response.status === 200) {
                    updateAccessToken(response.data.token);
                    setIsAuthenticated(true);
                    // navigate(routes.home);
                    window.location.href = routes.home;
                }
            }).catch((error) => {
                // If the error is an Axios error, handle different status codes
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 400) {
                        showAlert('error', 'Email hoặc mật khẩu không hợp lệ.');
                    } else if (error.response?.status === 401) {
                        showAlert('error', 'Mật khẩu không chính xác. Vui lòng thử lại.');
                    } else if (error.response?.status === 404) {
                        showAlert('error', 'Không tìm thấy người dùng. Vui lòng kiểm tra lại.');
                    }
                }
            }).finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <Form {...form}>
            <div className="flex-center flex-col sm:w-420">
                <img src="/assets/images/logo.svg" alt="logo"/>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Đăng nhập
                </h2>
                <p className="small-medium md:base-regular mt-2 text-light-3">
                    Chào mừng trở lại! Vui lòng nhập thông tin của bạn.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSignin)}
                    className="mt-4 flex w-full flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className='error-message'/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className='error-message'/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary">
                        {isLoading ? (
                            <div className="flex-center gap-2">
                                <Loader/> Loading...
                            </div>
                        ) : (
                            "Đăng nhập"
                        )}
                    </Button>
                    <GoogleOAuthProvider
                        clientId={clientId}>
                        <OAuth2Google/>
                    </GoogleOAuthProvider>


                    <p className="mt-2 text-center text-sm font-normal text-light-2">
                        Chưa có tài khoản?
                        <Link
                            to={routes.signup}
                            className="ml-1 text-sm font-semibold text-primary-500">
                            Đăng ký ngay
                        </Link>
                    </p>

                    <p className="text-center">
                        <Link
                            to={routes.forgotPassword}
                            className="text-sm font-semibold text-primary-500">
                            Quên mật khẩu?
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SigninForm;
