import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Form({ setSearchTerm }) {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    function handleSubmit(event) {
        // get data and set state of local and global vars
        event.preventDefault()
        setSearchTerm(searchQuery)

        let sq = searchQuery        // save value so we can send it with navigate (below) before resetting the state

        // clear form
        setSearchQuery("")

        navigate('/found', {
            state: {
                sq: sq
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
