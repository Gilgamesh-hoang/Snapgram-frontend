import React, {Dispatch, FC, SetStateAction, useCallback, useState} from "react";
import {FileWithPath, useDropzone} from "react-dropzone";

import {Button} from "@/components/ui";
import {Carousel} from "@/components/shared";
import {convertFileToUrl} from "@/utils/common.ts";
import {MediaUrl} from "@/model/type.ts";
import {clsx} from "clsx";

type FileUploaderProps = {
    fieldChange: (file: File | null) => void;
    // mediaUrl: MediaUrl | null;
};

const SingleImageUploader: FC<FileUploaderProps> = ({fieldChange}) => {
    const [image, setImage] = useState<File | null>();
    const [fileUrl, setFileUrl] = useState<MediaUrl| null>(null);

    const handleFiles = (file: FileWithPath): MediaUrl | null => {
        const mediaUrl: MediaUrl = {
            id: '',
            type: 'IMAGE',
            url: '',
        };

        // get file's size
        const fileSize: number = file.size;
        // get the file type
        const fileType = file.type.split('/')[0];

        if (fileType !== 'image') {
            return null;
        }
        if (fileSize > 10000000) {
            return null;
        }
        mediaUrl.url = convertFileToUrl(file);
        return mediaUrl;
    }

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setImage(acceptedFiles[0]);
            fieldChange(acceptedFiles[0]);
            const url: MediaUrl | null = handleFiles(acceptedFiles[0]);
            if (url) {
                setFileUrl(url);
            }

        },
        [image]
    );

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg", ".webp"]
        },
        multiple: false,
    });
    const rootProps = fileUrl ? {} : getRootProps();

    function removeItem(itemIndex: number): void {
        setFileUrl(null);
        setImage(null);
        fieldChange(null);
    }

    return (
        <div
            {...rootProps}
            className="flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3">
            <input {...getInputProps()} className="cursor-pointer"/>

            {fileUrl ? (
                <>
                    <div className="flex w-full flex-1 justify-center p-5">
                        <Carousel sources={[fileUrl]} callback={removeItem} isShowClose={true}/>
                    </div>
                    {/*<p className="file_uploader-label" {...getRootProps()}>Nhấn vào để thêm ảnh / video</p>*/}
                </>
            ) : (
                <div className="file_uploader-box ">
                    <img
                        src="/assets/icons/file-upload.svg"
                        width={96}
                        height={77}
                        alt="file upload"
                    />

                    <h3 className="base-medium mb-2 mt-6 text-light-2">
                        Thả ảnh vào đây
                    </h3>
                    <p className="base-regular mb-6 text-light-4">Lưu ý ảnh chỉ nên chứa nhiều nhất 4 khuôn mặt</p>

                    <Button type="button" className="shad-button_dark_4">
                        Chọn từ máy tính
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SingleImageUploader;
