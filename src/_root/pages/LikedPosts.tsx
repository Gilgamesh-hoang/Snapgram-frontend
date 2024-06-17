import { GridPostList, Loader } from "@/components/shared";
import React from "react";

const LikedPosts : React.FC = () => {
    const savePosts = [
        {
            id: "1",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "1",
                name: "John Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
        {
            id: "2",
            imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            creator: {
                id: "2",
                name: "Jane Doe",
                imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
            },
        },
    ]

    return (
        <>
            {/*{currentUser.liked.length === 0 && (*/}
            {/*    <p className="text-light-4">No liked posts</p>*/}
            {/*)}*/}

            <GridPostList posts={savePosts} showStats={false} />
        </>
    );
};

export default LikedPosts;
