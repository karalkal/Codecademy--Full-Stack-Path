import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create loadCommentsForArticleId here.
const loadCommentsForArticleId = createAsyncThunk(
    'comments/loadCommentsForArticleId',
    async (userId) => {
        //payload creator
        const data = await fetch(`api/articles/${userId}/comments`);
        const json = await data.json();
        return json;
    }
)

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        /* storing comments in an object keyed by article IDs, where each article id key 
        corresponds to an array of comments belonging to that article.
        { 
            art1: ["comment1", "comment2"],
            art44: ["comment1", "comment2"],
        }
        */
        byArticleId: {},
        comments: [],
        isLoadingComments: false,
        failedToLoadComments: false,
    },
    extraReducers: {
        [loadCommentsForArticleId.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        },
        [loadCommentsForArticleId.fulfilled]: (state, action) => {
            // action.payload is a comment object with an articleId property you can use to add the comment to the correct article’s comment list in state.
            console.log(action.payload)
            state.comments = action.payload;
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
        },
        [loadCommentsForArticleId.rejected]: (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        },
    },
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
