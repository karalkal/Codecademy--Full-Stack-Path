import { useState } from "react"

export default function Form() {
    const [searchTerm, setSearchTerm] = useState("")

    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Submitted form", searchTerm)
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
