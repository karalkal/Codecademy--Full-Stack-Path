import { decode as base64_decode, encode as base64_encode } from 'base-64';
// let encoded = base64_encode('YOUR_DECODED_STRING');
// let decoded = base64_decode('YOUR_ENCODED_STRING');

// Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
// Or just use browser add-on
// NEVER store in front-end app, even in .env  
const AUTH_ENDPOINT = "https://www.reddit.com/api/v1/access_token"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
const LIST_RESULT_LIMIT_STR = "?limit=44"

// Load before it renders, no need to use useEffect
export async function getUserlessAuthorizarion() {

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

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }
        const authData = await response.json()
        return authData
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchBestPosts(appAccessToken) {
    const response = await fetch(`https://oauth.reddit.com/best` + LIST_RESULT_LIMIT_STR, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${appAccessToken}`,
            'Content-Type': 'application/json',
        },
    })

    const json = await response.json();
    return json
}

export async function fetchTopPosts(appAccessToken) {
    const response = await fetch(`https://oauth.reddit.com/top` + LIST_RESULT_LIMIT_STR, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${appAccessToken}`,
            'Content-Type': 'application/json',
        }
    })

    const json = await response.json();
    return json
}

export async function fetchHottestPosts(appAccessToken) {
    const response = await fetch(`https://oauth.reddit.com/hot` + LIST_RESULT_LIMIT_STR, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${appAccessToken}`,
            'Content-Type': 'application/json',
        }
    })

    const json = await response.json();
    return json
}

export async function fetchControversialPosts(appAccessToken) {
    const response = await fetch(`https://oauth.reddit.com/controversial` + LIST_RESULT_LIMIT_STR, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${appAccessToken}`,
            'Content-Type': 'application/json',
        }
    })

    const json = await response.json();
    return json
}


export async function fetchSearchResult(term) {
    console.log(term)
    const endpoint = `https://www.reddit.com/search.json?q=${term}`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json
};



