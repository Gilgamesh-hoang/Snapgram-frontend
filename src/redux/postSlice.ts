import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho slice
interface PostState {
    commentCounts: { [postId: string]: number };  // Lưu commentCount cho mỗi post
}

const initialState: PostState = {
    commentCounts: {}
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setCommentCount: (state, action: PayloadAction<{ postId: string; count: number }>) => {
            const { postId, count } = action.payload;
            state.commentCounts[postId] = count;  // Cập nhật commentCount cho post cụ thể
        },
        incrementCommentCount: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            state.commentCounts[postId] = (state.commentCounts[postId] || 0) + 1;
        },
        updateCommentCount: (state, action: PayloadAction<{ postId: string; count: number }>) => {
            const { postId, count } = action.payload;
            state.commentCounts[postId] = count;
        }
    }
});

// Export các actions
export const { setCommentCount, incrementCommentCount,updateCommentCount } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
