import {ConservationInfo, User} from "@/model/type.ts";
import React, {useEffect, useState} from "react";
import {getParticipants} from "@/services/message.ts";
import {MdOutlineClose} from "react-icons/md";
import {clsx} from "clsx";
import UserItem from "@/components/message/groupForm/UserItem.tsx";
import {HiDotsVertical} from "react-icons/hi";

const MemberModal = ({conversationInfo, onClose}: { conversationInfo: ConservationInfo, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<"all" | "admin">("all");
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        if (activeTab === "admin") {
            setMembers(conversationInfo.owner ? [conversationInfo.owner] : []);
        }else {
            getParticipants(conversationInfo.id).then((response) => {
                setMembers(response);
            });
        }
    }, [activeTab])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
            <div className="w-full max-w-96 rounded-lg bg-dark-3 shadow-lg ">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">Thành viên</h2>
                    <button
                        className=""
                        onClick={onClose}
                    >
                        <MdOutlineClose size={25}/>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex justify-center border-b">
                    <button
                        className={clsx("base-regular w-1/2 py-2 text-center ", {
                            "border-b-2 border-primary-600": activeTab === "all"
                        })}
                        onClick={() => setActiveTab("all")}
                    >
                        Tất cả
                    </button>
                    <button
                        className={clsx("base-regular w-1/2 py-2 text-center ", {
                            "border-b-2 border-primary-600": activeTab === "admin"
                        })}
                        onClick={() => setActiveTab("admin")}
                    >
                        Quản trị viên
                    </button>
                </div>

                {/* Member List */}
                <div className="custom-scrollbar h-96 overflow-y-auto ">
                    <div className='p-4 '>
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2"
                            >
                                <UserItem user={member}/>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <HiDotsVertical/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MemberModal;