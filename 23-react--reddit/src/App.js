import { useEffect, useState } from 'react';
import Header from './components/Header';

let counter = 1

function App() {
  const [hasGrantedAccess, setHasGrantedAccess] = useState(false);

  // Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
  // Or just use browser add-on
  const AUTH_ENDPOINT = "https://www.reddit.com/api/v1/authorize"
  const TOKEN_ENDPOINT = "https://www.reddit.com/api/v1/access_token"
  // NEVER store in front-end app, even in .env  
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  let DURATION = "permanent"  //or "temporary"
  let RESP_TYPE = "code"      //	Must be the string "code"  
  let RANDOM_STR = "ldkfkjdfhkj";
  let SCOPE_STRING = "read"  // Scope Values: read, report, save, submit, etc...

  useEffect(() => {
    console.log("effect ran!");
    console.log(hasGrantedAccess, "times rendered:", counter);

    let afterPermissionQueryString = window.location.search   // get "response" querystring from url
    // window.location.search = "";    // clear address bar

    // get substrings needed
    let returnedErrorPortion = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("error"));
    // ERROR in querysting -> If user hasn't granted permission or similar
    if (afterPermissionQueryString) {
      if (returnedErrorPortion) {
        const errMsg = returnedErrorPortion.split("=")[1];
        if (errMsg === "access_denied" && hasGrantedAccess) {
          setHasGrantedAccess(false);
          console.log("Access removed");
          alert("Access to API has been withdrawn");
        }
        return;
      }
      // If state strings don't match -> alert, could happen probably
      let returnedStateStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("state")).split("=")[1];
      if (returnedStateStr !== RANDOM_STR) {
        // console.log("ERROR MATCHING STATE", "returned:", returnedStateStr, "mine:", RANDOM_STR)
        alert("ERROR MATCHING STATE");
        return;
      } else {
        // The below var is needed if token will be required, for now not required
        // let returnedCodeStr = afterPermissionQueryString.substring(1).split("&").find(elem => elem.startsWith("code")).split("=")[1];

        // getToken(returnedCodeStr)
        setHasGrantedAccess(true);
      }
      counter++;
    }
  }, [hasGrantedAccess, RANDOM_STR])



  /* Could't implement getToken, cannot figure out the correct request :-( but this is not needed for the app anyway
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
        hasGrantedAccess={hasGrantedAccess}
      />
    </>
  );
}

export default App;
