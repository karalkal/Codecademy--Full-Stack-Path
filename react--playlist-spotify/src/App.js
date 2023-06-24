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

Tried to use onClick={logIn} and get tghe token from the response. This is WRONG:
https://stackoverflow.com/questions/33029349/getting-spotify-api-access-token-from-frontend-javascript-code
I believe the issue here is that you're attempting to retrieve JSON data from the endpoint where you should direct your users. 
So instead of making a request to it, you should supply a button on your page that links to your https://accounts.spotify.com/authorize/{...} URL
*/

import axios from 'axios';

import logo from './logo1.svg';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

import FoundSection from './FoundSection';
import PlaylistSection from './PlaylistSection';
import ErrorModal from './ErrorModal';

function App() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const RESPONSE_TYPE = "token"

  const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
  const SEARCH_TYPE = ["track"].join(",") // excluded "album", "artist", "playlist", "show", "episode", "audiobook"
  const SEARCH_RESULTS_LIMIT = 10   //Default value: 20 Range: 0 - 50

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    /* If we DO HAVE a token stored, we simply continue by setting our token state variable.
       If we DON'T have a token, we check if we have a hash. If so we perform tasks on that string to extract the token.
       The response from the server will have hash value like:
       #access_token=BQA[....]Yh4o&token_type=Bearer&expires_in=3600 
       N.B. Token will expire in 1 hour. */

    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]  // get substring we need
      window.location.hash = ""                     // clear hash from URL
      window.localStorage.setItem("token", token)   // set the token in localStorage
    }

    setToken(token)

  }, [])

  function logout() {
    setToken("")
    window.localStorage.removeItem("token")
  }

  async function performSearch(e) {
    e.preventDefault()
    try {
      const fullURI = `${SEARCH_ENDPOINT}?q=${searchKey}&type=${SEARCH_TYPE}&limit=${SEARCH_RESULTS_LIMIT}`
      // 'https://api.spotify.com/v1/search?q=alice&type=track'
      const data = await fetch(fullURI, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const dataJson = await data.json()

      // If search returns Json with error Object
      if (dataJson.error) {
        setErrorMsg(`${dataJson.error.status} - ${dataJson.error.message}`)
        setShowErrorModal(true);
        // If error is 401, i.e. token expired -->> display message, reset localStorage, set token state to "", 
        // since state has changed app will rerender, this time will log in button
        if (dataJson.error.status === 401) {
          setToken("")
          window.localStorage.removeItem("token")
        }
      }
      else {        // No error => dataJson must have tracks.items
        if (dataJson.tracks.items.length === 0) {   //... but it could be ampty array
          setErrorMsg("Your search returned zero results")
          setShowErrorModal(true);
        } else {    // and finally, if all is good
          setTracks(dataJson.tracks.items)          
        }
      }


    } catch (error) {   // If an error is thrown it will most likely be 401, i.e. token has experided (TTL 1 hour)
      setShowErrorModal(true);
      setErrorMsg(error.message)
      console.log(error)
    }
  }

  return (
    <>
      <header id={styles.header}>
        <img src={logo} className={styles["logo"]} alt="logo" />
        <h1>Spotify Playlist Creator</h1>
        {!token
          ?
          <button>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
              to Spotify</a>
          </button>
          :
          <button onClick={logout}>Logout</button>
        }
      </header>

      <main id={styles.main}>
        <ErrorModal
          show={showErrorModal}
          handleClose={() => setShowErrorModal(false)}
          errorMsg={errorMsg} />

        {token && <form onSubmit={performSearch}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>}

        {token && tracks.length > 0 && <section className={styles.mainContainer}>
          <FoundSection tracks={tracks}/>
          <PlaylistSection />
        </section>}
      </main>
    </>
  );
}

export default App;
