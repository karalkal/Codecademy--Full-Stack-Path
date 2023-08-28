import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './components/Root';
import Home from './components/Home';
import Random from './components/Random';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';

import { fetchSearchResult, getRandomSubreddit, obtainAccessToken } from './api/api';
import AppAuth from './components/AppAuth';


function App() {
  const [hasGrantedAccess, setHasGrantedAccess] = useState(false);
  const [appAccessToken, setAppAccessToken] = useState("");

  useEffect(() => {
    const tokenfromLS = JSON.parse(localStorage.getItem("access_token"))
    if (tokenfromLS) {
      setHasGrantedAccess(true)
      setAppAccessToken(tokenfromLS)
    }
  },
    [])

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={
        <Root hasGrantedAccess={hasGrantedAccess} />} >

        <Route index element={<Home />} />

        <Route
          path='appauth'
          element={<AppAuth
            setHasGrantedAccess={setHasGrantedAccess} />}
          loader={obtainAccessToken} />

        <Route
          path="random"
          element={<Random appAccessToken={appAccessToken} />}
          loader={() => getRandomSubreddit(appAccessToken)} />

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
