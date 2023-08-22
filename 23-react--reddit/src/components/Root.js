import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom';

const Root = ({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) => {
    return (
        <>
            <Header
                authEndpoint={authEndpoint}
                clientId={clientId}
                responseType={responseType}
                randomStr={randomStr}
                redirectURI={redirectURI}
                duration={duration}
                scopeStr={scopeStr}
                hasGrantedAccess={hasGrantedAccess}
            />

            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default Root;
