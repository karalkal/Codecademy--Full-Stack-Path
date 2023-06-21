import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const FETCH_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function fetchAuthToken() {
  const res = await fetch(FETCH_TOKEN_ENDPOINT, {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const resJson = await res.json();
  return (resJson.access_token);
}

function App() {

  const [token, setToken] = useState("");
  useEffect(() => {
    fetchAuthToken().then(token => setToken(token))
  }, [])

  console.log(token)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Spotify React</h1>
        {token}
      </header>
    </div>
  );
}



export default App;
