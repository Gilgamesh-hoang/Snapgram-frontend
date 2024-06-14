import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import Loader from "@/components/shared/Loader.tsx";
import {SigninValidation} from "@/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

const SigninForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignin = async (user: z.infer<typeof SigninValidation>) => {

    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo"/>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Đăng nhập
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Chào mừng trở lại! Vui lòng nhập thông tin của bạn.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSignin)}
                    className="flex flex-col gap-5 w-full mt-4">
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
                        // render={({field, fieldState: { error }}) => (
                        //     <FormItem>
                        //         <FormLabel className="shad-form_label">Email</FormLabel>
                        //         <FormControl>
                        //             <Input type="text" className="shad-input" {...field} />
                        //         </FormControl>
                        //         {/*<FormMessage className={error ? 'error-message' : ''}>*/}
                        //         {/*    {error?.message}*/}
                        //         {/*</FormMessage>*/}
                        //         <FormMessage className='error-message'/>
                        //     </FormItem>
                        // )}
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

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Chưa có tài khoản?
                        <Link
                            to="/sign-up"
                            className="text-primary-500 text-small-semibold ml-1">
                            Đăng ký ngay
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SigninForm;
