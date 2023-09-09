import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import styles from "./SearchBar.module.css"

export default function SearchBar({selectedSubReddit}) {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const inputPlaceholder = "Search in r/" + selectedSubReddit.name + " for..."

    function handleSubmit(event) {
        event.preventDefault()

        // clear form
        event.target.reset()

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
