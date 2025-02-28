import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConservationType, MessageResponse} from "@/model/type.ts";
import {getMessages} from "@/services/message.ts";
import {PAGE_SIZE_SIDE_MESSAGE_PANEL} from "@/constants";

export interface MessageState {
    messages: Record<string, MessageResponse[]>; // Lưu tin nhắn theo id cuộc trò chuyện
    page: Record<string, number>; // Lưu trang hiện tại của từng cuộc trò chuyện
    isLoading: boolean;
    hasMore: Record<string, boolean>; // Lưu trạng thái hasMore của từng cuộc trò chuyện
}

const initialState: MessageState = {
    messages: {},
    page: {},
    isLoading: false,
    hasMore: {},
};

// Action async để lấy tin nhắn
export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async ({id, type, page}: { id: string; type: ConservationType; page: number }) => {
        const response = await getMessages(id, type, page, PAGE_SIZE_SIDE_MESSAGE_PANEL);
        return {id, messages: response, page};
    }
);

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        // addNewMessage: (state, action: PayloadAction<{ id: string; message: MessageResponse }>) => {
        //     const { id, message } = action.payload;
        //     state.messages[id] = [...(state.messages[id] || []), message]; // Tạo mảng mới
        // },
        addNewMessage: (state, action: PayloadAction<{ id: string; message: MessageResponse }>) => {
            const {id, message} = action.payload;
            state.messages[id] = [message, ...(state.messages[id] || [])]; // Thêm tin nhắn mới vào đầu mảng
        },
        setPage: (state, action: PayloadAction<{ id: string; page: number }>) => {
            const {id, page} = action.payload;
            state.page[id] = page;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const {id, messages, page} = action.payload;

                console.log(`Fetched page: ${page} for conversation: ${id}, Messages count: ${messages.length}`);

                // Nếu page = 1, reset tin nhắn cũ, nếu page > 1 thì append vào
                state.messages[id] = page === 1 ? messages : [...(state.messages[id] || []), ...messages];
                // state.page[id] = page;
                // Chỉ tăng page nếu còn tin nhắn để tải
                // if (messages.length > 0) {
                //     state.page[id] = page;  // Cập nhật page chính xác
                // }
                state.hasMore[id] = messages.length === PAGE_SIZE_SIDE_MESSAGE_PANEL; // Nếu không có tin nhắn mới, dừng fetch
                state.isLoading = false;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {addNewMessage,setPage} = messageSlice.actions;
export default messageSlice.reducer;
