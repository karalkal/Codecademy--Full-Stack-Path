import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchSearchResult } from '../api/api';


import styles from "./SearchBar.module.css"

export default function SearchBar({ accessToken, selectedSubReddit, setDynamicUrlPath }) {
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const inputPlaceholder = "Search in r/" + selectedSubReddit.name + " for..."

    async function handleSubmit(event) {
        event.preventDefault()

        //fetch results
        let fetchedResults = await fetchSearchResult(accessToken, selectedSubReddit.url, searchQuery)
        let postsArray = createSimplifiedPostsArray(fetchedResults.data.children)

        const pathToNavigateTo = `${selectedSubReddit.name}/${searchQuery}`
        setDynamicUrlPath(pathToNavigateTo)

        navigate(pathToNavigateTo, { state: { postsArray, searchQuery } })
        // navigate("results", { state: { postsArray, searchQuery } })

        // clear form
        setSearchQuery("")
    }

    return (
        <form onSubmit={handleSubmit} id={styles.searchForm}>
            <input
                type="text"
                placeholder={inputPlaceholder}
                onChange={(event) => setSearchQuery(event.target.value)}
                value={searchQuery} />
            {/* Don't forget onSumbit = {callbackfunction} */}
            <button>Search</button>
        </form>
    )
}
