import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import timelineReducer from './timelineSlice';
import messagesReducer from './messageSlice';
const store = configureStore({
    reducer: {
        post: postReducer,
        timeline: timelineReducer,
        messages: messagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
