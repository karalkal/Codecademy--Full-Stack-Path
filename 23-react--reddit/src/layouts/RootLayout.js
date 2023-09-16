import React from 'react';
import Header from '../components/Header'
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.css'

const RootLayout = ({ accessToken, selectedSubReddit, setSelectedCriterion }) => {
    return (
        <>
            <Header
                accessToken={accessToken}
                selectedSubReddit={selectedSubReddit}
                setSelectedCriterion={setSelectedCriterion}
            />
            {/* Outlet will render a <main> component depending on the route selected */}
            <main className={styles.mainContainer}>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
