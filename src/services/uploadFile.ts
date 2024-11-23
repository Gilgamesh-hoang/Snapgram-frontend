import axios from "axios";
import {getSignatures} from "@/services/cloudinary.ts";
import {CloudinaryMedia, CloudinarySignature} from "@/model/type.ts";

const url = import.meta.env.VITE_REACT_APP_CLOUDINARY_URL || '';
const uploadFile = async (files: File[]) => {
    if (!url ) throw new Error('Cloudinary URL or upload preset is not defined')
    if (!files.length) throw new Error('No files to upload')

    try {
        const signatures: CloudinarySignature[] = await getSignatures(files.length);
        const uploadPromises = files.map(async (file, index) => {
            const signatureObj = signatures[index];
            console.log('signatureObj', signatureObj)

            // get file type
            const fileType = file.type.split('/')[0];


            // Chuẩn bị FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', signatureObj.apiKey);
            formData.append('timestamp', signatureObj.timestamp+'');
            formData.append('folder', signatureObj.folder);
            formData.append('signature', signatureObj.signature);
            formData.append('public_id', signatureObj.publicId);
            formData.append('resource_type', fileType);


            // Gửi yêu cầu tải lên Cloudinary
            const response = await axios.post(url, formData);

            const res: CloudinaryMedia =  {
                url: response.data.secure_url,
                publicId: response.data.public_id,
                signature: response.data.signature,
                version: response.data.version,
                resourceType: response.data.resource_type,
            };
            return res
        });

        // Đợi tất cả các file được upload
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
    } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
        throw new Error("File upload failed");
    }
}

export default uploadFile