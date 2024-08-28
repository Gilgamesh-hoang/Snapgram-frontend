import {useParams} from "react-router-dom";
import PostForm from "@/components/forms/PostForm";
import React, {useEffect, useState} from "react";
import {getPostsById} from "@/services/post.ts";
import {Post} from "@/model/type.ts";

const INITIAL_POST: Post = {
    id: "",
    caption: "",
    media: [],
    tags: [],
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    createdAt: new Date(),
}
const EditPost: React.FC = () => {
    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    useEffect(() => {
        if (id) {
            getPostsById(id).then((data) => {
                if (data) {
                    setPost(data);
                }
            });

        }
    }, [id]);

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start w-full max-w-5xl justify-start gap-3">
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold w-full text-left">Chỉnh sửa bài viết</h2>
                </div>

                <PostForm action="Update" post={post}/>
            </div>
        </div>
    );
};

export default EditPost;
