import { useParams } from "react-router-dom"

function Details() {

    const params = useParams()

    return (
        <div>{params.id}</div>
    )
}

export default Details