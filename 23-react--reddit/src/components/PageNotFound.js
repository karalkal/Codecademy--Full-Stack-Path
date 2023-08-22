import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <main>
            <h1>Page not found!</h1>
            <h2>Back to <Link to="/">Homepage</Link></h2>
        </main >
    );
};

