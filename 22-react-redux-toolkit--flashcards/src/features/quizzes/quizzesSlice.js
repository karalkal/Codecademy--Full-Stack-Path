import { createSlice } from "@reduxjs/toolkit";
import { associateQuizWithTopic } from "../topics/topicsSlice";

/*
 action creator that returns a thunk that dispatches the actions of creating a new quiz and associating it with its topic one after the other. This new thunk action creator is the one that you will dispatch when a user creates a new quiz.
*/

// that action creator expects to receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}
export const thunkActionCreator = (payload) => {
    return (dispatch) => {
        dispatch(addQuizz(payload))         // create new quiz
        // associating quiz with its topic, expects payload {quizId: '123', topicId: '456'}
        const quizId = payload.id;
        const topicId = payload.topicId;
        dispatch(associateQuizWithTopic(quizId, topicId));
    };
};

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {},
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

