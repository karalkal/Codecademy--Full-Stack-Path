import styles from './App.module.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';

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
        console.log("ERROR RETURNED", returnedErrorPortion.split("=")[1]);
        return;
      }
      // If state strings don't match -> error
      let returnedStateStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("state")).split("=")[1];
      if (returnedStateStr !== RANDOM_STR) {
        console.log("ERROR MATCHING STATE", "returned:", returnedStateStr, "mine:", RANDOM_STR)
        return;
      }

      let returnedCodeStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("code")).split("=")[1];
      window.location.search = ""
      window.location.hash = ""
      setHasGrantedAccess(true)
      getToken(returnedCodeStr)
      // window.localStorage.setItem("token", token)
    }
  }
    ,
    [hasGrantedAccess])

  async function getToken(returnedCodeStr) {
    try {
      let TOKEN_URL = `${TOKEN_ENDPOINT}?grant_type=authorization_code&code=${returnedCodeStr}redirect_uri=${REDIRECT_URI}`
      let tokenRequestHeader = { user: CLIENT_ID, password: CLIENT_SECRET }

      const tokenResponse = await fetch(
        TOKEN_URL,
        {
          method: 'POST',
          headers: tokenRequestHeader
        })

      const tokenResJson = tokenResponse.json();
      console.log(tokenResJson)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <Header />
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESP_TYPE}&state=${RANDOM_STR}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE_STRING}`}>
        <button> Access </button>
      </a>
      {/* <button onClick={authorize}>CLICK</button> */}
    </>
  );
}

export default App;
