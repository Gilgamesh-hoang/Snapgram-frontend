import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';  // Import reducer từ slice

const store = configureStore({
    reducer: {
        post: postReducer,  // Thêm reducer vào store
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
