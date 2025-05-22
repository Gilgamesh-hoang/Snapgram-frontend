import {Button, Input} from "@/components/ui";
import React, {useEffect, useRef, useState} from "react";
import CheckboxUser from "@/components/message/groupForm/CheckboxUser.tsx";
import UserItem from "@/components/message/groupForm/UserItem.tsx";
import {Creator, User} from "@/model/type.ts";
import {searchUserFollowing} from "@/services/search.ts";
import {PAGE_SIZE_USER_FOLLOW} from "@/constants";
import useDebounce from "@/hooks/useDebounce.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {Loader} from "@/components/shared";
import {getFollowings} from "@/services/follow.ts";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {addUsersToGroup, getParticipants} from "@/services/message.ts";
import {showAlertOnLeft} from "@/utils/common.ts";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


const AddUsersGroupModal = ({conversationId, onClose}: { conversationId: string, onClose: () => void }) => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [participants, setParticipants] = useState<Creator[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue, 500);
    const {userContext} = useUserContext();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        getParticipants(conversationId).then((res) => {
            setParticipants(res.filter((p) => p.id !== userContext.id));
        });
    }, []);

    // This effect runs whenever the searchDebounce changes
    useEffect(() => {
        setUsers([]);
        setPage(1);
    }, [searchDebounce]);

    useEffect(() => {
        if (searchDebounce && searchDebounce.trim().length) {
            fetchFollowers(searchDebounce);
        } else {
            fetchFollowers(null);
        }
    }, [page, searchDebounce]);


    const handleSelectUser = (user: User) => {
        setSelectedUsers((prev) => {
            if (prev.find((u) => u.id === user.id)) {
                return prev.filter((u) => u.id !== user.id);
            }
            return [...prev, user];
        });

    }

    const fetchFollowers = (searchTerm: string | null) => {
        const fetchFollowings = searchTerm
            ? searchUserFollowing(userContext.id, searchTerm, page, PAGE_SIZE_USER_FOLLOW)
            : getFollowings(userContext.id, page, PAGE_SIZE_USER_FOLLOW);

        fetchFollowings.then((res: User[]) => {
            setUsers((prev) => [...prev, ...res]);
            res.length < PAGE_SIZE_USER_FOLLOW ? setHasMore(false) : setHasMore(true);
        }).catch(() => {
            setHasMore(false);
        });

    };

    const renderUsers = () => {
        return users.map((user, index) => {
            const isChecked = selectedUsers.some((u) => u.id === user.id) ||
                participants.some((u) => u.id === user.id);
            const isUserInParticipants = participants.some((u) => u.id === user.id);
            return <CheckboxUser key={user.id} user={user}
                                 onClick={!isUserInParticipants ? handleSelectUser : undefined}
                                 isChecked={isChecked}
            />
        });
    }

    const addToGroup = async () => {
        setIsAdding(true);
        if(submitBtnRef.current) submitBtnRef.current.disabled = true;
        if(cancelBtnRef.current) cancelBtnRef.current.disabled = true;

        addUsersToGroup(conversationId, selectedUsers.map((u) => u.id)).then(() => {
             showAlertOnLeft('success', 'Thêm thành viên vào nhóm thành công!').then(() => {
                onClose();
             });
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                switch (status) {
                    case 400:
                        return showAlertOnLeft('error', 'Yêu cầu không hợp lệ!');
                    case 403:
                        return showAlertOnLeft('error', 'Không có quyền thêm thành viên vào nhóm!');
                    case 404:
                        return showAlertOnLeft('error', 'Nhóm không tồn tại!');
                    default:
                        return showAlertOnLeft('error', 'Đã xảy ra lỗi!');
                }
            }
        }).finally(() => {
            setIsAdding(false);
            if(submitBtnRef.current) submitBtnRef.current.disabled = false;
            if(cancelBtnRef.current) cancelBtnRef.current.disabled = false;
        })
    }


    if (!conversationId || !participants.length) {
        return <Loader/>;
    }


    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <div
                className="w-full max-w-xl rounded-lg bg-dark-3 shadow-lg">
                {/* Header */}
                <div className="border-b p-4">
                    <h2 className="text-lg font-semibold">Thêm thành viên</h2>
                </div>

                {/* Body */}
                <div className="p-4">
                    {/* Nhập thành viên */}
                    <div className="relative mb-4">
                        <div className="relative gap-1 rounded-lg bg-dark-4">
                            <img className='absolute top-[8px] ml-2'
                                 src="/assets/icons/search.svg"
                                 width={24}
                                 height={24}
                                 alt="search"
                            />
                            <Input type="text" placeholder="Nhập biệt danh..."
                                   className="border-none bg-dark-4 ps-11 placeholder:text-light-4"
                                   value={searchValue}
                                   maxLength={20}
                                   onChange={(e) => {
                                       setSearchValue(e.target.value);
                                   }}
                            />
                        </div>
                    </div>


                    {/* Danh sách thành viên */}
                    <div className='flex h-80 gap-2 '>
                        <div className="custom-scrollbar flex-1 overflow-y-auto border-r border-gray-600" id="userScrollable">
                            <InfiniteScroll
                                dataLength={users.length}
                                next={() => setPage((prev) => prev + 1)}
                                hasMore={hasMore}
                                loader={<Loader/>}
                                scrollableTarget="userScrollable"
                                style={{overflow: "hidden"}}
                            >
                                {renderUsers()}
                            </InfiniteScroll>
                        </div>
                        <div className='custom-scrollbar flex-1 overflow-y-auto'>
                            {selectedUsers.map((user) => (
                                <div className='mb-4 flex items-center justify-between' key={user.id}>
                                    <UserItem user={user}/>
                                    <button type={"button"}>
                                        <IoIosCloseCircleOutline size={25}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t p-4">
                    <button className="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
                            ref={cancelBtnRef}
                            onClick={onClose}
                    >
                        Hủy
                    </button>
                    <Button
                        onClick={addToGroup}
                        ref={submitBtnRef}
                        className="shad-button_primary whitespace-nowrap"
                    >
                        {isAdding ? <Loader/> : 'Thêm'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddUsersGroupModal;