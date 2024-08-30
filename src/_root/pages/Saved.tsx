import {GridPostList} from "@/components/shared";
import {FC, useEffect, useState} from "react";
import {Post} from "@/model/type.ts";
import {getSavedPostsByUser} from "@/services/post.ts";
import {PAGE_SIZE_POST_IN_SAVED} from "@/constants";

const Saved: FC = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getSavedPostsByUser(page, PAGE_SIZE_POST_IN_SAVED).then((res) => {
            const newValues = [...posts, ...res];
            setPosts(newValues);
            if (res.length < PAGE_SIZE_POST_IN_SAVED) {
                setHasMore(false);
            }
        }).catch(() => {
            setHasMore(false);
        });

    }, [page]);

    return (
        <div className="saved-container">
            <div className="flex w-full max-w-5xl gap-2">
                <img
                    src="/assets/icons/save.svg"
                    width={36}
                    height={36}
                    alt="edit"
                    className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold w-full text-left">Đã lưu</h2>
            </div>

            <div className="flex w-full max-w-5xl">
                <div
                    className="flex cursor-pointer items-center justify-center gap-3 rounded-s-md bg-dark-3 px-8 py-2 hover:bg-dark-3">
                    <img
                        src="/assets/icons/posts.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Bài viết</p>
                </div>

                <div
                    className="flex cursor-pointer items-center justify-center gap-3 border-2 border-dark-3 bg-dark-2 px-8 py-2 hover:bg-dark-3">
                    <img
                        src="/assets/icons/reel.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Video</p>
                </div>
                <div
                    className="flex cursor-pointer items-center justify-center gap-3 rounded-e-md border-2 border-dark-3 bg-dark-2  px-8 py-2 hover:bg-dark-3">
                    <img
                        src="/assets/icons/collection.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                    <p className="small-medium md:base-medium text-light-2">Bộ sưu tập</p>
                </div>
            </div>

            <ul className="flex w-full max-w-5xl justify-center gap-9">
                {posts.length === 0 ? (
                    <p className="text-light-4">Chưa có lưu bài viết nào</p>
                ) : (
                    <GridPostList page={page} setPage={setPage} hasMore={hasMore} posts={posts} showUser={true}/>
                )}
            </ul>
        </div>
    );
};

export default Saved;
