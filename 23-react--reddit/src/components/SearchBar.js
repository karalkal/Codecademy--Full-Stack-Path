import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for..."
                onChange={(event) => setSearchQuery(event.target.value)}
                value={searchQuery} />
            {/* Don't forget onSumbit = {callbackfunction} */}
            <button>Search</button>
        </form>
    )
}
