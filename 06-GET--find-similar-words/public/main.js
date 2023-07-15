// Information to reach API
const url = 'https://api.datamuse.com/words?sl=';
// https://api.datamuse.com/words?sl=jirraf
const queryParams = "rel_jja=";


// Selects page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// Asynchronous function with .then
/*
const getSuggestions = () => {
    const wordQuery = inputField.value;
    const endpoint = `${url}${wordQuery}`;

    fetch(endpoint, { cache: 'no-cache' })  // fetch(resource, options)
        .then(
            response => {           // resolved
                console.log(response)
                if (response.ok) {
                    return response.json();
                } // if not ok    
                throw new Error('Request failed!');
            },
            networkError => {      // rejected
                console.log(networkError.message)
            })
        .then(jsonResponse => {
            renderResponse(jsonResponse)
        });
}
*/

// Asynchronous function with async - await
const getSuggestions = async () => {
    const wordQuery = inputField.value;
    const endpoint = url + queryParams + wordQuery;     // added queryParams

    try {
        const response = await fetch(endpoint, { cache: "no-cache" });
        if (response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse)
        }
    } catch (error) {
        console.log(error);
        renderResponse(undefined)        // my edit

    }
};



// Clears previous results and display results to webpage
const displaySuggestions = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    getSuggestions();
};

submit.addEventListener('click', displaySuggestions);
