import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom';

const RootLayout = ({setSearchTerm}) => {
    return (
        <>
            <Header setSearchTerm={setSearchTerm}/>
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default RootLayout;
