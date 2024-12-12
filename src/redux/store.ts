import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import timelineReducer from './timelineSlice';
const store = configureStore({
    reducer: {
        post: postReducer,
        timeline: timelineReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
