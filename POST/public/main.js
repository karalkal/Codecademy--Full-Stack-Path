// Information to reach API

const apiKey = "hidden in .env";
const url = "https://api.rebrandly.com/v1/links";

// Some page elements
const inputField = document.querySelector("#input");
const shortenButton = document.querySelector("#shorten");
const responseField = document.querySelector("#responseField");

// Asynchronous functions with .then
/*
const shortenUrl = () => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({ destination: urlToShorten });

    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            apikey: apiKey,
        },
        body: data,
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Request failed!");
            },
            (networkError) => console.log(networkError.message)
        )
        .then((jsonResponse) => {
            renderResponse(jsonResponse);
        });
};
*/
// Asynchronous functions with async / await
const shortenUrl = async () => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({ destination: urlToShorten });
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                apikey: apiKey,
            },
            body: data,
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
            return      // [my code, just in case]
        }       // if not ok [my code] 
        throw new Error(`Request failed! with ${response.status} - ${response.statusText}`);

    } catch (error) {
        console.log(error);
        // [my code] 
        throw new Error(`Request failed! with ${error.name} - ${error.message}`);
    }
};


// Clear page and call Asynchronous functions
const displayShortUrl = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
};

shortenButton.addEventListener("click", displayShortUrl);
