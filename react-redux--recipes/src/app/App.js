import React from 'react';

import { AllRecipes } from '../features/allRecipes/AllRecipes.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';
import { FavoriteRecipes } from '../features/favoriteRecipes/FavoriteRecipes.js'

export function App(props) {
    const { state, dispatch } = props;

    const visibleAllRecipes = getFilteredRecipes(state.allRecipes, state.searchTerm);
    const visibleFavoriteRecipes = getFilteredRecipes(state.favoriteRecipes, state.searchTerm);

    // Render the <FavoriteRecipes /> component.
    // Pass `dispatch` and `favoriteRecipes` props.
    return (
        <main>
            <section>
                <SearchTerm
                    dispatch={dispatch}
                    searchTerm={state.searchTerm}
                />
            </section>
            <section>
                <h2>Favorite Recipes</h2>
                <FavoriteRecipes
                    dispatch={dispatch}
                    favoriteRecipes={visibleFavoriteRecipes}
                />
            </section>
            <hr />
            <section>
                <h2>All Recipes</h2>
                <AllRecipes
                    dispatch={dispatch}
                    allRecipes={visibleAllRecipes}
                />
            </section>
        </main>
    )
}

/* Utility Helpers */

function getFilteredRecipes(recipes, searchTerm) {
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
}