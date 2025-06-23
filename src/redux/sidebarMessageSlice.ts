import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageResponse} from "@/model/type.ts";
import {PAGE_SIZE_SIDE_BAR_MESSAGE} from "@/constants";
import {getAllConservations} from "@/services/message.ts";

interface SidebarState {
    lastMessages: MessageResponse[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
}

const initialState: SidebarState = {
    lastMessages: [],
    page: 1,
    hasMore: true,
    isLoading: false,
};

export const fetchLastMessages = createAsyncThunk(
    "messages/fetchLastMessages",
    async (_, {getState}) => {
        const state = getState() as { sidebarMessage: SidebarState };
        const page = state.sidebarMessage.page; // Lấy page từ state
        const response = await getAllConservations(page, PAGE_SIZE_SIDE_BAR_MESSAGE);
        // Sắp xếp response theo createdAt giảm dần
        response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return {messages: response, page};
    }
);

const sidebarMessageSlice = createSlice({
    name: "sidebarMessage",
    initialState,
    reducers: {
        addLastMessage: (state, action: PayloadAction<MessageResponse>) => {
            const newMessage = action.payload;
            const conversationId = newMessage.conversation.id;

            const existingIndex = state.lastMessages.findIndex(
                (conv) => conv.conversation.id === conversationId
            );

            if (existingIndex !== -1) {
                // Nếu đã có, đưa cuộc trò chuyện lên đầu và cập nhật tin nhắn mới nhất
                const preMessages = state.lastMessages.filter((_, idx) => idx !== existingIndex)
                const updatedConversation = [newMessage, ...preMessages];
                state.lastMessages = updatedConversation;
            } else {
                // Nếu chưa có, thêm cuộc trò chuyện mới vào đầu danh sách
                state.lastMessages = [newMessage, ...state.lastMessages];
            }
            console.log("Added new message to lastMessages:", newMessage, new Date().getTime())
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const conversationId = action.payload;
            const index = state.lastMessages.findIndex(msg => msg.conversation.id === conversationId);
            if (index !== -1) {
                // Đánh dấu tin nhắn đã đọc
                state.lastMessages[index].isRead = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLastMessages.fulfilled, (state, action) => {
                const {messages, page} = action.payload;
                // Cập nhật lastMessages với các tin nhắn từ response
                messages.forEach((msg: MessageResponse) => {
                    state.lastMessages.push(msg);
                });
                // Tăng page để chuẩn bị cho lần fetch tiếp theo
                state.page = page + 1;
                state.hasMore = messages.length === PAGE_SIZE_SIDE_BAR_MESSAGE;
                state.isLoading = false;
            })
            .addCase(fetchLastMessages.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {addLastMessage,markAsRead} = sidebarMessageSlice.actions;
export default sidebarMessageSlice.reducer;