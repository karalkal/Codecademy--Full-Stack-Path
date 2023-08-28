import { decode as base64_decode, encode as base64_encode } from 'base-64';
// let encoded = base64_encode('YOUR_DECODED_STRING');
// let decoded = base64_decode('YOUR_ENCODED_STRING');

// Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
// Or just use browser add-on
// NEVER store in front-end app, even in .env  
const AUTH_ENDPOINT = "https://www.reddit.com/api/v1/access_token"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
console.log(CLIENT_ID)
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
let DURATION = "permanent"  //or "temporary"
let RESP_TYPE = "code"      //	Must be the string "code"  
let RANDOM_STR = "ldkfkjdfhkj";
let SCOPE_STRING = "read"  // Scope Values: read, report, save, submit, etc...

// Load before it renders, no need to use useEffect
export async function obtainAccessToken() {

    const encodedCredentials = base64_encode(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')

    // For client_credentials grants include the following information in your POST data (NOT as part of the URL)
    try {
        let response = await fetch(AUTH_ENDPOINT, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': `Basic ${encodedCredentials}`,
            }
        })

        //    let response = await fetch("https://swapi.dev/api/people/1")

        if (!response.ok) {
            let error = await response.json()
            throw new Error(error.message)
        }
        const token = await response.json()

        console.log(token)
        return token
    }
    catch (error) {
        alert(error.message)
    }

}


export async function getRandomSubreddit() {
    const res = await fetch(`http://www.reddit.com/r/random.json`);
    return res.json();      //Promise but it does not matter, React router will wait for it to resolve
}
