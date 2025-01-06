import React, {useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {Button} from "@/components/ui";
import {FileUploader, Loader} from "@/components/shared";
import {showAlert} from "@/utils/common.ts";
import uploadFiles from "@/services/uploadFiles.ts";
import {sendImagesToTrain} from "@/services/face.ts";

interface FaceUploadProps {
    onClose: () => void;
}

const FaceUploadPopup: React.FC<FaceUploadProps> = ({onClose}) => {
    const [isShowSendBtn, setIsShowSendBtn] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const filedChange = (files: File[]) => {
        console.log(files)
        if (files && files.length > 0) {
            setIsShowSendBtn(true)
            setFiles(files)
        } else {
            setIsShowSendBtn(false)
            setFiles([])
        }
    }

    const sendImages = async () => {
        if (!files || isLoading) return;

        try {
            setIsLoading(true);
            const images = await uploadFiles(files);
            await sendImagesToTrain(images);
            setIsLoading(false);
            onClose();
            showAlert('success', 'Gửi thành công.', 5000,
                'Ảnh của bạn đang được xử lý, quá trình này sẽ mất từ 1 - 2 phút');

        } catch (e) {
            handlePostError(e)
        }
    }

    const handlePostError = (error: unknown) => {
        console.error('Error:', error);
        showAlert('error', 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    };


    return (
        <>
            <div className="fixed inset-0 z-[1] flex items-center justify-center backdrop-blur">
                <div className="relative w-[800px] rounded-lg bg-dark-3 p-8 shadow-lg backdrop-filter-none">
                    <button className='absolute right-2.5 top-2.5'
                            onClick={onClose}
                    >
                        <MdOutlineClose size={25}/>
                    </button>

                    <div className="flex w-full flex-col items-center">
                        <FileUploader fieldChange={filedChange}
                                      mediaUrl={[]}
                                      acceptType="image"
                                      maxFiles={6}
                                      note={"Nên chọn ảnh chỉ chứa khuôn mặt của bạn"}
                        />
                        {isShowSendBtn &&
                            (
                                <Button onClick={sendImages}
                                        type="button"
                                        className="shad-button_dark_4 min-w-24">
                                    {isLoading ? <Loader/> : 'Gửi'}

                                </Button>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    );
}

export default FaceUploadPopup;