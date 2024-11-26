import React, {useEffect, useState} from "react";
import Loader from "@/components/shared/Loader.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {SignupValidation} from "@/validation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {routes} from "@/route";
import GenderSelection from "@/components/shared/GenderSelection.tsx";
import useDebounce from "@/hooks/useDebounce.ts";
import Swal from 'sweetalert2'
import {SignUpRequest} from "@/model/request.ts";
import {isEmailExist, isNicknameExist, signup} from "@/services/user.ts";
import {showAlert} from "@/utils/common.ts";


const SignupForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [nickname, setNickname] = useState('');
    const nicknameDebounce = useDebounce(nickname, 500);
    const [nicknameExists, setNicknameExists] = useState(false);

    const [email, setEmail] = useState('');
    const emailDebounce = useDebounce(email, 500);
    const [emailExists, setEmailExists] = useState(false);

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            nickname: "",
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "MALE",
        },
    });


    useEffect(() => {
        if (nicknameDebounce && nicknameDebounce.trim().length >= 2){
            isNicknameExist(nicknameDebounce).then((response) => {
                setNicknameExists(response);
            });
        }


    }, [nicknameDebounce]);
    useEffect(() => {
        if (emailDebounce && emailDebounce.trim().length > 0){
            isEmailExist(emailDebounce).then((response) => {
                setEmailExists(response);
            });
        }
    }, [emailDebounce]);

    /**
     * This is an asynchronous function that handles the user signup process.
     */
    const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
        if (nicknameExists || emailExists) {
            return;
        }
        setIsLoading(true);
        // Send a POST request to the '/users/sign-up' endpoint with the user data.
        const request: SignUpRequest = {
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            fullName: user.fullName,
            gender: user.gender
        }
        await signup(request).catch(() => {
            showAlert('error', 'Đăng ký tài khoản thất bại');
        }).finally(() => {
            setIsLoading(false);
        });

    }


    return (
        <Form {...form}>
            <div className="flex-center flex-col sm:w-[440px]">
                <img src="/assets/images/logo.svg" alt="logo"/>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Tạo tài khoản
                </h2>
                <p className="small-medium md:base-regular mt-2 text-light-3">
                    Đăng ký để xem ảnh và video từ bạn bè
                </p>

                <form
                    onSubmit={form.handleSubmit(handleSignup)}
                    className="mt-4 flex w-full flex-col gap-5">
                    <div className='flex'>
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({field}) => (
                                <FormItem className='mr-2'>
                                    <FormLabel className="shad-form_label">Biệt danh</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field}
                                               onChange={(e) => {
                                                   setNickname(e.target.value.normalize('NFD')
                                                       .replace(/[\u0300-\u036f]/g, ''))
                                                   form.setValue('nickname', e.target.value, {shouldValidate: true});
                                               }}
                                               onKeyDown={(e) => {
                                                   if (!/^[a-zA-Z0-9_]/i.test(e.key)) {
                                                       e.preventDefault();
                                                   }
                                               }}
                                               value={nickname}
                                        />
                                    </FormControl>
                                    <FormMessage className='error-message'>
                                        {nicknameExists ? 'Biệt danh đã tồn tại' : ''}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({field}) => (
                                <FormItem className='ml-2'>
                                    <FormLabel className="shad-form_label">Họ tên</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage className='error-message'/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className='mr-2 flex-1'>
                                    <FormLabel className="shad-form_label">Email</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field}
                                               onChange={(e) => {
                                                   setEmail(e.target.value)
                                                   form.setValue('email', e.target.value, {shouldValidate: true});
                                               }}
                                               value={email}
                                        />
                                    </FormControl>
                                    <FormMessage className='error-message'>
                                        {emailExists ? 'Email đã tồn tại' : ''}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({field}) => (
                                <FormItem className='ml-2 flex-1'>
                                    <FormLabel className="shad-form_label">Giới tính</FormLabel>
                                    <FormControl>
                                        {/*<GenderSelection setValue={form.setValue}/>*/}
                                        <GenderSelection<z.infer<typeof SignupValidation>> setValue={form.setValue} />
                                    </FormControl>
                                    <FormMessage className='error-message'/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field}
                                           onChange={(e) => {
                                               form.setValue('password', e.target.value.normalize('NFD')
                                                   .replace(/[\u0300-\u036f]/g, ''), {shouldValidate: true});
                                           }}
                                           onKeyDown={(e) => {
                                               if (!/^[a-zA-Z0-9!@#$%^&*_]/i.test(e.key)) {
                                                   e.preventDefault();
                                               }
                                           }}
                                    />
                                </FormControl>
                                <FormMessage className='error-message'/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field}
                                           onChange={(e) => {
                                               form.setValue('confirmPassword', e.target.value.normalize('NFD')
                                                   .replace(/[\u0300-\u036f]/g, ''), {shouldValidate: true});
                                           }}
                                           onKeyDown={(e) => {
                                               if (!/^[a-zA-Z0-9!@#$%^&*_]/i.test(e.key)) {
                                                   e.preventDefault();
                                               }
                                           }}
                                    />
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
                            "Đăng ký"
                        )}
                    </Button>

                    <p className="mt-2 text-center text-sm font-normal text-light-2">
                        Đã có tài khoản?
                        <Link
                            to={routes.signin}
                            className="ml-1 text-sm font-semibold text-primary-500">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SignupForm;
