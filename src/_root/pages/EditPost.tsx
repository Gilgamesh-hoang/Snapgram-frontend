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
            src: "https://instagram.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/447599559_18272564167225020_767706022482666225_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fsgn19-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=tCAQYnddtA0Q7kNvgHy6BSb&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM4MjI4MTAzMTU3MDMwNzQwNQ%3D%3D.2-ccb7-5&oh=00_AYBAoEU9kBW4DkfRSGBKG2kfKqmW8EyEmSMVj_PNnWB_nQ&oe=66737483&_nc_sid=469e9a"
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
