import {FaCamera} from "react-icons/fa";
import {Button, Form, FormControl, FormField, FormItem, FormMessage, Input} from "@/components/ui";
import React, {useEffect, useRef, useState} from "react";
import CheckboxUser from "@/components/message/groupForm/CheckboxUser.tsx";
import UserItem from "@/components/message/groupForm/UserItem.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {GroupFormValidation} from "@/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import Avatar from "@/components/shared/Avatar.tsx";
import {CloudinaryMedia, User} from "@/model/type.ts";
import {generateMessageLink, showAlert} from "@/utils/common.ts";
import {createGroupMessage} from "@/services/message.ts";
import {searchUserFollowing} from "@/services/search.ts";
import {PAGE_SIZE_USER_FOLLOW} from "@/constants";
import useDebounce from "@/hooks/useDebounce.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {Loader} from "@/components/shared";
import InfiniteScroll from "@/components/shared/InfiniteScroll.tsx";
import {getFollowings} from "@/services/follow.ts";
import {IoIosCloseCircleOutline} from "react-icons/io";
import uploadFiles from "@/services/uploadFiles.ts";


const CreateGroupModal = ({onClose}: { onClose: () => void }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue, 500);
    const {userContext} = useUserContext();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);


    // This effect runs whenever the searchDebounce changes
    useEffect(() => {
        setUsers([]);
        setPage(1);
    }, [searchDebounce]);

    useEffect(() => {
        if (searchDebounce && searchDebounce.trim().length) {
            showFollowers(searchDebounce);
        } else {
            showFollowers(null);
        }
    }, [page, searchDebounce]);

    const form = useForm<z.infer<typeof GroupFormValidation>>({
        resolver: zodResolver(GroupFormValidation),
        defaultValues: {
            name: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof GroupFormValidation>) => {
        if (selectedUsers.length < 2) {
            showAlert("error", "Nhóm phải có ít nhất 3 thành viên")
            return;
        }

        setIsCreating(true);
        if (cancelBtnRef.current) cancelBtnRef.current.disabled = true;
        if (submitBtnRef.current) submitBtnRef.current.disabled = true;


        let avatar: CloudinaryMedia | null = null;
        if (image) {
            await uploadFiles([image]).then((res) => {
                avatar = res[0];
            });
        }
        // call api
        await createGroupMessage(data.name, selectedUsers.map((user) => user.id), avatar)
            .then((res) => {
                showAlert("success", "Tạo nhóm thành công");
                setTimeout(() => {
                    window.location.href = generateMessageLink('g', res.id);
                }, 1500);
            }).catch(() => {
                showAlert("error", "Tạo nhóm thất bại");
            });
        setIsCreating(false);
        if (cancelBtnRef.current) cancelBtnRef.current.disabled = false;
        if (submitBtnRef.current) submitBtnRef.current.disabled = false;
    };

    // Xử lý khi chọn ảnh
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
            setImage(file);
            setShowOptions(false); // Ẩn menu khi đổi ảnh
        }
    };

    // Khi click vào ảnh, hiển thị menu tùy chọn
    const handleImageClick = () => {
        setShowOptions(!showOptions);
    };

    // Khi click vào "Đổi ảnh", mở cửa sổ chọn file
    const handleChangeImage = () => {
        fileInputRef.current?.click();
    };

    // Khi click vào "Xóa ảnh", reset về ban đầu
    const handleRemoveImage = () => {
        setImageUrl(null);
        setImage(null);
        setShowOptions(false);
    };

    const handleSelectUser = (user: User) => {
        setSelectedUsers((prev) => {
            if (prev.find((u) => u.id === user.id)) {
                return prev.filter((u) => u.id !== user.id);
            }
            return [...prev, user];
        });

    }

    const showFollowers = (searchTerm: string | null) => {
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

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                      className="w-full max-w-xl rounded-lg bg-dark-3 shadow-lg">
                    {/* Header */}
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">Tạo nhóm</h2>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        {/* Nhập tên nhóm */}
                        <div className="mb-4 flex items-center gap-3">
                            <div className="relative">
                                {imageUrl ? (
                                    <div className="relative">
                                        <div onClick={handleImageClick}>
                                            <Avatar imageUrl={imageUrl} name="Avatar" style="size-14 cursor-pointer"/>
                                        </div>

                                        {showOptions && (
                                            <div
                                                className="absolute left-12 top-[3.8rem] z-50 w-28 -translate-x-1/2 rounded-lg border-2 border-gray-700 bg-dark-4 shadow-md">
                                                <button type="button"
                                                        className="w-full rounded-lg p-3 hover:bg-gray-900"
                                                        onClick={handleRemoveImage}
                                                >
                                                    <span className="base-regular text-center">Xóa ảnh</span>
                                                </button>
                                                <hr className="border-gray-600"/>
                                                <button type={"button"}
                                                        className="w-full rounded-lg p-3 hover:bg-gray-900"
                                                        onClick={handleChangeImage}
                                                >
                                                    <span>Đổi ảnh</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div onClick={() => fileInputRef.current?.click()}
                                         className="flex size-14 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gray-100">
                                        <FaCamera className="size-6 text-gray-600"/>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input type="text" placeholder="Nhập tên nhóm..."
                                                   className="border-none bg-dark-4 placeholder:text-light-4 " {...field}/>
                                        </FormControl>
                                        <FormMessage className='error-message'/>
                                    </FormItem>
                                )}
                            />
                        </div>

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
                            <div className="custom-scrollbar flex-1 overflow-y-auto border-r border-gray-600">
                                <InfiniteScroll
                                    loader={<Loader/>}
                                    fetchMore={() => setPage((prev) => prev + 1)}
                                    hasMore={hasMore}
                                >
                                    {users.map((user, index) => (
                                        <CheckboxUser key={user.id} user={user} onClick={handleSelectUser}
                                                      isChecked={!!selectedUsers.find((u) => u.id === user.id)}
                                        />
                                    ))}
                                </InfiniteScroll>
                            </div>
                            <div className='custom-scrollbar flex-1 overflow-y-auto'>
                                {selectedUsers.map((user) => (
                                    <div className='flex justify-between items-center mb-4' key={user.id}>
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
                            type="submit"
                            ref={submitBtnRef}
                            className="shad-button_primary whitespace-nowrap"
                        >
                            {isCreating ? <Loader/> : 'Tạo nhóm'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateGroupModal;