import { createSlice } from "@reduxjs/toolkit";


export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: {},
    },
    reducers: {
        // addCard action will receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}
        addCard: (state, action) => {
            const { id, front, back } = action.payload
            const newCard = { id, front, back }
            state.cards[id] = newCard; // add new object to "dictionary"
            return state;
        },
    },
})

export const selectCards = (state) => state.cards.cards;
export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;

