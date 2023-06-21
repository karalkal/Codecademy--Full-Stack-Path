import axios from 'axios';

import logo from './logo.svg';
import styles from './AppFindArtists.module.css';

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
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    fetchAuthToken().then(token => setToken(token))
  }, [])


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
    <div className={styles.App}>
      {/* You need to access the property via bracket notation to avoid dash being treated as minus */}
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h1>Find Artists - Auto login</h1>
        <a href='https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn' ><span className={styles["App-link"]}>link to Tutorial</span></a>
      </header>
      <main>
        {!token
          ?
          <div id={styles.error}>Dev Login details seem to be invalid</div>
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








