import * as z from "zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea,} from "@/components/ui";
import {PostValidation} from "@/validation";
import {FileUploader} from "@/components/shared";
import {MediaUrl} from "@/model/type.ts";
import {createPost} from "@/services/post.ts";
import React, {useState} from "react";
import TagsInput from "@/components/TagsInput.tsx";
import {BsFillTagsFill} from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../shared/Loader.tsx";

type PostFormProps = {
    post?: {
        caption: string;
        location: string;
        imageUrl: MediaUrl[];
    };
    action: "Create" | "Update";
};

const PostForm = ({post, action}: PostFormProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: "",
            files: []
        },
    });
    // Handler
    const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
        if (isLoading) return;
        setIsLoading(true);
        // ACTION = UPDATE
        if (post && action === "Update") {
            return navigate(`/posts/`);
        } else if (action === "Create") {
            await createPost(value.caption, value.files, tags)
                .then(() => {
                    navigate(`/posts`);
                }).catch((error) => {
                    console.log('error, ', error);
                    // If the error is an Axios error, handle different status codes
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 400) {
                            showAlert('error', 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
                        } else if (error.response?.status === 500) {
                            showAlert('error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
                        }else {
                            showAlert('error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
                        }
                    }
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    };

    function showAlert(type: 'success' | 'error', message: string, timeout = 1500) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: timeout
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full max-w-5xl flex-col gap-9">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Nội dung</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar min-h-[200px]"
                                    {...field}
                                    maxLength={2200}
                                    formOption={{
                                        name: 'caption', // use the name from the form field
                                        options: {shouldValidate: true},
                                        callback: (name, value, options) => form.setValue('caption', value, options),
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="error-message"/>
                        </FormItem>
                    )}
                />
                <div>
                    <BsFillTagsFill size={20} className='mb-2'/>
                    <TagsInput selectedTags={setTags}/>
                </div>
                <FormField
                    control={form.control}
                    name="files"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Ảnh</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={!post ? [] : post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="error-message"/>
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
                        className="shad-button_primary whitespace-nowrap">
                        {isLoading ? (
                            <div className="flex-center gap-2">
                                <Loader/> Loading...
                            </div>
                        ) : (
                            'Lưu'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;
