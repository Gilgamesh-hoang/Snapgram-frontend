import {useParams} from "react-router-dom";
import PostForm from "@/components/forms/PostForm";
import React from "react";

const EditPost: React.FC = () => {
    const {id} = useParams();
    const post = {
        caption: "This is a caption",
        location: "Lagos, Nigeria",
        imageUrl: [{
            isImage: true,
            src: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg"
        }],
    };

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
                </div>

                <PostForm action="Update" post={post}/>
            </div>
        </div>
    );
};

export default EditPost;
