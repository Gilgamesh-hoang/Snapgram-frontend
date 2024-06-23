import React, {useState} from 'react';
import {FaImage} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {MdOutlinePermMedia} from "react-icons/md";

interface FileUploadProps {
    setSelectedFile: React.Dispatch<React.SetStateAction<{ isImage: boolean; file: File } | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({setSelectedFile}) => {
    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);

    const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>, isImage: boolean) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if the file size is under the limit (10MB). If not, show an error message and exit the function.
        if (!checkFileSize(file, 10)) {
            toast.error('The file is too large, please choose a file under 10MB', {
                duration: 3000,
            });
            return;
        }

        // Get the type of the file.
        const fileType = file.type.split('/')[0];
        // If the file type matches the expected type (image or video), set it as the selected file and close the upload dialog.
        // If the file type does not match, show an error message.
        if ((fileType === 'image' && isImage) || (fileType === 'video' && !isImage)) {
            setSelectedFile({isImage, file});
            setOpenImageVideoUpload(false);
        } else {
            toast.error(`Incorrect ${isImage ? 'image' : 'video'} format`, {
                duration: 3000,
            });
        }
    };

    const handleShowImg = (e: React.ChangeEvent<HTMLInputElement>) => handleFileSelection(e, true);
    const handleShowVideo = (e: React.ChangeEvent<HTMLInputElement>) => handleFileSelection(e, false);
    const checkFileSize = (file: File, size: number): boolean => {
        return file.size / 1024 / 1024 < size;
    };

    return (
        <div className="">
            <form>
                <label htmlFor="uploadImage" title={'Upload Image/Video'}
                       className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-primary-500 hover:text-white">
                    <MdOutlinePermMedia size={20}/>
                </label>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.mp4,.avi,.mov,.wmv,.mkv"
                    id="uploadImage"
                    className="hidden"
                    onChange={handleShowImg}
                />
            </form>
        </div>
    );
};

export default FileUpload;