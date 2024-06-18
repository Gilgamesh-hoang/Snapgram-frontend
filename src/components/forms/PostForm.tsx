import * as z from "zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea,} from "@/components/ui";
import {PostValidation} from "@/validation";
import {FileUploader} from "@/components/shared";
import {MediaUrl} from "@/components/shared/FileUploader.tsx";

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
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: []
        },
    });

    // Handler
    const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
        // ACTION = UPDATE
        if (post && action === "Update") {

            return navigate(`/posts/`);
        }

        // ACTION = CREATE

        navigate("/");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full max-w-5xl flex-col  gap-9">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Nội dung</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    {...field}
                                    maxLength={2200}
                                />
                            </FormControl>
                            <FormMessage className="error-message"/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Ảnh</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post === undefined ? [] : post?.imageUrl}
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
                        {action} bài viết
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;
