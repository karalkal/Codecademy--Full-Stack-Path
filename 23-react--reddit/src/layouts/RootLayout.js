import React from 'react';
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';

const RootLayout = ({ accessToken, selectedSubReddit, setSelectedCriterion, setDynamicUrlPath }) => {
    return (
        <>
            <Header
                accessToken={accessToken}
                selectedSubReddit={selectedSubReddit}
                setSelectedCriterion={setSelectedCriterion}
                setDynamicUrlPath={setDynamicUrlPath} />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
