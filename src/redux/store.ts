import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import timelineReducer from './timelineSlice';
import messagesReducer from './messageSlice';
import sidebarMessageReducer from './sidebarMessageSlice.ts';
const store = configureStore({
    reducer: {
        post: postReducer,
        timeline: timelineReducer,
        messages: messagesReducer,
        sidebarMessage: sidebarMessageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
