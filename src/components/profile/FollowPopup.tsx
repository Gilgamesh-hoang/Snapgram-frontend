import React, {FC, useEffect, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {FollowTab, User} from "@/model/type.ts";
import useDebounce from "@/hooks/useDebounce.ts";
import {filterFollow, getFollowers, getFollowings} from "@/services/follow.ts";
import {PAGE_SIZE_USER_FOLLOW} from "@/constants";
import {searchUserFollowers, searchUserFollowing} from "@/services/search.ts";
import UserItem from "@/components/shared/UserItem.tsx";
import {Loader} from "@/components/shared";
import {useUserContext} from "@/context/AuthContext.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Element = React.JSX.Element;

interface FollowPopupProps {
    onClose: () => void;
    tab: FollowTab;
    userId: string;
}

const FollowPopup: FC<FollowPopupProps> = ({onClose, tab, userId}) => {
    const {userContext} = useUserContext();
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue, 500);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set<string>([]));
    const [isFilterFetching, setIsFilterFetching] = useState(false);
    const isGuest: boolean = userContext.id !== userId;

    const addToSet = ((oldVals: string[], newVals: string[]) => {
        const newSet = new Set(oldVals);
        newVals.forEach(id => newSet.add(id));
        return newSet;
    });

    // This effect runs whenever the searchDebounce changes
    useEffect(() => {
        // Reset the page number and clear the users array
        setPage(1);
        setUsers([]);
    }, [searchDebounce]);


    useEffect(() => {
        if (!userId) return;
        if (searchDebounce && searchDebounce.trim().length) {
            if (tab === 'FOLLOWER') {
                showFollowers(searchDebounce);
            } else if (tab === 'FOLLOWING') {
                showFollowings(searchDebounce);
            }
        } else {
            if (tab === 'FOLLOWER') {
                showFollowers(null);
            } else if (tab === 'FOLLOWING') {
                showFollowings(null);
            }
        }
    }, [page, searchDebounce, tab]);

    const showFollowings = (searchTerm: string | null) => {
        const fetchFollowings = searchTerm
            ? () => searchUserFollowing(userId, searchTerm, page, PAGE_SIZE_USER_FOLLOW)
            : () => getFollowings(userId, page, PAGE_SIZE_USER_FOLLOW);

        fetchUsers(fetchFollowings, searchTerm);
    };
    const fetchUsers = (
        fetchFunction: () => Promise<User[]>,
        searchTerm: string | null
    ) => {
        setIsFilterFetching(true);

        fetchFunction()
            .then((res: User[]) => {
                setUsers((prev) => [...prev, ...res]);
                if (res.length > 0) {
                    const ids = res.map((user) => user.id);

                    filterFollow(ids)
                        .then((res) => {
                            setFollowingIds(addToSet(Array.from(followingIds), res));
                        })
                }
                res.length < PAGE_SIZE_USER_FOLLOW ? setHasMore(false) : setHasMore(true);
            })
            .catch(() => {
                setHasMore(false);
            })
            .finally(() => {
                setIsFilterFetching(false);
            });
    };
    const showFollowers = (searchTerm: string | null) => {
        const fetchFollowers = searchTerm
            ? () => searchUserFollowers(userId, searchTerm, page, PAGE_SIZE_USER_FOLLOW)
            : () => getFollowers(userId, page, PAGE_SIZE_USER_FOLLOW);
        fetchUsers(fetchFollowers, searchTerm);
    };

    const onSuccess = (userId: string) => {
        // filter out the user who has been followed
        setUsers((prev) => prev.filter((user) => user.id !== userId));
    }

    const renderFollowItems = () => {
        if (followingIds.size === 0 && isFilterFetching) {
            return <Loader/>;
        }

        let myself: Element | null = null;
        const result: Element[] = [];
        users.forEach((user) => {
            const commonProps = {
                userId: user.id,
                imageUrl: user.avatarUrl,
                name: user.fullName,
                nickname: user.nickname,
                tab,
                onSuccess,
                isGuest
            };
            if (user.id === userContext.id) {
                myself = <UserItem key={user.id} {...commonProps} isMyself={true}/>;
            } else {
                if (followingIds.has(user.id)) {
                    result.push(<UserItem key={user.id} {...commonProps} isFollowed={true}/>);
                } else {
                    result.push(<UserItem key={user.id} {...commonProps}/>);
                }
            }
        });
        if (myself) {
            result.unshift(myself);
        }
        return result;
    }

    return (
        <>
            <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                <div className="relative w-[26rem] rounded-lg bg-dark-3 p-4 shadow-lg backdrop-filter-none">
                    <button className='absolute right-2.5 top-2.5'
                            onClick={onClose}
                    >
                        <MdOutlineClose size={25}/>
                    </button>
                    <p className="mb-2 text-center text-base font-light">{tab === 'FOLLOWER' ? 'Người theo dõi' : 'Đang theo dõi'} </p>
                    <hr/>
                    <div className="relative my-4">
                        <img className='absolute left-2 top-2'
                             src={"/assets/icons/search.svg"}
                             alt="search"
                             width={20}
                             height={20}
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="h-9 w-full rounded-md bg-dark-4 pl-10 pr-4"
                            value={searchValue}
                            maxLength={20}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />

                    </div>
                    <div id="followScrollable"
                         className="custom-scrollbar mt-4  h-[26rem] max-h-[26rem]  overflow-y-scroll pe-1.5">

                        <InfiniteScroll
                            dataLength={users.length}
                            next={() => setPage((prev) => prev + 1)}
                            hasMore={hasMore}
                            loader={<Loader/>}
                            scrollableTarget="followScrollable"
                            style={{overflow: "hidden"}}
                        >
                            <div className='flex flex-col gap-4'>

                                {renderFollowItems()}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FollowPopup;