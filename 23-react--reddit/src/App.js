import styles from './App.module.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!

function App() {
  const [hasGrantedAccess, setHasGrantedAccess] = useState(false);
  const [token, setToken] = useState("");

  // Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
  // Or just use browser add-on
  const AUTH_ENDPOINT = "https://www.reddit.com/api/v1/authorize"
  const TOKEN_ENDPOINT = "https://www.reddit.com/api/v1/access_token"
  // NEVER store in front-end app, even in .env  
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  let DURATION = "permanent"  //or temporary
  let RESP_TYPE = "code"      //	Must be the string "code"  
  let RANDOM_STR = "ldkfkjdfhkj";
  let SCOPE_STRING = "read"
  // Scope Values: identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread

  useEffect(() => {
    let afterPermissionQueryString = window.location.search
    // get substrings needed
    let returnedErrorPortion = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("error"));
    // If user hasn't granted permission or another error
    if (afterPermissionQueryString) {
      if (returnedErrorPortion) {
        const errMsg = returnedErrorPortion.split("=")[1]
        console.log("ERROR RETURNED", errMsg);
        if (errMsg === "access_denied") {
          window.localStorage.removeItem("user has granted access");
          alert("Access to API has been withdrawn")
        }
        return;

      }
      // If state strings don't match -> error, could happen probably
      let returnedStateStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("state")).split("=")[1];
      if (returnedStateStr !== RANDOM_STR) {
        // console.log("ERROR MATCHING STATE", "returned:", returnedStateStr, "mine:", RANDOM_STR)
        alert("ERROR MATCHING STATE");
        return;
      }

      let returnedCodeStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("code")).split("=")[1];
      // window.location.search = ""
      // window.location.hash = ""search = ""
      setHasGrantedAccess(true)
      window.location = REDIRECT_URI    // clear address bar
      // getToken(returnedCodeStr)
      window.localStorage.setItem("user has granted access", hasGrantedAccess)
    }
  }, [hasGrantedAccess])


  /* Could't implement getToken, cannot figure out the correct request
  async function getToken(returnedCodeStr) {
    const body = {
      grant_type: "authorization_code",
      code: returnedCodeStr,
      redirect_uri: REDIRECT_URI,
    }
    try {
      const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
      let newUrl = `${TOKEN_ENDPOINT}?grant_type=authorization_code&code=${returnedCodeStr}&&redirect_uri=${REDIRECT_URI}`

      const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization:
            { client_id: CLIENT_ID, password: CLIENT_SECRET }
        },
        data: JSON.stringify(body)
      })

      const resJson = res.json()
      console.log(resJson)

    } catch (error) {
      console.log(error)
    }
  }
  */

  return (
    <>
      <Header
        authEndpoint={AUTH_ENDPOINT}
        clientId={CLIENT_ID}
        responseType={RESP_TYPE}
        randomStr={RANDOM_STR}
        redirectURI={REDIRECT_URI}
        duration={DURATION}
        scopeStr={SCOPE_STRING}
      />

      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESP_TYPE}&state=${RANDOM_STR}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE_STRING}`}>
      </a>
    </>
  );
}

export default App;
