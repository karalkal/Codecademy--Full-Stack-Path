import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
    'comments/loadCommentsForArticleId',
    async (articleId) => {
        //payload creator
        const data = await fetch(`api/articles/${articleId}/comments`);
        const json = await data.json();
        console.log(json)
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
        isLoadingComments: false,
        failedToLoadComments: false,
    },
    extraReducers: {
        [loadCommentsForArticleId.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        },
        [loadCommentsForArticleId.fulfilled]: (state, action) => {
            // action.payload is a comment object with properties articleId and comments - an array
            const commentsForArticle = { [action.payload.articleId]: action.payload.comments }
            state.byArticleId = commentsForArticle;
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
