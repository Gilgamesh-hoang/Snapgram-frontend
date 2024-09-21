import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
            const {postId, count} = action.payload;
            state.commentCounts[postId] = count;  // Cập nhật commentCount cho post cụ thể
        },
        incrementCommentCount: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            state.commentCounts[postId] = (state.commentCounts[postId] || 0) + 1;
        },
        decrementCommentCount: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            const count = (state.commentCounts[postId] || 0) - 1;
            state.commentCounts[postId] = count < 0 ? 0 : count;
        },
        adjustCommentCount: (state, action: PayloadAction<{ postId: string; adjustment: number }>) => {
            const { postId, adjustment } = action.payload;
            const currentCount = state.commentCounts[postId] || 0;
            const newCount = currentCount + adjustment;
            state.commentCounts[postId] = newCount < 0 ? 0 : newCount;
        },
        updateCommentCount: (state, action: PayloadAction<{ postId: string; count: number }>) => {
            const {postId, count} = action.payload;
            state.commentCounts[postId] = count;
        }
    }
});

// Export các actions
export const {setCommentCount, incrementCommentCount,adjustCommentCount, decrementCommentCount, updateCommentCount} = postSlice.actions;

// Export reducer
export default postSlice.reducer;
