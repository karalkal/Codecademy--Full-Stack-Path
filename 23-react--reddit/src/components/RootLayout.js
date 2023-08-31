import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom';

const Root = (props) => {
    return (
        <>
            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />
        </>
    );
};

export default Root;
