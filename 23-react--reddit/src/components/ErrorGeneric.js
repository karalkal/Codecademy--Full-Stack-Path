import { Link, useRouteError } from "react-router-dom";
import Header from "./Header";

export default function ErrorGeneric() {
    const error = useRouteError()
    console.log(error)

    return (
        <>
            <Header />
            <main>
                <h1>{error.message}</h1>
                <h2>Back to <Link to="/">Homepage</Link></h2>
            </main>
        </>
    );
};

