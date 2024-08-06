import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import Loader from "@/components/shared/Loader.tsx";
import {ForgotPasswordValidation} from "@/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {routes} from "@/route";
import {forgotPassword} from "@/services/user.ts";


const ForgotPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
        resolver: zodResolver(ForgotPasswordValidation),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (form: z.infer<typeof ForgotPasswordValidation>) => {
        setIsLoading(true);
        forgotPassword(form.email).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Form {...form}>
            <div className="flex-center flex-col sm:w-420">
                <img src="/assets/images/logo.svg" alt="logo"/>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Quên mật khẩu
                </h2>
                <p className="small-medium md:base-regular mt-2 text-light-3">
                    Chào mừng trở lại! Vui lòng nhập thông tin của bạn.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
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

                    <Button type="submit" className="shad-button_primary">
                        {isLoading ? (
                            <div className="flex-center gap-2">
                                <Loader/> Loading...
                            </div>
                        ) : (
                            "Gửi yêu cầu"
                        )}
                    </Button>

                    <p className="mt-2 text-center">
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

export default ForgotPassword;
