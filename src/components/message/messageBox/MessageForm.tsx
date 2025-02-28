import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import EmojiPicker from "@/components/message/messageBox/EmojiPicker.tsx";
import {CloudinaryMedia, ConservationInfo, MessageResponse, MessageType} from "@/model/type.ts";
import uploadFiles from "@/services/uploadFiles.ts";
import {MessageRequest} from "@/model/request.ts";
import {addNewMessage} from "@/redux/messageSlice.ts";
import {useSocketContext} from "@/context/SocketContext.tsx";
import {useUserContext} from "@/context/AuthContext.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store.ts";
import {SEND_MESSAGE_EVENT} from "@/constants";
import {MdOutlinePermMedia} from "react-icons/md";
import {FileUploader, Loader} from "@/components/shared";
import {Button} from "@/components/ui";
import {useNavigate, useSearchParams} from "react-router-dom";

export interface FileUploadProps {
    isImage: boolean;
    file: File;
}

interface MessageFormProps {
    info: ConservationInfo;
}

const MessageForm: React.FC<MessageFormProps> = ({info}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [isSendingFiles, setIsSendingFiles] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const submitTextRef = useRef<HTMLButtonElement>(null);
    const submitUploadFilesRef = useRef<HTMLButtonElement>(null);
    const cancelUploadRef = useRef<HTMLButtonElement>(null);
    const {socket} = useSocketContext();
    const {userContext} = useUserContext();
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");
    const navigate = useNavigate();

    // text area auto-size
    const handleSizeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.currentTarget.rows = 1;
        const isWarpTooMuch = event.currentTarget.scrollHeight > 20 + 12 + 2;
        // const numberOfLineBreaks = (event.currentTarget.value.match(/\n/g) || []).length;
        // console.log(event.currentTarget.value)
        event.currentTarget.rows = isWarpTooMuch ? 2 : 1;
    };

    // Function used to send the message (used for both plaintext and image/video url)
    const sendMessageFunction = async (message: string, type: MessageType) => {
        if (!socket || !info) {
            console.log("socket or conversationInfo is null");
            return;
        }
        // Send the message to the server
        const request: MessageRequest = {
            senderId: userContext.id,
            content: message,
            contentType: type,
            conversationType: info.type,
        }

        if (info.id && !action) {
            request.conversationId = info.id;
        } else {
            request.recipientId = info.id;
        }

        try {
            const ackData: string = await socket.emitWithAck(SEND_MESSAGE_EVENT, request);

            if (ackData) {
                const messageResponse: MessageResponse = JSON.parse(ackData);
                dispatch(addNewMessage({id: info.id, message: messageResponse}));

                if(action === 'new') {
                    navigate(`/messages/u/${messageResponse.conversation.id}`); // Cập nhật URL
                }
            } else {
                console.error("No ACK received");
            }
        } catch (error) {
            console.error("Failed to receive ACK:", error);
        }
    };

    const handleSendText = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Get the value from the input field
        const inputValue = inputRef.current?.value.trim();

        if (!inputValue || inputValue.length > 1000) {
            return;
        }
        await sendMessageFunction(inputValue, 'TEXT');
        // Clear the input field
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.rows = 1;
        }

    };

    const handleUploadFiles = async (): Promise<CloudinaryMedia[] | null> => {
        if (selectedFiles.length === 0) {
            return null;
        }
        // Call the uploadFile function to upload the selected file and get the URL
        const uploadedFiles = await uploadFiles(selectedFiles);
        // Reset the selected file to null after the upload is complete
        setSelectedFiles([]);
        return uploadedFiles;

    };

    const handleSendFiles = async () => {
        const setRefFields = (value: boolean) => {
            if (inputRef.current) inputRef.current.disabled = value;
            if (submitTextRef.current) submitTextRef.current.disabled = value;
            if (submitUploadFilesRef.current) submitUploadFilesRef.current.disabled = value;
            if (cancelUploadRef.current) cancelUploadRef.current.disabled = value;
        }

        if (selectedFiles.length === 0) {
            setShowUploadPopup(false);
            return;
        }
        setIsSendingFiles(true);
        // Disable the input field and submit button
        setRefFields(true);

        // Upload the file and get the URL
        const files = await handleUploadFiles();
        if (files && files.length > 0) {
            files.forEach(file => {
                let type: MessageType;
                if (file.resourceType === 'image') {
                    type = 'IMAGE';
                } else if (file.resourceType === 'video') {
                    type = 'VIDEO';
                } else {
                    return;
                }
                sendMessageFunction(file.url, type)
            });
        }
        setIsSendingFiles(false);
        // Clear the input field
        setRefFields(false);
        setShowUploadPopup(false);
    }

    const handleFilesChange = (files: File[]) => {
        setSelectedFiles(files);
    }

    return (
        <section>
            <div className="mt-4 flex flex-col items-center px-4">
                <div className="relative flex w-full gap-5">
                    <div className='absolute top-[3px] flex items-center '>
                        {/*show file upload*/}
                        <div title={'Upload Image/Video'}
                             id={'upload-media'}
                             onClick={() => setShowUploadPopup(true)}
                             className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-primary-500 hover:text-white">
                            <MdOutlinePermMedia size={20}/>
                        </div>
                        {/**emoji picker */}
                        <EmojiPicker inputRef={inputRef}/>
                    </div>

                    <form onSubmit={handleSendText} className='w-full'>
                            <textarea
                                rows={1}
                                className="custom-scrollbar h-[3.2rem] w-full rounded-md border-none bg-dark-4 py-2 pl-[5.75rem] pr-12 text-sm placeholder:text-slate-500"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        if (event.shiftKey || event.altKey) {
                                            // Giữ nguyên hành vi mặc định để xuống dòng
                                            return;
                                        }
                                        // Ngăn hành vi mặc định và gửi form
                                        event.preventDefault();
                                        event.stopPropagation();
                                        submitTextRef.current?.click();
                                    }
                                }}
                                onChange={handleSizeChange}
                                ref={inputRef}
                                placeholder="Nhập tin nhắn..."
                            />
                        <button type={"submit"} className='absolute right-3 top-[15px]' ref={submitTextRef}>
                            <img
                                src={"/assets/icons/send-secondary.svg"}
                                alt="send"
                                width={20}
                                height={20}
                            />
                        </button>
                    </form>
                </div>
            </div>
            {showUploadPopup && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur ">
                    <div className="relative w-1/2 rounded-lg border-2 border-gray-600 shadow-lg">
                        <FileUploader
                            fieldChange={handleFilesChange}
                            mediaUrl={[]}
                            note={'SVG, PNG, JPG, MP4'}
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-4 ">
                        <Button
                            type="button"
                            className="shad-button_dark_4"
                            onClick={() => setShowUploadPopup(false)}
                            ref={cancelUploadRef}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="shad-button_primary whitespace-nowrap"
                            onClick={handleSendFiles}
                            ref={submitUploadFilesRef}
                        >
                            {isSendingFiles ? <Loader/> : <span>Gửi</span>}
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default MessageForm;