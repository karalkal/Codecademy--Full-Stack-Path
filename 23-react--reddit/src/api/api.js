const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URI = "http://localhost:3000"
const RESPONSE_TYPE = "token"

const authorized = await fetch(`https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING`)
