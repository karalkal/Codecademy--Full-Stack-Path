import jwt_decode from "jwt-decode"; //decoded token will have .exp property

import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Found from './pages/Found';
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';

import { getUserlessAuthorizarion, fetchAboutInfoFavSubReddits } from './api/api';
import { subredditsSubscriptionList } from "./utils/subredditsSubscriptionList";
import Results from "./pages/Results";

import logo from "./misc/redditBluelogo.png";


function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

    const [followedSubReddits, setFollowedSubReddits] = useState([]);
    const [selectedSubReddit, setSelectedSubReddit] = useState({
        url: "/",
        name: 'ALL',
        icon: logo
    })
    const [selectedCriterion, setSelectedCriterion] = useState('best')

    //fetch landing page data, i.e. followed reddits' "about" data, incl. icons
    // need to load this just once, hence useEffect()
    useEffect(() => {
        async function getListOfSubreddits() {
            let res = await fetchAboutInfoFavSubReddits(accessToken, subredditsSubscriptionList)
            setFollowedSubReddits(res)
        }

        getListOfSubreddits();       // CALL THE FUNCTION
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
                // path="/"
                element={<RootLayout
                    selectedSubReddit={selectedSubReddit}
                    setSelectedCriterion={setSelectedCriterion} />}
                errorElement={<ErrorGeneric />} >

                {/* nested in layout comp */}
                <Route index
                    element={
                        <Home
                            followedSubReddits={followedSubReddits}
                            setSelectedSubReddit={setSelectedSubReddit}
                        />
                    }
                />

                <Route path="results"
                    element={<Results
                        accessToken={accessToken}
                        selectedSubReddit={selectedSubReddit}
                        selectedCriterion={selectedCriterion} />}
                />

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