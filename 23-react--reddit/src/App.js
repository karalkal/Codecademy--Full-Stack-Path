import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './components/Root';
import Home from './components/Home';
import Random from './components/Random';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';

import { getRandomSubreddit, obtainAccessToken } from './api/api';
import AppAuth from './components/AppAuth';


function App() {
  const [hasGrantedAccess, setHasGrantedAccess] = useState(false);
  const appAccessToken = JSON.parse(localStorage.getItem("access_token"))

  console.log(appAccessToken)

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
          element={<Random />}
          loader={getRandomSubreddit} />
        <Route path="search" element={<Search />} />
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
