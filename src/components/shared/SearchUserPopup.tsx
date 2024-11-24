import React, {useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import SingleImageUploader from "@/components/shared/SingleImageUploader.tsx";
import {Button} from "@/components/ui";
import {Loader} from "@/components/shared/index.tsx";
import uploadFiles from "@/services/uploadFiles.ts";

function SearchUserPopup({isOpen, onClose}) {
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
        console.log('files', file);
    }
    
    const searchUser = () => {
        if (isLoading || !file) return;
        
        setIsLoading(true)

        uploadFiles([file]).then((res) => {
            console.log('res', res);
        }).catch((error) => {
            console.error('error', error)
        }).finally(() => {
            setIsLoading(false)
        })
        
    }
    
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
                            <Button onClick={searchUser}
                                type="button"
                                className="shad-button_dark_4">
                                
                                {isLoading ? (
                                    <div className="flex-center gap-2">
                                        <Loader/> Loading...
                                    </div>
                                ) : (
                                    'Tìm kiếm'
                                )}
                            </Button>
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default SearchUserPopup;