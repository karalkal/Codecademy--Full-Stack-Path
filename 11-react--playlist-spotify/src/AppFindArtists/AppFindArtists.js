import axios from 'axios';

import logo from './logo.svg';
import styles from './AppFindArtists.module.css';

import { useEffect, useState } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
// const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
// IF YOU WANT TO USE IT MOVE IT TO BACKEND
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
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const [token, setToken] = useState("");
  // as soon as App starts set token after Promise resolves 
  useEffect(() => {
    fetchAuthToken().then(token => setToken(token))
  }, [])


  async function searchArtists(e) {
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

  // Displaying Data - create the renderArtists function and call it inside the return of our App.js.
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id} className={styles.resultDiv}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt={artist.name} /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  return (
    <div>
      {/* You need to access the property via bracket notation to avoid dash being treated as minus */}
      <header className={styles["header"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />
        <h1>Find Artists</h1>
        <div>
          <a href='https://developer.spotify.com/documentation/web-api/tutorials/code-flow' target='_blank' rel="noreferrer">
            <span className={styles["link"]}>Authorization Code Flow</span>
          </a>
          <a href='https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow' target='_blank' rel="noreferrer">
            <span className={styles["link"]}>Client Credentials Flow</span>
          </a>
        </div>

      </header>
      <main>
        <section id={styles.info}>
          <p></p>
          <p>In this basic app token is obtained with dev credentials (Client Credentials Flow), meaning authentication without authorization.</p>
          <p>This allows us to get only endpoints that do not access user information, i.e. artists.</p>
          <p>For access to any sort of user-related data use Authorization Code Flow (links in header).</p>
        </section>
        {!token
          ?
          <div id={styles.error}>Ay, ay, ay, my Dev login details seem to be invalid!</div>
          :
          <>
            <form onSubmit={searchArtists}>
              <input type="text" onChange={e => setSearchKey(e.target.value)} />
              <button type={"submit"}>Search</button>
            </form>

            <section id={styles.results}>
              {renderArtists()}
            </section>
          </>
        }
      </main>
    </div>
  );
}

export default App;








