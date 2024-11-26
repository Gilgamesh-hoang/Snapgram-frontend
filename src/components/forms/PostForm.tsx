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
import TagsInput from "@/components/shared/TagsInput.tsx";
import {BsFillTagsFill} from "react-icons/bs";
import axios from "axios";

import {Editor, EditorTextChangeEvent} from 'primereact/editor';
import {useUserContext} from "@/context/AuthContext.tsx";
import uploadFiles from "@/services/uploadFiles.ts";
import {generateProfileLink, showAlert} from "@/utils/common.ts";

type PostFormProps = {
    post: Post | null;
    action: "Create" | "Update";
};

const PostForm: FC<PostFormProps> = ({post, action}) => {
        const navigate = useNavigate();
        const {userContext} = useUserContext();
        const [isLoading, setIsLoading] = useState(false);
        const [tags, setTags] = useState<string[]>([]);
        const [caption, setCaption] = useState<string>('');
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
                setCaption(post.caption);
                setTags(post.tags.map(tag => tag.name));
            }
        }, [post]);

        if (!post && action === "Update") {
            return;
        }
        // Handler
        const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
            if (isLoading) return;
            if (caption.trim().length > 2200) {
                showAlert('error', 'Nội dung không được vượt quá 2200 ký tự.');
                return;
            }
            setIsLoading(true);

            try {
                if (post && action === "Update") {
                    await handleUpdatePost(value);
                } else if (action === "Create") {
                    await handleCreatePost(value);
                }
            } catch (error) {
                handlePostError(error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleUpdatePost = async (value: z.infer<typeof PostValidation>) => {
            if (post?.creator.id !== userContext.id) {
                return;
            }

            let media;
            if (value.files.length > 0) {
                media = await uploadFiles(value.files);
            }
            const updatedPost = await updatePost(post.id, caption, media, tags, removeMedia);

            navigate(`/posts/${updatedPost.id}`);
        }

        const handleCreatePost = async (value: z.infer<typeof PostValidation>) => {
            const media = await uploadFiles(value.files);
            await createPost(caption, media, tags);

            navigate(generateProfileLink(userContext.nickname));
        };

        const handlePostError = (error: unknown) => {
            console.error('Error:', error);

            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 400:
                        showAlert('error', 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
                        break;
                    case 500:
                        showAlert('error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
                        break;
                    default:
                        showAlert('error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                showAlert('error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        };


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
                                    <Editor value={caption}
                                            onTextChange={(e: EditorTextChangeEvent) => setCaption(e.htmlValue || '')}
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
                                        note={'SVG, PNG, JPG, MP4'}
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
