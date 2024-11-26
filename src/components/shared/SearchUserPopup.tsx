import React, {useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import SingleImageUploader from "@/components/shared/SingleImageUploader.tsx";
import {Button} from "@/components/ui";
import {Loader} from "@/components/shared/index.tsx";
import uploadFiles from "@/services/uploadFiles.ts";
import {showAlert} from "@/utils/common.ts";
import {User} from "@/model/type.ts";
import {searchUsersByImage} from "@/services/face.ts";

interface SearchUserPopupProps {
    onClose: () => void;
    callback: (users: User[]) => void;
}

const SearchUserPopup: React.FC<SearchUserPopupProps> = ({onClose, callback}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowSearchBtn, setIsShowSearchBtn] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const filedChange = (file: File | null) => {
        if (file) {
            setIsShowSearchBtn(true)
            setFile(file)
        } else {
            setIsShowSearchBtn(false)
            setFile(null)
        }
    }

    const searchUser = async () => {
        if (isLoading || !file) return;

        setIsLoading(true)

        try {
            const images = await uploadFiles([file])
            const users = await searchUsersByImage(images[0])
            callback(users)
        } catch (e) {
            handlePostError(e)
        } finally {
            setIsLoading(false)
        }

    }

    const handlePostError = (error: unknown) => {
        console.error('Error:', error);
        showAlert('error', 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    };


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
                <div className="relative w-[800px] rounded-lg bg-dark-3 p-8 shadow-lg backdrop-filter-none">
                    <button className='absolute right-2.5 top-2.5'
                            onClick={onClose}
                    >
                        <MdOutlineClose size={25}/>
                    </button>

                    <div className="flex w-full flex-col items-center">
                        <SingleImageUploader
                            fieldChange={filedChange}
                        />
                        {isShowSearchBtn &&
                            (
                                isLoading ?
                                    <div className="flex justify-center">
                                        <p className="text-light-3">
                                            <Loader className="mb-2"/> Đang tìm kiếm, quá trình này mất khoảng 20 - 30 giây...</p>
                                    </div>
                                    :
                                    <Button onClick={searchUser}
                                            type="button"
                                            className="shad-button_dark_4">
                                        Tìm kiếm
                                    </Button>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    );
}

export default SearchUserPopup;