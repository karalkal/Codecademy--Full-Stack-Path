import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './components/Root';
import Home from './components/Home';
import Best from './components/Best';
import Controversial from './components/Controversial';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';

import {
  fetchSearchResult, fetchBestPosts, getUserlessAuthorizarion, fetchTopPosts,
  fetchHottestPosts,
  fetchControversialPosts
} from './api/api';
import Top from './components/Top';
import Hot from './components/Hot';


function App() {
  const [appAccessToken, setAppAccessToken] = useState("");

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
        accessToken = JSON.stringify(authData.access_token)
        localStorage.setItem("access_token", accessToken)
        console.log("Just got new token");
      }
      // call the function
      getToken()
        // make sure to catch any error
        .catch(console.error);

      setAppAccessToken(accessToken)
    }
  },
    [])

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={
        <Root />} >

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

        <Route path="search" element={<Search />}
          loader={fetchSearchResult} />

        <Route path="*" element={<PageNotFound />} />

      </Route >)
  );


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
