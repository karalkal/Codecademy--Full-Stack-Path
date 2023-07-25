import { createSlice } from "@reduxjs/toolkit";

/*APP STATE WILL BE
        {
        topics: {
            topics: {
            '123': {
                id: '123',
                name: 'example topic',
                icon: 'icon url',
                quizIds: ['456']
                }
            }
        },
        quizzes: {
            quizzes: {
            '456': {
                id: '456',
                topicId: '123',
                name: 'quiz for example topic',
                cardIds: ['789', '101', '102']
            }
        }
    },
*/

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {},
        // pendingTopicCreate: false,
        // failedTopicCreate: false,

    },
    reducers: {
        //  addQuiz action will receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
        addQuizz: (state, action) => {
            const { id, name, topicId, cardIds } = action.payload
            const newQuizz = {
                id, name, topicId, cardIds,
            }
            state.quizzes[id] = newQuizz; // add new object to "dictionary"
            return state;
        }
    },
})

export const selectQuizzes = (state) => state.quizzes.quizzes;
export const { addQuizz } = quizzesSlice.actions;
export default quizzesSlice.reducer;

