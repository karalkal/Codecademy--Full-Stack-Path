// Load before it renders, no need to use useEffect
export async function obtainAccessToken() {

    // Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
    // Or just use browser add-on
    // NEVER store in front-end app, even in .env  
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    let DURATION = "permanent"  //or "temporary"
    let RESP_TYPE = "code"      //	Must be the string "code"  
    let RANDOM_STR = "ldkfkjdfhkj";
    let SCOPE_STRING = "read"  // Scope Values: read, report, save, submit, etc...

    const res = await fetch(`https://www.reddit.com/api/v1/access_token`, 
    {
        method: 'POST',
    });



}


export async function getRandomSubreddit() {
    const res = await fetch(`http://www.reddit.com/r/random.json`);
    return res.json();      //Promise but it does not matter, React router will wait for it to resolve
}
