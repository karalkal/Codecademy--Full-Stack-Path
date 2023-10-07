## Environment variables
**WARNING:** Do not store any secrets (such as private API keys) in your React app! Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

**Note:** You must create custom environment variables beginning with REACT\_APP\_. Any other variables except NODE\_ENV will be ignored. Changing any environment variables will require you to restart the development server if it is running. These environment variables will be defined for you on process.env. For example, having an environment variable named REACT\_APP\_NOT\_SECRET\_CODE will be exposed in your JS as process.env.REACT\_APP\_NOT\_SECRET\_CODE.

#This project utilizes some functionalities provided by Spotify's API.
It actually consists of two apps. 
By default App.js will be rendered in index.js but this can easily be switched to AppExample.js .
The two relevant css files are very similar to one another, having the same selectors. 
AppExample.js is styled using css modules, App.js is styled the traditional way, **otherwise styles clash big time**
1. In AppExample.js token is fetched automatically with dev credentials (Client Credentials Flow), meaning authentication without authorization. This allows us to get only endpoints that do not access user information, i.e. **artists like in the example here**. 
Having the env variables hidden the token obtaining function looks like this:
```
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
```
Then we set state for token in our app with useEffect and no dependencies  to ensure it runs once before render. 
Withe the token present we send another post request to the API:
```
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
```

2. For access to any sort of user-related data use Authorization Code Flow...