import React, {useState} from "react";
import {useInView} from "react-intersection-observer";

import {Input} from "@/components/ui";
import {GridPostList, Loader} from "@/components/shared";

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
};

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader/>;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
        return <GridPostList posts={searchedPosts.documents}/>;
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">No results found</p>
        );
    }
};

const Explore: React.FC = () => {
    const {ref, inView} = useInView();

    const [searchValue, setSearchValue] = useState("");

    // fake data for posts
    const [posts, setPosts] = useState({
        pages: [
            {
                documents: [
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
                ],
            },
        ],
    });


    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults &&
        posts.pages.every((item) => item.documents.length === 0);

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Tìm kiếm</h2>
                <div className="flex gap-1 w-full rounded-lg bg-dark-4">
                    <img className='mx-4'
                        src="/assets/icons/search.svg"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="explore-search w-full "
                        value={searchValue}
                        onChange={(e) => {
                            const {value} = e.target;
                            setSearchValue(value);
                        }}
                    />
                </div>
            </div>

            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                <h3 className="body-bold md:h3-bold">Phổ biến</h3>

                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">Tất cả</p>
                    <img
                        src="/assets/icons/filter.svg"
                        width={20}
                        height={20}
                        alt="filter"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {shouldShowSearchResults ? (
                    <SearchResults
                        isSearchFetching={false}
                        searchedPosts={posts.pages[0]}
                    />
                ) : shouldShowPosts ? (
                    <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
                ) : (
                    posts.pages.map((item, index) => (
                        <GridPostList key={`page-${index}`} posts={item.documents}/>
                    ))
                )}
            </div>

            {/*{!searchValue && (*/}
            {/*    <div ref={ref} className="mt-10">*/}
            {/*        <Loader/>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Explore;