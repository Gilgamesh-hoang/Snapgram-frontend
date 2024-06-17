import {Link, useNavigate} from "react-router-dom";

import {Button} from "@/components/ui";
import {PostStats} from "@/components/shared";

import {multiFormatDateString} from "@/utils";
import React from "react";

const PostDetails: React.FC = () => {
    const navigate = useNavigate();
    const handleDeletePost = () => {
        navigate(-1);
    };

    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                    <img
                        src={"/assets/icons/back.svg"}
                        alt="back"
                        width={24}
                        height={24}
                    />
                    <p className="small-medium lg:base-medium">Trờ về</p>
                </Button>
            </div>

            {/*{isLoading || !post ? (*/}
            {/*    <Loader />*/}
            {/*) : (*/}
            <div className="post_details-card">
                <img
                    src='https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg'
                    alt="creator"
                    className="post_details-img"
                />

                <div className="post_details-info">
                    <div className="flex-between w-full">
                        <Link
                            to={`/profile/`}
                            className="flex items-center gap-3">
                            <img
                                src={"/assets/icons/profile-placeholder.svg"}
                                alt="creator"
                                className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                            />
                            <div className="flex gap-1 flex-col">
                                <p className="base-medium lg:body-bold text-light-1">
                                    Nguyen van a
                                </p>
                                <div className="flex-center gap-2 text-light-3">
                                    <p className="subtle-semibold lg:small-regular ">
                                        {multiFormatDateString(new Date().toDateString())}
                                    </p>
                                    •
                                    <p className="subtle-semibold lg:small-regular">
                                        location
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className="flex-center gap-4">
                            <Link
                                to={`/update-post/`}>
                                <img
                                    src={"/assets/icons/edit.svg"}
                                    alt="edit"
                                    width={24}
                                    height={24}
                                />
                            </Link>

                            <Button
                                onClick={handleDeletePost}
                                variant="ghost"
                                className={`ost_details-delete_btn`}>
                                <img
                                    src={"/assets/icons/delete.svg"}
                                    alt="delete"
                                    width={24}
                                    height={24}
                                />
                            </Button>
                            <div className="flex gap-2">
                                <img
                                    src={"/assets/icons/saved.svg"}
                                    alt="share"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="w-full">
                        <p className="small-regular lg:base-regular">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi eos
                            exercitationem fugiat iusto minima molestiae nam nesciunt nihil nobis nostrum, nulla quae
                            quis saepe unde veniam! Odit, voluptates!</p>
                    </div>

                    <hr className="border w-full border-dark-4/80"/>
                    {/*show comments*/}
                    <div className='show_comments-container'>
                        <ul className='flex flex-col'>
                            <li className='mb-7'>
                                <div className='flex items-center mb-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className="mr-3 size-7 rounded-full"
                                    />
                                    <p className='text-light-3'>Jack Swagger</p>
                                </div>

                                <div>
                                    <p className='small-regular mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi
                                        eos exercitationem fugiat iusto minima</p>
                                    <div className="flex-start gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular me-3">
                                            {multiFormatDateString(new Date().toDateString())}
                                        </p>

                                        <div className='flex items-center cursor-pointer'>
                                            <img
                                                src={"/assets/icons/reply.svg"}
                                                alt="reply"
                                            />
                                            <span className='ms-1.5 text-light-2'>Trả lời</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-7'>
                                <div className='flex items-center mb-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className="mr-3 size-7 rounded-full"
                                    />
                                    <p className='text-light-3'>Jack Swagger</p>
                                </div>

                                <div>
                                    <p className='small-regular mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi
                                        eos exercitationem fugiat iusto minima</p>
                                    <div className="flex-start gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular me-3">
                                            {multiFormatDateString(new Date().toDateString())}
                                        </p>

                                        <div className='flex items-center cursor-pointer'>
                                            <img
                                                src={"/assets/icons/reply.svg"}
                                                alt="reply"
                                            />
                                            <span className='ms-1.5 text-light-2'>Trả lời</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-7'>
                                <div className='flex items-center mb-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className="mr-3 size-7 rounded-full"
                                    />
                                    <p className='text-light-3'>Jack Swagger</p>
                                </div>

                                <div>
                                    <p className='small-regular mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi
                                        eos exercitationem fugiat iusto minima</p>
                                    <div className="flex-start gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular me-3">
                                            {multiFormatDateString(new Date().toDateString())}
                                        </p>

                                        <div className='flex items-center cursor-pointer'>
                                            <img
                                                src={"/assets/icons/reply.svg"}
                                                alt="reply"
                                            />
                                            <span className='ms-1.5 text-light-2'>Trả lời</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-7'>
                                <div className='flex items-center mb-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className="mr-3 size-7 rounded-full"
                                    />
                                    <p className='text-light-3'>Jack Swagger</p>
                                </div>

                                <div>
                                    <p className='small-regular mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi
                                        eos exercitationem fugiat iusto minima</p>
                                    <div className="flex-start gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular me-3">
                                            {multiFormatDateString(new Date().toDateString())}
                                        </p>

                                        <div className='flex items-center cursor-pointer'>
                                            <img
                                                src={"/assets/icons/reply.svg"}
                                                alt="reply"
                                            />
                                            <span className='ms-1.5 text-light-2'>Trả lời</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <PostStats isShowShare={true}/>
                    </div>

                    {/*comment*/}
                    <div className='flex h-7 w-full items-center'>
                        <img
                            src={"/assets/icons/profile-placeholder.svg"}
                            alt="user"
                            className="mr-3 size-7 rounded-full"
                        />

                        <form className="relative flex w-full gap-5">
                            <input
                                type="text"
                                className="h-9 w-full rounded-md border-none bg-dark-4 px-3 py-2 text-sm placeholder:text-slate-500"
                                placeholder='Thêm bình luận...'
                            />
                            <button className='absolute bottom-1/4 right-3'>
                                <img
                                    src={"/assets/icons/send-secondary.svg"}
                                    alt="send"
                                    width={20}
                                    height={20}
                                    className={'text-secondary-500'}
                                />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/*)}*/}

        </div>
    );
};

export default PostDetails;
