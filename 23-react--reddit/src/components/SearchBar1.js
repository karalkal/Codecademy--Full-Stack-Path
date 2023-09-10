import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchSearchResult } from '../api/api';


import styles from "./SearchBar.module.css"

export default function SearchBar({ accessToken, selectedSubReddit }) {
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const inputPlaceholder = "Search in r/" + selectedSubReddit.name + " for..."

    async function handleSubmit(event) {
        event.preventDefault()
        // clear form
        event.target.reset()
        //fetch results
        let foundPosts = await fetchSearchResult(accessToken, selectedSubReddit.url, searchQuery)
        console.log(foundPosts);

        let res = createSimplifiedPostsArray(foundPosts.data.children)

        navigate('/found', {
            state: {
                searchQuery
            }
        })
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
