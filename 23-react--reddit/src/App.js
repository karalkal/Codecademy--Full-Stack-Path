import jwt_decode from "jwt-decode"; //decoded token will have .exp property

import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Best from './components/Best';
import Top from './components/Top';
import Hot from './components/Hot';
import Controversial from './components/Controversial';
import Found from './components/Found';
import Error404 from './components/Error404';
import ErrorGeneric from './components/ErrorGeneric';


import {
    getUserlessAuthorizarion,
    fetchSearchResult, fetchBestPosts, fetchTopPosts, fetchHottestPosts, fetchControversialPosts, fetchAboutInfoFavSubReddits
} from './api/api';
import { subredditsSubscriptionList } from "./utils/subredditsSubscriptionList";
import Subreddit from "./components/Subreddit";


function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [followedSubReddits, setFollowedSubReddits] = useState([])

    //fetch landing page data, i.e. followed reddits' "about" data, incl. icons
    // need to load this just once, hence useEffect()
    useEffect(() => {
        async function getResults() {
            let res = await fetchAboutInfoFavSubReddits(accessToken, subredditsSubscriptionList)
            setFollowedSubReddits(res)
            console.log("res")
        }

        getResults();       // CALL THE FUNCTION
        // cleanup?
    }
        , [])


    useEffect(() => {
        //Check if token in localStorage, if not get new one from API
        // declare function
        async function getNewTokenStoreItUpdateState() {
            const authData = await getUserlessAuthorizarion()
            let newAccessToken = authData.access_token
            localStorage.setItem("access_token", newAccessToken)
            setAccessToken(newAccessToken);
        }

        // Check if token in localStorage
        if (accessToken) {
            // If yes, check if it has expired 
            let decodedToken = jwt_decode(accessToken);
            let currentDate = new Date();
            // Expired
            if (decodedToken.exp * 1000 < currentDate.getTime()) {			// JWT exp is in seconds
                console.log("expired token")
                getNewTokenStoreItUpdateState();
            }
            else {
                // Not expired - do nothing
                console.log("valid token")
            }
        }

        else { 			// If no token in localStorage 
            console.log("no token")
            getNewTokenStoreItUpdateState()
        }
    }, [accessToken])


    const appRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={<RootLayout />}
                errorElement={<ErrorGeneric />} >

                {/* nested in layout comp */}
                <Route index
                    element={<Home followedSubReddits={followedSubReddits} />}
                // loader={() => fetchAboutInfoFavSubReddits(accessToken, subredditsSubscriptionList)} 
                />

                <Route path="subreddit"
                    element={<Subreddit accessToken={accessToken} />}
                />

                <Route
                    path="best"
                    element={<Best />}
                    loader={() => fetchBestPosts(accessToken)} />

                <Route
                    path="top"
                    element={<Top />}
                    loader={() => fetchTopPosts(accessToken)} />

                <Route
                    path="hot"
                    element={<Hot />}
                    loader={() => fetchHottestPosts(accessToken)} />

                <Route
                    path="controversial"
                    element={<Controversial />}
                    loader={() => fetchControversialPosts(accessToken)} />

                <Route path="found"
                    element={<Found />}
                // loader={() => fetchSearchResult(searchTerm)} 
                />

                <Route path="*" element={<Error404 />} />

            </Route >)
    );


    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    );
}

export default App;