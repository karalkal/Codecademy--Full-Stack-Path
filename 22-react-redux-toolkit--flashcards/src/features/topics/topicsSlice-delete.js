import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const topicsSlice = createSlice({
    name: "topics",
    initialState,
    reducers: {
        addTopic: (state, action) => {
            const { category, amount } = action.payload;
            const indexToUpdate = state.findIndex(budget => (budget.category === category));
            state[indexToUpdate] = { ...state[indexToUpdate], amount }; // overwrite with Immer item in Array
            return state;
        }
    }
});

export const selectTopics = (state) => state.topics;
export const { addTopic } = topicsSlice.actions
export default topicsSlice.reducer;
