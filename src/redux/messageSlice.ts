import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConservationType, MessageResponse} from "@/model/type.ts";
import {getMessages} from "@/services/message.ts";
import {PAGE_SIZE_SIDE_MESSAGE_PANEL} from "@/constants";

interface Message {
    messages: MessageResponse[]; // Lưu tin nhắn theo id cuộc trò chuyện
    page: number; // Lưu trang hiện tại của từng cuộc trò chuyện
    hasMore: boolean; // Lưu trạng thái hasMore của từng cuộc trò chuyện
    isLoading: boolean;
}

export interface MessageState {
    messages: Record<string, Message>; // Lưu tin nhắn theo id cuộc trò chuyện
}

const initialState: MessageState = {
    messages: {},
};

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async ({ id, type }: { id: string; type: ConservationType }, { getState }) => {
        const state = getState() as { messages: MessageState };
        const page = state.messages.messages[id]?.page || 1; // Lấy page từ state, mặc định là 1
        const response = await getMessages(id, type, page, PAGE_SIZE_SIDE_MESSAGE_PANEL);
        return { id, messages: response, page };
    }
);

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addNewMessage: (state, action: PayloadAction<{ id: string; message: MessageResponse }>) => {
            const { id, message } = action.payload;
            // Khởi tạo Message nếu chưa tồn tại
            if (!state.messages[id]) {
                state.messages[id] = { messages: [], page: 1, hasMore: true, isLoading: false };
            }
            // Thêm tin nhắn mới vào đầu mảng
            state.messages[id].messages = [message, ...state.messages[id].messages];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                const { id } = action.meta.arg;
                // Khởi tạo Message nếu chưa tồn tại
                if (!state.messages[id]) {
                    state.messages[id] = { messages: [], page: 1, hasMore: true, isLoading: false };
                }
                state.messages[id].isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { id, messages, page } = action.payload;

                // Khởi tạo Message nếu chưa tồn tại
                if (!state.messages[id]) {
                    state.messages[id] = { messages: [], page: 1, hasMore: true, isLoading: false };
                }

                // Nếu page = 1, reset tin nhắn cũ, nếu page > 1 thì append vào
                state.messages[id].messages = page === 1 ? messages : [...state.messages[id].messages, ...messages];
                state.messages[id].page = page + 1; // Tăng page để chuẩn bị cho lần fetch tiếp theo
                state.messages[id].hasMore = messages.length === PAGE_SIZE_SIDE_MESSAGE_PANEL; // Cập nhật hasMore
                state.messages[id].isLoading = false; // Đặt isLoading về false
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                const { id } = action.meta.arg;
                if (state.messages[id]) {
                    state.messages[id].isLoading = false; // Đặt isLoading về false cho conversation
                }
            });
    },
});

export const {addNewMessage} = messageSlice.actions;
export default messageSlice.reducer;
