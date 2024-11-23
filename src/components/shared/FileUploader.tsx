import {Dispatch, FC, SetStateAction, useCallback, useState} from "react";
import {FileWithPath, useDropzone} from "react-dropzone";

import {Button} from "@/components/ui";
import {Carousel} from "@/components/shared";
import {convertFileToUrl} from "@/utils/common.ts";
import {MediaUrl} from "@/model/type.ts";

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: MediaUrl[];
    setRemoveMedia?: Dispatch<SetStateAction<string[]>>;
};

const FileUploader: FC<FileUploaderProps> = ({fieldChange, mediaUrl,setRemoveMedia }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<MediaUrl[]>(mediaUrl);

    const handleFiles = (files: FileWithPath[]): MediaUrl[] => {
        let urls: MediaUrl[] = [...fileUrl];
        for (const file of files) {
            const mediaUrl: MediaUrl = {
                id: '',
                type: 'IMAGE',
                url: '',
            };

            // get file's size
            const fileSize: number = file.size;
            // get the file type
            const fileType = file.type.split('/')[0];

            if (fileType === 'image') {
                mediaUrl.type = 'IMAGE';
                if (fileSize > 10000000) {
                    continue;
                }
            } else if (fileType === 'video') {
                mediaUrl.type = 'VIDEO';
                if (fileSize > 20000000) {
                    continue;
                }
            }
            mediaUrl.url = convertFileToUrl(file);
            urls = [...urls, mediaUrl]
        }
        return urls;
    }

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFiles(acceptedFiles);
            fieldChange(acceptedFiles);
            const urls: MediaUrl[] = handleFiles(acceptedFiles);
            setFileUrl(urls);
        },
        [files]
    );

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg", "webp"],
            "video/*": [".mp4"],
        },
        multiple: true,
    });
    const rootProps = fileUrl && fileUrl.length > 0 ? {} : getRootProps();

    function removeItem(itemIndex: number): void {
        const removedItem = fileUrl[itemIndex];
        if (removedItem.id && setRemoveMedia) {
            setRemoveMedia(prev => [...prev, removedItem.id]);
        }

        setFileUrl(fileUrl.filter((value, index) => index !== itemIndex));
        setFiles(files.filter((value, index) => index !== itemIndex));
    }

    return (
        <div
            {...rootProps}
            className="flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3">
            <input {...getInputProps()} className="cursor-pointer"/>

            {fileUrl && fileUrl.length > 0 ? (
                <>
                    <div className="flex w-full flex-1 justify-center p-5 lg:p-10">
                        <Carousel sources={fileUrl} callback={removeItem} isShowClose={true}/>
                    </div>
                    <p className="file_uploader-label" {...getRootProps()}>Nhấn vào để thêm ảnh / video</p>
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
                    <p className="small-regular mb-6 text-light-4">SVG, PNG, JPG, MP4</p>

                    <Button type="button" className="shad-button_dark_4">
                        Chọn từ máy tính
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
