import React, {useState} from "react";
import * as z from "zod";
import {ChangePasswordValidation} from "@/validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from "@/components/ui";
import {Loader} from "@/components/shared/index.tsx";
import {MdOutlineClose} from "react-icons/md";
import {changePassword} from "@/services/user.ts";
import Swal from "sweetalert2";

function ChangePasswordPopup({isOpen, onClose}) {
    const [isLoading, setIsLoading] = useState(false);
    // const toast = useRef<Toast>(null);
    const handleChangePass = async (form: z.infer<typeof ChangePasswordValidation>) => {
        if (isLoading || !isOpen) {
            return;
        }
        setIsLoading(true);
        changePassword(form).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Đổi mật khẩu thành công",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                onClose();
            }, 2000);
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Đổi mật khẩu thất bại',
                text: 'Mật khẩu hiện tại không đúng hoặc mật khẩu mới không khớp. Vui lòng thử lại.',
            });
        }).finally(() => {
            setIsLoading(false);
        });

    }

    const form = useForm<z.infer<typeof ChangePasswordValidation>>({
        resolver: zodResolver(ChangePasswordValidation),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });


    return (
        <>

            <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
                {/*<Toast ref={toast}*/}
                {/*       position='top-right'/>*/}
                <div className="relative max-w-lg rounded-lg bg-dark-3 p-8 shadow-lg backdrop-filter-none">
                    <button className='absolute right-2.5 top-2.5'
                            onClick={onClose}
                    >
                        <MdOutlineClose size={25}/>
                    </button>
                    <h2 className="mb-4 text-xl font-bold">Đổi mật khẩu</h2>
                    <Form {...form}>
                        <p className="small-medium md:base-regular mt-2 text-light-3">
                            Mật khẩu của bạn phải có tối thiểu 8 ký tự, nên bao gồm cả chữ số, chữ cái và ký tự đặc biệt
                            (!$@%).
                        </p>

                        <form
                            onSubmit={form.handleSubmit(handleChangePass)}
                            className="mt-4 flex w-full flex-col gap-5">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="shad-form_label">Mật khẩu hiện tại</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="shad-input" {...field}
                                                   onChange={(e) => {
                                                       form.setValue('currentPassword', e.target.value.normalize('NFD')
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
                                name="newPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="shad-form_label">Mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="shad-input" {...field}
                                                   onChange={(e) => {
                                                       form.setValue('newPassword', e.target.value.normalize('NFD')
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
                                name="confirmNewPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="shad-form_label">Nhập lại mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="shad-input" {...field}
                                                   onChange={(e) => {
                                                       form.setValue('confirmNewPassword', e.target.value.normalize('NFD')
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
                                    "Đổi mật khẩu"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default ChangePasswordPopup;