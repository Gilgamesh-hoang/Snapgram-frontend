import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate, useParams} from "react-router-dom";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button, Input, Textarea} from "@/components/ui";
import {ProfileUploader} from "@/components/shared";

import {ProfileValidation} from "@/validation";
import React from "react";

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const user = {
        name: 'nguyen van a',
        username: 'gilgamesh',
        email: 'sdegnriung gnru',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi eos exercitationem fugiat iusto minima molestiae nam nesciunt nihil nobis nostrum, nulla quae quis saepe unde veniam! Odit, voluptates!'
    }
    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            file: undefined,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio || "",
        },
    });

    // Handler
    const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
        return navigate(`/profile/{id}`);
    };

    return (
        <div className="flex flex-1">
            <div className="common-container ">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Chỉnh sửa thông tin</h2>

                    <div className="flex justify-center gap-4">
                        <div>
                            <Link
                                to={`/update-profile/`}
                                className={`flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1`}>
                                <img
                                    src={"/assets/icons/edit-profile.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <i></i>
                                <p className="small-medium flex whitespace-nowrap">
                                    Thay dổi mật khẩu
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleUpdate)}
                        className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({field}) => (
                                <FormItem className="flex">
                                    <FormControl>
                                        <ProfileUploader
                                            fieldChange={field.onChange}
                                            mediaUrl={'https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a'}
                                        />
                                    </FormControl>
                                    <FormMessage className="shad-form_message"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
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
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">Tên đăng nhập</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            {...field}
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage/>
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
                                        />
                                    </FormControl>
                                    <FormMessage/>
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
                                            maxLength={200}
                                        />
                                    </FormControl>
                                    <FormMessage className="shad-form_message"/>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4 items-center justify-end">
                            <Button
                                type="button"
                                className="shad-button_dark_4"
                                onClick={() => navigate(-1)}>
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="shad-button_primary whitespace-nowrap bg-primary-500 hover:bg-primary-600">
                                Cập nhật
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProfile;
