import { Link, useRouteError } from "react-router-dom";
import Header from "../components/Header";

export default function ErrorGeneric() {
    const error = useRouteError()

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

