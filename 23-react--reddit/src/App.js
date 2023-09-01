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
  fetchSearchResult, fetchBestPosts, getUserlessAuthorizarion, fetchTopPosts, fetchHottestPosts, fetchControversialPosts
} from './api/api';


function App() {
  const [appAccessToken, setAppAccessToken] = useState("");
  const [hasValidToken, setHasValidToken] = useState(false)

  //Check if token in localStorage, if not get one
  useEffect(() => {
    let accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      console.log("Already have token")
      setAppAccessToken(JSON.parse(accessToken))
    }

    else {
      const getToken = async () => {
        const authData = await getUserlessAuthorizarion()
        console.log(authData)
        accessToken = JSON.stringify(authData.access_token)
        localStorage.setItem("access_token", accessToken)
        console.log("Just got new token");
      }
      // call the function
      getToken()

      setAppAccessToken(accessToken)
      setHasValidToken(true)
    }
  },
    [])

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<ErrorGeneric />}>

        {/* nested in layout comp */}
        <Route index element={<Home />} />

        <Route
          path="best"
          element={<Best appAccessToken={appAccessToken} />}
          loader={() => fetchBestPosts(appAccessToken)} />

        <Route
          path="top"
          element={<Top appAccessToken={appAccessToken} />}
          loader={() => fetchTopPosts(appAccessToken)} />

        <Route
          path="hot"
          element={<Hot appAccessToken={appAccessToken} />}
          loader={() => fetchHottestPosts(appAccessToken)} />

        <Route
          path="controversial"
          element={<Controversial appAccessToken={appAccessToken} />}
          loader={() => fetchControversialPosts(appAccessToken)} />

        <Route path="found"
          element={<Found />}
          loader={(term) => fetchSearchResult(term)} />

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
