import React from 'react';
import { useLoaderData } from 'react-router-dom';


export default function Search({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {

    const foundSubreddit = useLoaderData();
    console.log(foundSubreddit)

    return (
        <main>
            <h1>Search</h1>
        </main>
    );
};

