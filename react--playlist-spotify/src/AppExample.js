/* 
This example app has been seen here: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn
1. Loggin in, if no token found in localStorage, display link to the Spotify Authentication page. 
2. After logging in and accepting the terms you will be redirected back to the app at localhost:3000.
3. After accepting the terms you will be redirected back to the app at localhost:3000. A hash is passed to the URL.
4. From this hash we obatin the token which we need to authorize the API calls and store its value in our state and in localStorage
5. Then we can perform our requests with the token in the headers:
        headers: {
            Authorization: `Bearer ${token}`,
        },
*/
import axios from 'axios';


import logo from './logo.svg';
import './AppExample.css';

import { useEffect, useState } from 'react';


function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);


  useEffect(() => {
    /* If we DO HAVE a token stored, we simply continue by setting our token state variable.
       If we DON'T have a token, we check if we have a hash. If so we perform tasks on that string to extract the token.
       The response from the server will have hash value like:
       #access_token=BQA[....]Yh4o&token_type=Bearer&expires_in=3600 */
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]  // get substring we need
      window.location.hash = ""                     // clear hash from URL
      window.localStorage.setItem("token", token)   // set the token in localStorage
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  // Displaying Data create the renderArtists function and call it inside the return of our App.js.
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Tutorial Spotify React</h1>
        <a href='https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn' ><span className='App-link'>link to Tutorial</span></a>
      </header>
      <main>
        {!token
          ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          :
          <>
            <form onSubmit={searchArtists}>
              <input type="text" onChange={e => setSearchKey(e.target.value)} />
              <button type={"submit"}>Search</button>
            </form>
            {renderArtists()}
            <button onClick={logout}>Logout</button>
          </>
        }
      </main>
    </div>
  );
}

export default App;








