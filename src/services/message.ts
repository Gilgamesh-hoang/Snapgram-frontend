import {httpGet, httpPost} from "@/utils/httpRequest.ts";
import {
    ApiResponse,
    CloudinaryMedia,
    ConservationInfo,
    ConservationType,
    MessageResponse,
    User
} from "@/model/type.ts";

export const createGroupMessage = async (name: string, participantIds: string[], avatar: CloudinaryMedia | null) => {
    return await httpPost<ApiResponse<ConservationInfo>>(`/messages/conversations/group`, {
        name, participantIds, avatar
    }).then(response => {
        return response.data;
    });

}

export const addUsersToGroup = async (conversationId: string, participantIds: string[]) => {
    return await httpPost<ApiResponse<ConservationInfo>>(`/messages/conversations/groups/participants`, {
        conversationId, participantIds
    }).then(response => {
        return response.data;
    });

}

export const getParticipants = async (conversationId:string) => {
    return await httpGet<ApiResponse<User[]>>('/messages/conversations/participants', {
        params: {
            conversationId
        }
    }).then(response => {
        return response.data;
    });
}

export const getAllConservations = async (pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<MessageResponse[]>>(`/messages/conversations`, {
        params: {
            pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
}

export const getConservationInfo = async (conversationId: string, type: ConservationType) => {
    return await httpGet<ApiResponse<ConservationInfo>>(`/messages/conversations/info`, {
        params: {
            conversationId, type
        }
    }).then(response => {
        return response.data;
    });
}

export const getMessages = async (conversationId: string, type: ConservationType, pageNum: number, pageSize: number) => {
    return await httpGet<ApiResponse<MessageResponse[]>>(`/messages`, {
        params: {
            conversationId, type, pageNum, pageSize
        }
    }).then(response => {
        return response.data;
    });
}

export const markAsReadMessage = async (conversationId: string) => {
    return await httpGet<ApiResponse<boolean>>(`/messages/mark-as-read`, {
        params: {
            conversationId
        }
    }).then(response => {
        return response.data;
    });
}

export const countUnreadMessages = async () => {
    return await httpGet<ApiResponse<number>>(`/messages/unread-count`).then(response => {
        return response.data;
    });
}