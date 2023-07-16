import { createSlice } from '@reduxjs/toolkit'

export const CATEGORIES = ['housing', 'food', 'transportation', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment'];
const initialState = CATEGORIES.map(category => ({ category: category, amount: 0 }))
// array of  { category: "housing", amount: 0 }, { category: "whatever", amount: 0 }...


const budgetsSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        /*
        action.payload will have a category and amount property.
        editBudget should update the state by finding the budget object whose .category value 
        matches action.payload.category and changing with the .amount value to action.payload.amount. 
        */
        editBudget: (state, action) => {
            const { category, amount } = action.payload;
            const indexToUpdate = state.findIndex(budget => (budget.category === category));
            state[indexToUpdate] = { ...state[indexToUpdate], amount }; // overwrite with Immer item in Array
            return state;
        }
    }
});

export const selectBudgets = (state) => state.budgets;
export const { editBudget } = budgetsSlice.actions
export default budgetsSlice.reducer;


/*
export const addTransaction = (transaction) => {
  return {
    type: 'transactions/addTransaction',
    payload: transaction
  }
}

export const deleteTransaction = (transaction) => {
  return {
    type: 'transactions/deleteTransaction',
    payload: transaction
  }
}

export const selectTransactions = (state) => state.transactions;
export const selectFlattenedTransactions = (state) => Object.values(state.transactions).reduce((a,b) => [...a, ...b], []);

const transactionsReducer = (state = initialState, action) => {
  let newTransactionsForCategory;
  switch (action.type) {
    case 'transactions/addTransaction':
      newTransactionsForCategory = [...state[action.payload.category].slice(), action.payload]
      return { ...state, [action.payload.category]: newTransactionsForCategory}
    case 'transactions/deleteTransaction':
      const deletedIndex = state[action.payload.category].findIndex(transaction => transaction.id === action.payload.id);
      newTransactionsForCategory = state[action.payload.category].filter((item, index) => index !== deletedIndex)
      return { ...state, [action.payload.category]: newTransactionsForCategory}
    default:
      return state;
  }
}

export default transactionsReducer;
*/
