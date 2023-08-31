import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchSearchResult } from "../api/api"

export default function Form() {
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()


    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Seraching for... ", searchTerm);
        // fetchSearchResult(searchTerm)

        navigate({
            pathname: '/found',
            search: `q=${searchTerm}`
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for..."
                onChange={handleChange}
                value={searchTerm}
            />
            {/* Don't forget onSumbit = {callbackfunction} */}
            <button>Search</button>
        </form>
    )
}
