import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
    'comments/loadCommentsForArticleId',
    async (articleId) => {
        //payload creator
        const data = await fetch(`api/articles/${articleId}/comments`);
        const json = await data.json();
        return json;
    }
)

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
    'comments/postCommentForArticleId',
    async ({ articleId, comment }) => {
        const requestBody = JSON.stringify({ comment });
        const response = await fetch(`api/articles/${articleId}/comments`,
            {
                method: "POST",
                body: requestBody
            }
        );
        const json = await response.json();
        return json;    // will return the object we sent
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        /* storing comments in an object keyed by article IDs, where each article id key corresponds to an array of comments belonging to that article.
        {   art1: ["comment1", "comment2"],
            art44: ["comment1", "comment2"]  }
        */
        byArticleId: {},
        isLoadingComments: false,
        failedToLoadComments: false,

        createCommentIsPending: false,
        failedToCreateComment: false,
    },
    extraReducers: {
        [loadCommentsForArticleId.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        },
        [loadCommentsForArticleId.fulfilled]: (state, action) => {
            // action.payload is a comment object with properties articleId and comments - an array
            state.byArticleId = { [action.payload.articleId]: action.payload.comments };
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
        },
        [loadCommentsForArticleId.rejected]: (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        },

        [postCommentForArticleId.pending]: (state, action) => {
            state.createCommentIsPending = true;
            state.failedToCreateComment = false;
        },
        [postCommentForArticleId.fulfilled]: (state, action) => {
            const { id, articleId, text } = action.payload
            const currentComments = current(state.byArticleId)[articleId]
            const newComments = [...currentComments, { id, text }]
            console.log(newComments)
            state.byArticleId = { [articleId]: newComments };

            state.createCommentIsPending = false;
            state.failedToCreateComment = false;
        },
        [postCommentForArticleId.rejected]: (state, action) => {
            state.createCommentIsPending = false;
            state.failedToCreateComment = true;
        },
    },
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;


export default commentsSlice.reducer;
