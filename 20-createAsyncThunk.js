import { fetchRecipes } from "../../app/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
PRODUCES 3 ACTION TYPES:
    'resourceType/actionType/pending'
    'resourceType/actionType/fulfilled'
    'resourceType/actionType/rejected'
*/

/*
The first argument, arg, will be equal to the first argument passed to the thunk action creator itself. 
For example, if we call fetchUserById(7), then inside the payload creator, arg will be equal to 7.
In the event the thunk requires only one param (for example, fetching a specific resource by id) you should name that first param semantically -> renamed to userId. 
const fetchUserById = createAsyncThunk(
    'users/fetchUserById', // action type
    async (userId, thunkAPI) => { // payload creator
        const response = await fetchUser(userId)
        return response.data
    }
)

Multiple arguments, for example, say we want to search our app’s users by first and last name. 
If the thunk action creator is called searchUsers, we would call it like this: searchUsers({firstName: 'Ada', lastName: 'Lovelace'}).
If you need to access these variables individually, use ES6 destructuring assignment to unpack the object when you declare the payload creator 
and pass it to createAsyncThunk, like this :

const searchUsers = createAsyncThunk(
    'users/searchUsers',
    async ({ firstName, lastName}, thunkAPI) => {
        // perform the asynchronous search request here    
    }
)
)
*/

export const loadRecipes = createAsyncThunk(
  "allRecipes/getAllRecipes",
  async () => {
    //payload creator
    const data = await fetch("api/recipes?limit=10");
    const json = await data.json();
    return json;
  }
);

const sliceOptions = {
  name: "allRecipes",
  initialState: {
    recipes: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadRecipes.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRecipes.fulfilled]: (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
};

export const allRecipesSlice = createSlice(sliceOptions);

export const selectAllRecipes = (state) => state.allRecipes.recipes;

export const selectFilteredAllRecipes = (state) => {
  const allRecipes = selectAllRecipes(state);
  const searchTerm = selectSearchTerm(state);

  return allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default allRecipesSlice.reducer;
