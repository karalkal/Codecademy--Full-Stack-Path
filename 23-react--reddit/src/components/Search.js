import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom';

export default function Search({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return (
        <>
            <h1>Search</h1>
        </>
    );
};

