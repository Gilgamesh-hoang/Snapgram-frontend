import * as z from "zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui";
import {PostValidation} from "@/validation";
import {FileUploader, Loader} from "@/components/shared";
import {Post} from "@/model/type.ts";
import {createPost, updatePost} from "@/services/post.ts";
import React, {FC, useEffect, useState} from "react";
import TagsInput from "@/components/TagsInput.tsx";
import {BsFillTagsFill} from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";

import {Editor, EditorTextChangeEvent} from 'primereact/editor';
import {useUserContext} from "@/context/AuthContext.tsx";

type PostFormProps = {
    post: Post | null;
    action: "Create" | "Update";
};

const PostForm: FC<PostFormProps> = ({post, action}) => {
        const navigate = useNavigate();
        const {user} = useUserContext();
        const [isLoading, setIsLoading] = useState(false);
        const [tags, setTags] = useState<string[]>([]);
        const [text, setText] = useState<string>('');
        const [removeMedia, setRemoveMedia] = useState<string[]>([]);
        const form = useForm<z.infer<typeof PostValidation>>({
            resolver: zodResolver(PostValidation),
            defaultValues: {
                caption: post ? post.caption : "",
                files: [],
            },
        });
        useEffect(() => {
            if (post && action === "Update") {
                form.reset({
                    caption: post.caption,
                });
                setText(post.caption);
                setTags(post.tags.map(tag => tag.name));
            }
        }, [post]);

        if (!post && action === "Update") {
            return;
        }
        // Handler
        const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
            if (isLoading) return;
            if (text.trim().length > 2200) {
                showAlert('error', 'Nội dung không được vượt quá 2200 ký tự.');
                return;
            }
            setIsLoading(true);
            // ACTION = UPDATE
            if (post && action === "Update") {
                if (post.creator.id !== user.id) {
                    return;
                }
                // console.log('id', post.id)
                // console.log('tag', tags)
                // console.log('removeMedia', removeMedia)
                // console.log('caption', value.caption)
                updatePost(post.id, text, value.files, tags, removeMedia).then((post) => {
                    // updatePost(post.id, value.caption, value.files, tags, removeMedia).then((post) => {

                }).catch(() => {

                }).finally(() => {
                    setIsLoading(false);
                });

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
                            } else {
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

        const renderHeader = () => {
            return (
                <>
                    <span className="ql-formats">
                      <select className="ql-font"></select>
                      <select className="ql-size"></select>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-bold"></button>
                      <button className="ql-italic"></button>
                      <button className="ql-underline"></button>
                      <button className="ql-strike"></button>
                    </span>
                    <span className="ql-formats">
                      <select className="ql-color"></select>
                      <select className="ql-background"></select>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-script" value="sub"></button>
                      <button className="ql-script" value="super"></button>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-header" value="1"></button>
                      <button className="ql-header" value="2"></button>
                      <button className="ql-blockquote"></button>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-list" value="ordered"></button>
                      <button className="ql-list" value="bullet"></button>
                      <button className="ql-indent" value="-1"></button>
                      <button className="ql-indent" value="+1"></button>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-direction" value="rtl"></button>
                      <select className="ql-align"></select>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-link"></button>
                      <button className="ql-formula"></button>
                    </span>
                    <span className="ql-formats">
                      <button className="ql-clean"></button>
                    </span>
                </>
            );
        }
        const header = renderHeader();
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
                                    {/*<Textarea*/}
                                    {/*    className="shad-textarea custom-scrollbar min-h-[200px]"*/}
                                    {/*    {...field}*/}
                                    {/*    maxLength={2200}*/}
                                    {/*    initValue={post ? post.caption : ''}*/}
                                    {/*    formOption={{*/}
                                    {/*        name: 'caption',*/}
                                    {/*        options: {shouldValidate: true},*/}
                                    {/*        callback: (name, value, options) => form.setValue('caption', value, options),*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <Editor value={text}
                                            onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue || '')}
                                            style={{height: '320px'}}
                                            headerTemplate={header}
                                    />
                                </FormControl>
                                <FormMessage className="error-message"/>
                            </FormItem>
                        )}
                    />
                    <div>
                        <BsFillTagsFill size={20} className='mb-2'/>
                        <TagsInput selectedTags={setTags} initTags={post?.tags.map(tag => tag.name)}/>
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
                                        mediaUrl={post ? post.media : []}
                                        setRemoveMedia={setRemoveMedia}
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
    }
;

export default PostForm;
