import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom';

const RootLayout = ({ selectedSubReddit, setSelectedCriterion }) => {
    return (
        <>
            <Header
                selectedSubReddit={selectedSubReddit}
                setSelectedCriterion={setSelectedCriterion} />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
