import React, {FC, useEffect, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {useParams} from "react-router-dom";
import {User} from "@/model/type.ts";
import useDebounce from "@/hooks/useDebounce.ts";
import {getFollowers, getFollowings} from "@/services/user.ts";
import {PAGE_SIZE_ALL_USER, PAGE_SIZE_USER_FOLLOW} from "@/constants";
import {searchUserFollowers, searchUserFollowings} from "@/services/search.ts";
import UserItem from "@/components/shared/UserItem.tsx";
import {Loader, UserCard} from "@/components/shared/index.tsx";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";

interface FollowPopupProps {
    onClose: () => void;
    action: 'FOLLOWER' | 'FOLLOWING';
    userId: string;
}

const FollowPopup: FC<FollowPopupProps> = ({onClose, action, userId}) => {
    const {nickname} = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue, 500);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);


    // This effect runs whenever the searchDebounce changes
    useEffect(() => {
        // Reset the page number and clear the users array
        setPage(1);
        setUsers([]);
    }, [searchDebounce]);

    // This effect runs whenever the page number or searchDebounce changes
    useEffect(() => {
        if (!nickname || !userId)
            return;

        if (searchDebounce && searchDebounce.trim().length) {
            if (action === 'FOLLOWER') {
                searchUserFollowers(nickname, searchDebounce, page, PAGE_SIZE_ALL_USER).then((res) => {
                    setUsers((prev) => [...prev, ...res]);
                    if (res.length < PAGE_SIZE_USER_FOLLOW) {
                        setHasMore(false);
                    }
                }).catch(() => {
                    setHasMore(false);
                });
            } else if (action === 'FOLLOWING') {
                searchUserFollowings(nickname, searchDebounce, page, PAGE_SIZE_ALL_USER).then((res) => {
                    setUsers((prev) => [...prev, ...res]);
                    if (res.length < PAGE_SIZE_USER_FOLLOW) {
                        setHasMore(false);
                    }
                }).catch(() => {
                    setHasMore(false);
                });
            }

        } else {
            if (action === 'FOLLOWER') {
                getFollowers(userId, page, PAGE_SIZE_USER_FOLLOW).then((res: User[]) => {
                    setUsers((prev) => [...prev, ...res]);
                    res.length < PAGE_SIZE_USER_FOLLOW ? setHasMore(false) : setHasMore(true);
                }).catch(() => {
                    setHasMore(false);
                });
            } else if (action === 'FOLLOWING') {
                getFollowings(userId, page, PAGE_SIZE_USER_FOLLOW).then((res: User[]) => {
                    setUsers((prev) => [...prev, ...res]);
                    res.length < PAGE_SIZE_USER_FOLLOW ? setHasMore(false) : setHasMore(true);
                }).catch(() => {
                    setHasMore(false);
                });
            }

        }
    }, [page, searchDebounce]);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
            <div className="relative w-[26rem] rounded-lg bg-dark-3 p-4 shadow-lg backdrop-filter-none">
                <button className='absolute right-2.5 top-2.5'
                        onClick={onClose}
                >
                    <MdOutlineClose size={25}/>
                </button>
                <p className="mb-2 text-center text-base font-light">{action === 'FOLLOWER' ? 'Người theo dõi' : 'Đang theo dõi'} </p>
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
                        maxLength={20}
                    />

                </div>
                <div className="custom-scrollbar mt-4 flex max-h-[26rem] flex-col gap-4 overflow-y-scroll">
                    <InfiniteScroll
                        loader={<Loader/>}
                        fetchMore={() => setPage((prev) => prev + 1)}
                        hasMore={hasMore}
                    >
                        {users.map((user) => (
                            <UserItem key={user.id}
                                      imageUrl={user.avatarUrl}
                                      name={user.fullName}
                                      nickname={user.nickname}
                            />
                        ))}
                    </InfiniteScroll>

                </div>
            </div>
        </div>
    );
}
export default FollowPopup;