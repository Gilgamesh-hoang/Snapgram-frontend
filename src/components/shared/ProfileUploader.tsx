import {useCallback, useState} from "react";
import {FileWithPath, useDropzone} from "react-dropzone";

import {convertFileToUrl} from "@/utils";

type ProfileUploaderProps = {
    fieldChange: (files: File) => void;
    mediaUrl: string;
};

const ProfileUploader = ({fieldChange, mediaUrl}: ProfileUploaderProps) => {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    const handleFiles = (file: FileWithPath): string | null => {
        // get file's size
        const fileSize: number = file.size;
        // get the file type
        const fileType = file.type.split('/')[0];

        if (fileType === 'image' && fileSize < 10000000) {
            return convertFileToUrl(file);
        }
        return null;
    }

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            const url = handleFiles(acceptedFiles[0]);
            if (url === null) {
            //     toast
            } else {
                setFile(acceptedFiles[0]);
                fieldChange(acceptedFiles[0]);
                setFileUrl(url);
            }
        },
        [file]
    );

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
        multiple: false,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className="cursor-pointer"/>

            <div className="flex-center cursor-pointer gap-4">
                <img
                    src={fileUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="image"
                    className="size-24 rounded-full object-cover object-top"
                />
                <p className="small-regular md:base-semibold text-primary-500">
                    Đổi ảnh đại diện
                </p>
            </div>
        </div>
    );
};

export default ProfileUploader;
