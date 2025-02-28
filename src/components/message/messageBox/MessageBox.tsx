import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {HiDotsVertical} from "react-icons/hi";
import Avatar from "@/components/shared/Avatar.tsx";
import {ConservationInfo} from "@/model/type.ts";
import {routes} from "@/route";
import {isUUID} from "@/utils/common.ts";
import {getConservationInfo} from "@/services/message.ts";
import MessagesPanel from "@/components/message/messageBox/MessagesPanel.tsx";
import {Loader} from "@/components/shared";
import MessageForm from "@/components/message/messageBox/MessageForm.tsx";
import {getUserById} from "@/services/user.ts";
import {HiOutlineUserPlus} from "react-icons/hi2";
import AddUsersGroupModal from "@/components/message/messageBox/AddUsersGroupModal.tsx";
import MemberModal from "@/components/message/messageBox/MemberModal.tsx";
import {useUserContext} from "@/context/AuthContext.tsx";


const MessageBox = () => {
    const [userOnline, setUserOnline] = useState<boolean>(true);
    const [showAddUsersModal, setShowAddUsersModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const {userContext} = useUserContext();
    const {type, conservationId} = useParams();
    const navigation = useNavigate();
    const [conversationInfo, setConversationInfo] = useState<ConservationInfo>();
    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");

    useEffect(() => {
        if (type !== 'g' && type !== 'u') {
            navigation(routes.home);
        }

        if (!conservationId || !isUUID(conservationId)) {
            navigation(routes.home);
            return;
        }

        if (action === 'new') {
            getUserById(conservationId).then((response) => {
                setConversationInfo({
                    id: response.id,
                    name: response.nickname,
                    type: 'USER',
                    avatar: response.avatarUrl
                });
            });
        } else {
            if (type === 'u') {
                getConservationInfo(conservationId, 'USER').then((response) => {
                    setConversationInfo(response);
                })
            } else {
                getConservationInfo(conservationId, 'GROUP').then((response) => {
                    setConversationInfo(response);
                })
            }

        }

    }, [conservationId, type]);

    if (!conversationInfo) {
        return <Loader/>;
    }

    return (
        <div className="rounded-xl bg-dark-3 ">
            <header className="sticky flex items-center justify-between px-5 py-3">
                <div className="flex cursor-pointer items-center rounded-xl px-2.5 hover:bg-dark-4">
                    <Link to={'/'} className="lg:hidden">
                        <FaAngleLeft size={25}/>
                    </Link>
                    <div className='flex items-center justify-between' onClick={() => setShowMembersModal(true)}>
                        <div className='mr-4'>
                            <Avatar
                                imageUrl={conversationInfo.avatar}
                                style={'size-12'}
                                name={conversationInfo.name || ''}
                            />
                        </div>
                        <div className='flex flex-col '>
                            <h3 className="line-clamp-1 text-ellipsis text-lg font-semibold">{conversationInfo.name}</h3>
                            <p className="my-2 text-sm">
                                {
                                    userOnline ? <span className="">online</span> :
                                        <span className="text-slate-400">offline</span>
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2'>
                    {conversationInfo.type === 'GROUP' && conversationInfo?.owner?.id === userContext.id &&
                        <button className='p-2.5' onClick={() => setShowAddUsersModal(!showAddUsersModal)}>
                        <HiOutlineUserPlus size={18}/>
                    </button>
                    }

                    <button className='p-2.5'>
                        <HiDotsVertical/>
                    </button>

                </div>
            </header>
            <hr className='mx-5 mb-6 h-px border-none bg-light-4'/>

            {/***show all messages */}
            <MessagesPanel info={conversationInfo}/>

            {/**send a message */}
            <MessageForm info={conversationInfo}/>

            {showAddUsersModal &&
                <AddUsersGroupModal conversationId={conversationInfo.id} onClose={() => setShowAddUsersModal(false)}/>}

            {showMembersModal &&
                <MemberModal conversationInfo={conversationInfo} onClose={() => setShowMembersModal(false)}/>}
        </div>
    );
}


export default MessageBox;