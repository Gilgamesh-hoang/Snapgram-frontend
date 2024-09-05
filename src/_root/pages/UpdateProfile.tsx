import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button, Input, Textarea} from "@/components/ui";
import {Loader, ProfileUploader} from "@/components/shared";

import {ProfileValidation} from "@/validation";
import React, {useEffect, useState} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";
import GenderSelection from "@/components/shared/GenderSelection.tsx";
import {editUserInfo, getUserInfo, isEmailExist, isNicknameExist} from "@/services/user.ts";
import useDebounce from "@/hooks/useDebounce.ts";
import {routes} from "@/route";
import Swal from "sweetalert2";
import ChangePasswordPopup from "@/components/shared/ChangePasswordPopup.tsx";

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const {userContext, isLoadingContext} = useUserContext();
    const [nickname, setNickname] = useState('');
    const nicknameDebounce = useDebounce(nickname, 500);
    const [nicknameExists, setNicknameExists] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const emailDebounce = useDebounce(email, 500);
    const [emailExists, setEmailExists] = useState(false);
    const [isLoadingState, setIsLoadingState] = useState(false);


    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            file: undefined,
            fullName: userContext.fullName,
            nickname: userContext.nickname,
            email: userContext.email,
            bio: userContext.bio || "",
            gender: "MALE",
        },
    });


    useEffect(() => {
        if (nicknameDebounce === userContext.nickname) {
            setNicknameExists(false);
            return;
        }
        if (nicknameDebounce && nicknameDebounce.trim().length >= 2) {
            isNicknameExist(nicknameDebounce).then((response) => {
                setNicknameExists(response);
            });
        }
    }, [nicknameDebounce]);

    useEffect(() => {
        if (emailDebounce === userContext.email) {
            setEmailExists(false);
            return;
        }
        if (emailDebounce && emailDebounce.trim().length > 0) {
            isEmailExist(emailDebounce).then((response) => {
                setEmailExists(response);
            });
        }
    }, [emailDebounce]);


    useEffect(() => {
        if (!isLoadingContext) {
            form.reset({
                file: undefined,
                fullName: userContext.fullName,
                nickname: userContext.nickname,
                email: userContext.email,
                gender: userContext.gender,
                bio: userContext.bio || "",
            });
        }
    }, [isLoadingContext, userContext, form]);
    useEffect(() => {
        // Only call the API if user data is available and `bio` is not already set
        if (userContext && userContext.nickname && !bio) {
            getUserInfo(userContext.nickname).then((res) => {
                setBio(res.bio || '');
                form.setValue('bio', res.bio || '')
            });
        }
    }, [userContext, bio]);


    function togglePopup() {
        setIsPopupOpen(!isPopupOpen);
    }
    if (isLoadingContext || !bio) {
        return <Loader/>;
    }

    const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
        if (nicknameExists || emailExists || isLoadingState) {
            return;
        }
        setIsLoadingState(true);
        editUserInfo(value).then((response) => {
            navigate(routes.profile.replace(':nickname/*', response.nickname));
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Thay đổi thông tin thất bại',
            });
        }).finally(() => {
            setIsLoadingState(false)
        });
    };
    return (
        <div className="flex flex-1">
            <div className="common-container ">
                <div className="flex-start w-full max-w-5xl justify-start gap-3">
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold w-full text-left">Chỉnh sửa thông tin</h2>

                    <div className="flex justify-center gap-4">
                        <div>
                            <button onClick={togglePopup}
                                    className={`flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1`}>
                                <img
                                    src={"/assets/icons/edit-profile.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <i></i>
                                <p className="small-medium flex whitespace-nowrap">
                                    Thay đổi mật khẩu
                                </p>
                            </button>

                            {isPopupOpen && <ChangePasswordPopup isOpen={isPopupOpen} onClose={togglePopup}/>}
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleUpdate)}
                        className="mt-4 flex w-full max-w-5xl flex-col gap-7">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({field}) => (
                                <FormItem className="flex">
                                    <FormControl>
                                        <ProfileUploader
                                            fieldChange={field.onChange}
                                            mediaUrl={userContext.avatarUrl}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">Tên</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">Biệt danh</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            {...field}
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
                                            value={form.getValues('nickname')}
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
                            name="gender"
                            render={({field}) => (
                                <FormItem className='ml-2 flex-1'>
                                    <FormLabel className="shad-form_label">Giới tính</FormLabel>
                                    <FormControl>
                                        <GenderSelection<z.infer<typeof ProfileValidation>> value={userContext.gender}
                                                                                            setValue={form.setValue}
                                                                                            className='w-1/2'/>
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
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            {...field}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                form.setValue('email', e.target.value, {shouldValidate: true});
                                            }}
                                            value={form.getValues('email')}
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
                            name="bio"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="shad-textarea custom-scrollbar"
                                            {...field}
                                            maxLength={400}
                                            initValue={bio}
                                            formOption={{
                                                name: 'bio',
                                                options: {shouldValidate: true},
                                                callback: (name, value, options) => form.setValue('bio', value, options),
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-end gap-4">
                            <Button
                                type="button"
                                className="shad-button_dark_4"
                                onClick={() => navigate(-1)}>
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="shad-button_primary whitespace-nowrap bg-primary-500 hover:bg-primary-600">
                                {isLoadingState ? (
                                    <div className="flex-center gap-2">
                                        <Loader/> Loading...
                                    </div>
                                ) : (
                                    "Cập nhật"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProfile;
