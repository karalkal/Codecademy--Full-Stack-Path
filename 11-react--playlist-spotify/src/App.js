/* 
Example app: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn
1. Loggin in, if no token found in localStorage, display link to the Spotify Authentication page. 
2. After logging in and accepting the terms you will be redirected back to the app at localhost:3000.
3. After accepting the terms you will be redirected back to the app at localhost:3000. A hash is passed to the URL.
4. From this hash we obatin the token which we need to authorize the API calls and store its value in our state and in localStorage
5. Then we can perform our requests with the token in the headers:
        headers: {
            Authorization: `Bearer ${token}`,
        },

Tried to use onClick={logIn} and get the token from the response. This is WRONG:
https://stackoverflow.com/questions/33029349/getting-spotify-api-access-token-from-frontend-javascript-code
I believe the issue here is that you're attempting to retrieve JSON data from the endpoint where you should direct your users. 
So instead of making a request to it, you should supply a button on your page that links to your https://accounts.spotify.com/authorize/{...} URL
Once authorised (or not) you will recive an appropriate final URL will contain a hash fragment
*/

import { nanoid } from 'nanoid'
// each entry needs to have unique id to allow one track to be added more than one and each entry be removed individually
import logo from './logo1.svg';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

import FoundSection from './components/FoundSection';
import PlaylistSection from './components/PlaylistSection';
import ErrorModal from './components/ErrorModal';

function App() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const RESPONSE_TYPE = "token"
  const PLAYLIST_SCOPES = 'playlist-modify-private playlist-modify-public';

  const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
  const SEARCH_TYPE = ["track"].join(",") // excluded "album", "artist", "playlist", "show", "episode", "audiobook"
  const SEARCH_RESULTS_LIMIT = 35   //Default value: 20 Range: 0 - 50

  const CURRENT_USER_ENDPOINT = "https://api.spotify.com/v1/me"
  const PLAYLIST_CREATE_ENDPOINT = "https://api.spotify.com/v1/users"    //https://api.spotify.com/v1/users/{user_id}/playlists
  const PLAYLIST_EDIT_ENDPOINT = "https://api.spotify.com/v1/playlists"    //https://api.spotify.com/v1/playlists/{playlist_id}/tracks

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [foundTracks, setFoundTracks] = useState([]);
  const [addedTracks, setAddedTracks] = useState([]);
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
    setToken(token)                                 // set token state

  }, [])

  function logout() {
    setToken("")
    window.localStorage.removeItem("token")
  }

  async function performSearch(e) {
    e.preventDefault()
    e.target.reset()      // clear search input

    const trimmedKey = searchKey.trim()   // if string is "  ", return 400: No search query, not 400: Bad request; if "   some name   ", just remove spaces  
    try {
      const fullURI = `${SEARCH_ENDPOINT}?q=${trimmedKey}&type=${SEARCH_TYPE}&limit=${SEARCH_RESULTS_LIMIT}`
      // 'https://api.spotify.com/v1/search?q=alice&type=track'
      let data = await fetch(fullURI, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let dataJson = await data.json()

      // If search returns Json with error Object
      if (dataJson.error) {
        setErrorMsg(`${dataJson.error.status} - ${dataJson.error.message}`)   // example 400 - No search query
        setShowErrorModal(true);
        // If error.status is 401, i.e. token expired -->> display message, reset localStorage, set token state to "", 
        // Since state has changed app will rerender, this time will log in button
        if (dataJson.error.status === 401) {
          setToken("")
          window.localStorage.removeItem("token")
        }
      }
      // No error => dataJson must have tracks.items
      else {
        //... but it could be an empty array
        if (dataJson.tracks.items.length === 0) {
          setErrorMsg("Your search returned zero results")
          setShowErrorModal(true);
        }
        // and finally, if ALL IS GOOD
        else {
          setFoundTracks(dataJson.tracks.items);
          setSearchKey('')    // reset so it does not hold prev values, otherwise if after initial search user attempts serach with empty string, 
        }
      }
    } catch (error) {
      setShowErrorModal(true);
      setErrorMsg(error.message)
    }
  }

  function addTrackHandler(idOfTrack) {
    const spotifyTrack = foundTracks.find(t => t.id === idOfTrack);
    // Create objects myTrack with: 
    // 1. title, artist, album (to display)
    // 2. uri to identify what needs to be added to playlist (id as well)
    // 3. unique (not spotify's) ID created by me for each playlist ENTRY, NOT TRACK to allow duplicate entries and removal of one item only, 
    // i.e. add Even Flow 4 times, when remove is clicked, remove only the clicked entry, not all Even Flow entries
    const myTrack = {
      name: spotifyTrack.name,
      artist: spotifyTrack.artists[0].name,
      album: spotifyTrack.album.name,
      id: spotifyTrack.id,
      uri: spotifyTrack.uri,
      myId: nanoid()
    }

    setAddedTracks(prevPlaylistArr => [
      ...prevPlaylistArr,
      myTrack,
    ])
  }

  function removeTrackHandler(idOfEntryToRemove) {
    setAddedTracks(prevPlaylistArr => prevPlaylistArr.filter(tr => {
      return tr.myId !== idOfEntryToRemove
    }))
  }

  async function getUserId() {
    const currentUserData = await fetch(CURRENT_USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const currentUserJson = await currentUserData.json()
    return currentUserJson.id
  }

  async function createPlaylist(playlistName) {   //Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.)
    const currentUserId = await getUserId()

    const playlistCreatedResponse = await fetch(PLAYLIST_CREATE_ENDPOINT + `/${currentUserId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "name": playlistName,
          "description": `${playlistName} as created by KK`,
          "public": false
        })
      })
    let playlistCreatedJson = await playlistCreatedResponse.json()
    let playlistID = playlistCreatedJson.id

    // Playlist created, now another request to add tracks to it - {playlist_id}/tracks
    let playlistURIsArray = (addedTracks.map(track => track.uri))
    let body = JSON.stringify({
      "uris": playlistURIsArray,
      "position": 0
    });


    const tracksAddedToPlaylistResponse = await fetch(`${PLAYLIST_EDIT_ENDPOINT}/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: body
    })

    if (tracksAddedToPlaylistResponse.status === 201) {
      setSearchKey('')
      setFoundTracks([])
      setAddedTracks([])
      alert(`Playlist ${playlistName} created`)
    }
  }


  function displayNoPlaylistTitleError() {
    setShowErrorModal(true);
    setErrorMsg("Please enter title of your playlist")
  }

  return (
    <>
      <header>
        <img src={logo} className={styles["logo"]} alt="logo" />
        <h1>Spotify Playlist Creator</h1>
        {!token
          ?
          <a id="logInLink" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${PLAYLIST_SCOPES}`}>
            <button>Login to Spotify</button>
          </a>
          :
          <button onClick={logout}>Logout</button>
        }
      </header>

      <main>
        <ErrorModal
          show={showErrorModal}
          handleClose={() => setShowErrorModal(false)}
          errorMsg={errorMsg} />

        {token && <form onSubmit={performSearch}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>}

        {token && foundTracks.length > 0 && <section className={styles.resultsAndPlaylist}>
          <FoundSection
            tracks={foundTracks}
            onAddTrack={addTrackHandler} />
          <PlaylistSection
            playlist={addedTracks}
            createPlaylist={createPlaylist}
            displayNoPlaylistTitleError={displayNoPlaylistTitleError}
            onRemoveTrack={removeTrackHandler}
          />
        </section>}
      </main>
    </>
  );
}

export default App;
