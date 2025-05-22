import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui";
import {Loader, UserCard} from "@/components/shared";
import InfiniteScroll from "react-infinite-scroll-component";
import {useLocation, useNavigate} from "react-router-dom";
import useDebounce from "@/hooks/useDebounce.ts";
import {User} from "@/model/type.ts";
import {searchUsers} from "@/services/search.ts";
import {friendSuggestions} from "@/services/user.ts";
import {PAGE_SIZE_ALL_USER, PAGE_SIZE_FRIEND_SUGGESTION} from "@/constants";


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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // This effect runs whenever the searchDebounce changes
    useEffect(() => {
        // Reset the page number and clear the users array
        setIsLoading(true);
        setPage(1);
        setUsers([]);

        // If there's a debounced search value, set it as the 'q' query parameter in the URL
        // Otherwise, remove the 'q' query parameter from the URL
        if (searchDebounce) {
            queryParams.set('q', encodeURIComponent(searchDebounce));
        } else {
            queryParams.delete('q');
        }

        // Navigate to the current path with the updated query parameters
        navigate(`${location.pathname}?${queryParams.toString()}`, {replace: true});
        setIsLoading(false);
    }, [searchDebounce, location.pathname, navigate]);

    useEffect(() => {
        console.log("fetching data")
        setIsLoading(true);

        // If there's a debounced search value, search for users with that value
        // Otherwise, get friend suggestions
        if (searchDebounce && searchDebounce.trim().length) {
            searchUsers(searchDebounce, page, PAGE_SIZE_ALL_USER).then((res) => {
                const data = res.data;
                setUsers((prev) => [...prev, ...data]);
                if (data.length < PAGE_SIZE_ALL_USER) {
                    setHasMore(false);
                }
            }).catch(() => {
                setHasMore(false);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            friendSuggestions(page, PAGE_SIZE_FRIEND_SUGGESTION).then((res: User[]) => {
                setUsers((prev) => [...prev, ...res]);
                if (res.length < PAGE_SIZE_FRIEND_SUGGESTION) {
                    setHasMore(false);
                }
            }).catch(() => {
                setHasMore(false);
            }).finally(() => {
                setIsLoading(false);
            });
        }


    }, [page, searchDebounce]);

    const onFollowSuccess = (userId: string) => {
        // filter out the user who has been followed
        setUsers((prev) => prev.filter((user) => user.id !== userId));
    }

    const renderUserCard = () => {
        if (users.length === 0 && isLoading) {
            return <Loader />;
        }

        if (!isLoading && users.length === 0) {
            // Hiển thị thông báo khi không tìm thấy người dùng
            return (
                <div className="w-full max-w-2xl">
                    <p className="text-center text-light-3">Không tìm thấy người dùng</p>
                </div>
            );
        }

        return (
            <InfiniteScroll
                dataLength={users.length}
                next={() => setPage((prev) => prev + 1)}
                hasMore={hasMore}
                loader={<Loader/>}
                scrollableTarget="allUserScrollable"
                style={{overflow: "hidden"}}
            >
                <div className='user-grid'>
                    {users.map((user, index) => (
                        <div key={index} className="w-full min-w-[200px] flex-1">
                            <UserCard id={user.id} name={user.fullName} imageUrl={user.avatarUrl}
                                      nickname={user.nickname} key={index}
                                      onFollowSuccess={onFollowSuccess}
                            />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        );
    }


    return (
        <div className="common-container" id="allUserScrollable">
            <div className="user-container ">
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
                </div>
                {renderUserCard()}

            </div>
        </div>
    );
}

export default AllUsers;
