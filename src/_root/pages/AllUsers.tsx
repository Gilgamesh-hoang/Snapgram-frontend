import React, {useEffect, useState} from "react";
import {Button, Input} from "@/components/ui";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {Loader, UserCard} from "@/components/shared";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import useDebounce from "@/hooks/useDebounce.ts";
import {searchUsers} from "@/services/search.ts";
import {User} from "@/model/type.ts";
import {useLocation, useNavigate} from "react-router-dom";


const AllUsers: React.FC = () => {
    // Initialize searchValue from the URL's query parameter
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchValue = decodeURIComponent(queryParams.get('q') || "");

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const searchDebounce = useDebounce(searchValue, 500);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setPage(1);
        setUsers([]);

        // Update the URL with the query parameter whenever searchDebounce changes
        if (searchDebounce) {
            queryParams.set('q', encodeURIComponent(searchDebounce));
        } else {
            queryParams.delete('q');
        }
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [searchDebounce, location.pathname, navigate]);

    useEffect(() => {
        if (searchDebounce && searchDebounce.trim().length >= 1) {
            searchUsers(searchDebounce, page)
                .then((res) => {
                    const data = res.data;
                    if (data.length === 0) {
                        setHasMore(false);
                    } else {
                        setUsers((prev) => [...prev, ...res.data]);
                    }
                });
        }
    }, [page, searchDebounce]);


    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold w-full text-left">Người dùng</h2>

                <div className="flex w-full">
                    <form className="relative mr-8 flex w-full max-w-2xl gap-1 rounded-lg bg-dark-4"
                          onSubmit={(e) => e.preventDefault()}
                    >
                        <img className='absolute left-4 top-1/2 -translate-y-1/2'
                             src="/assets/icons/search.svg"
                             width={24}
                             height={24}
                             alt="search"
                        />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="explore-search w-full pl-14"
                            value={searchValue}
                            maxLength={50}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </form>
                    <div className=''>
                        <Button type='button' className='h-full' title='Tải ảnh'>
                            <AiOutlineCloudUpload size={25}/>
                        </Button>
                    </div>
                </div>

                {users.length > 0 && (
                    <InfiniteScroll
                        loader={<Loader/>}
                        fetchMore={() => setPage((prev) => prev + 1)}
                        hasMore={hasMore}
                        className='user-grid'
                    >
                        {users.map((user, index) => (
                            <div key={index} className="w-full min-w-[200px] flex-1  ">
                                <UserCard id={user.id} name={user.fullName} imageUrl={user.avatarUrl}
                                          nickname={user.nickname} key={index}/>
                            </div>
                        ))}
                    </InfiniteScroll>
                )}
            </div>

        </div>
    );
}

export default AllUsers;