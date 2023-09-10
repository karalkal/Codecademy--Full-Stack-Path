import React from 'react';
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';

const RootLayout = ({ accessToken, selectedSubReddit, selectedCriterion, setSelectedCriterion }) => {
    return (
        <>
            <Header
                accessToken={accessToken}
                selectedSubReddit={selectedSubReddit}
                selectedCriterion={selectedCriterion}
                setSelectedCriterion={setSelectedCriterion} />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
