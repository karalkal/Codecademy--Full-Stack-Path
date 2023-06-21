import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const FETCH_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RESPONSE_TYPE = "token"

async function fetchAuthToken() {
  const res = await fetch(FETCH_TOKEN_ENDPOINT, {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const resJson = await res.json();
  console.log(resJson)
  return (resJson.access_token);
}



function App() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash  // get substring after # 
    let token = window.localStorage.getItem("token")
    console.log(token)

    if (!token && hash) {
      // token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      token = fetchAuthToken()

      window.location.hash = ""                     // clear hash from URL
      window.localStorage.setItem("token", token)   // set the token
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  // After accepting the terms you will be redirected back to the app at localhost:3000.
  // A hash is passed to the URL which contains the access token which we need to authorize the API calls.

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Spotify React</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
          : <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}



export default App;
