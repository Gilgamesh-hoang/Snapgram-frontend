import {Link, useNavigate} from "react-router-dom";

import {CarouselPost, PostStats} from "@/components/shared";
import {formatDateString, multiFormatDateString} from "@/utils/dateUtil";
import React, {useState} from "react";
import {Post} from "@/model/type.ts";
import Tippy from "@tippyjs/react";
import {routes} from "@/route";
import 'tippy.js/dist/svg-arrow.css';
import {savedPost} from "@/services/savePost.ts";
import {generateProfileLink} from "@/utils/common.ts";
import Avatar from "@/components/shared/Avatar.tsx";

type PostCardProps = {
    post: Post;

};

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(post.isSaved);

    const handleSavePost = () => {
        const oldValue = isSaved;
        const newValue = !isSaved;
        setIsSaved(newValue);
        savedPost(post.id, newValue).catch(() => {
            setIsSaved(oldValue);
        })
    }

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={generateProfileLink(post.creator.nickname)}>
                        <Avatar name={post.creator.nickname} imageUrl={post.creator.avatarUrl} style={"size-12"}  />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                            {post.creator.nickname}
                        </p>
                        <div className="gap-2 text-light-3">
                            <Tippy
                                placement={"bottom-end"}
                                delay={[200, 0]}
                                offset={[10, 5]}
                                content={
                                    <div className="subtle-semibold rounded-xl bg-white p-2 text-dark-2">
                                        {formatDateString(post.createdAt)}
                                    </div>}
                            >
                                <p className="subtle-semibold lg:small-regular">
                                    {multiFormatDateString(post.createdAt)}
                                </p>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2" onClick={handleSavePost}>
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="share"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </div>
            </div>


            <div className="base-regular py-5">
                <p>{post.caption}</p>
                <ul className="mt-2 flex gap-1.5">
                    {post.tags.map((tag, index) => (
                        <li key={`${tag}${index}${post.id}`} className="small-semibold text-[15px] text-light-3">
                            #{tag.name}
                        </li>
                    ))}
                </ul>
            </div>

            <CarouselPost sources={post.media}/>

            <PostStats post={post} onClickOnComment={() => navigate(routes.posts.replace(':id', post.id))}/>

        </div>
    );
};
export default PostCard;