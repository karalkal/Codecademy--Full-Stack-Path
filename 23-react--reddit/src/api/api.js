import { decode as base64_decode, encode as base64_encode } from 'base-64';
// let encoded = base64_encode('YOUR_DECODED_STRING');
// let decoded = base64_decode('YOUR_ENCODED_STRING');

// Bypass the cross-origin-policy with "https://cors-anywhere.herokuapp.com/{type_your_url_here}"
// Or just use browser add-on
// NEVER store in front-end app, even in .env  
const AUTH_ENDPOINT = "https://www.reddit.com/api/v1/access_token"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET_KEY
const LIST_RESULT_LIMIT_STR = "limit=44"

// Load before it renders, no need to use useEffect
export async function getUserlessAuthorizarion() {

    const encodedCredentials = base64_encode(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')

    // For client_credentials grants include the following information in your POST data (NOT as part of the URL) - WTF???
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
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
}


export async function fetchBestPosts(appAccessToken) {
    try {
        const response = await fetch(`https://oauth.reddit.com/top?${LIST_RESULT_LIMIT_STR}&t=all`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${appAccessToken}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
}


export async function fetchTopPosts(appAccessToken) {
    try {
        const response = await fetch(`https://oauth.reddit.com/top?${LIST_RESULT_LIMIT_STR}&t=week`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${appAccessToken}`,
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
}

export async function fetchHottestPosts(appAccessToken) {
    try {
        const response = await fetch(`https://oauth.reddit.com/hot?${LIST_RESULT_LIMIT_STR}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${appAccessToken}`,
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
}

export async function fetchControversialPosts(appAccessToken) {
    try {
        const response = await fetch(`https://oauth.reddit.com/controversial?${LIST_RESULT_LIMIT_STR}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${appAccessToken}`,
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`${response.statusText} - ${response.status}`);
        }   // if ok
        const json = await response.json();
        return json
    } catch (error) {
        // will catch errors from if (!response.ok) too 
        throw new Error(error.message);
    }
}


export async function fetchSearchResult(term) {
    console.log(term)
    const endpoint = `https://www.reddit.com/search.json?q=${term}&sort=relevance`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json
};


export async function fetchAboutInfoFavSubReddits(appAccessToken, subRedditNames) {
    let subRedditsAboutInfo = []
    for (let nameSR of subRedditNames) {
        const dataSR = await fetchSRAbout(nameSR)
        const infoSR = {
            searchedName: nameSR,
            display_name: dataSR.data.display_name,
            accounts_active: dataSR.data.accounts_active,
            subscribers: dataSR.data.subscribers,
            created_utc: dataSR.data.created_utc,
            public_description: dataSR.data.public_description,
            title: dataSR.data.title,
            url: dataSR.data.url,
            header_img: dataSR.data.header_img,
            icon_img: dataSR.data.icon_img,
        }
        subRedditsAboutInfo.push(infoSR)
    }

    return subRedditsAboutInfo

    async function fetchSRAbout(nameSR) {
        try {
            const response = await fetch(`https://oauth.reddit.com/r/${nameSR}/about`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${appAccessToken}`,
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`${response.statusText} - ${response.status}`);
            }   // if ok
            const json = await response.json();
            return json
        } catch (error) {
            // will catch errors from if (!response.ok) too 
            throw new Error(error.message);
        }
    }


}



