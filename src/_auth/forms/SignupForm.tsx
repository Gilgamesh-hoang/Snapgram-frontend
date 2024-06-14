import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import Loader from "@/components/shared/Loader.tsx";
import {SignupValidation} from "@/validation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const SignupForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            nickname: "",
            email: "",
            password: "",
        },
    });

    const handleSignup = async (user: z.infer<typeof SignupValidation>) => {

    }
    return (
        <Form {...form}>
            <div className="flex-center flex-col sm:w-420">
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
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Nickname</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className='error-message'/>
                            </FormItem>
                        )}
                    />

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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Nhập lại mật khẩu</FormLabel>
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
                            "Đăng ký"
                        )}
                    </Button>

                    <p className="mt-2 text-center text-sm font-normal text-light-2">
                        Đã có tài khoản?
                        <Link
                            to="/sign-in"
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
