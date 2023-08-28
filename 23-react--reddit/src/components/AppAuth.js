import React from 'react';
import { useLoaderData } from 'react-router-dom';


const AppAuth = () => {
    const authResponse = useLoaderData();
    console.log(authResponse)
    
    return (
        <main>
            <h1>{authResponse.gender}</h1>
        </main>
    );
};

export default AppAuth;
