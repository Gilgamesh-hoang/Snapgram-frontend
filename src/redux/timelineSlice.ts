import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Post} from "@/model/type.ts";
import {PAGE_SIZE_TIMELINE} from "@/constants";
import {getTimeline} from "@/services/timeline.ts";
import {checkSaved} from "@/services/savePost.ts";
import {checkLikedPost} from "@/services/post.ts";

interface PostState {
    posts: Post[];
    hasMore: boolean;
    isLoading: boolean;
    savedIds: string[];
    likedIds: string[];
}

const initialState: PostState = {
    posts: [],
    hasMore: true,
    isLoading: false,
    savedIds: [],
    likedIds: [],
};
export const fetchTimelines = createAsyncThunk(
    'fetchTimelines',
    async (page: number, {getState}: any) => {

        const timelinePosts = await getTimeline(page, PAGE_SIZE_TIMELINE);
        const postIds = timelinePosts.map(post => post.id);

        const [savedIds, likedIds] = await Promise.all([
            checkSaved(postIds),
            checkLikedPost(postIds),
        ]);

        return {
            timelinePosts,
            savedIds,
            likedIds,
        };
    }
);

// Slice definition
const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        dummyAction(state) {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimelines.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTimelines.fulfilled, (state, action) => {
                if (action.payload) {
                    const {timelinePosts, savedIds, likedIds} = action.payload;
                    state.posts = [...state.posts, ...timelinePosts];
                    state.savedIds = [...state.savedIds, ...savedIds];
                    state.likedIds = [...state.likedIds, ...likedIds];

                    if (timelinePosts.length < PAGE_SIZE_TIMELINE) {
                        state.hasMore = false;
                    }
                }
                state.isLoading = false;
            })
            .addCase(fetchTimelines.rejected, (state) => {
                state.isLoading = false;
                state.hasMore = false;
            });
    },
});

export const {dummyAction} = timelineSlice.actions;
export default timelineSlice.reducer;