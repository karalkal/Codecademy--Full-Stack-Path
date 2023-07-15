const tmdbKey = 'hidden';           //replace with actual key 
const tmdbBaseUrl = 'https://api.themoviedb.org';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = "/3/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
    // console.log(urlToFetch)
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            const genres = jsonResponse.genres
            return genres
        }
        console.log(response.status);   // mine
    } catch (error) {
        console.log(error);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/3/discover/movie";
    const requestParams = `?api_key=${tmdbKey}` + "&" + `with_genres=${selectedGenre}`;
    const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            const movies = jsonResponse.results
            return movies
        }
    } catch (error) {
        console.log(error);
    }
};

// getMovies()

const getMovieInfo = async (movie) => {
    const movieId = movie.id
    const movieEndpoint = `/3/movie/${movieId}`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams

    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let movieInfo = await response.json();
            return movieInfo
        }
    } catch (error) {
        console.log(error);
    }
};


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
    let movies = await getMovies();
    let randomMovie = await getRandomMovie(movies);
    let info = await getMovieInfo(randomMovie);
    // console.log(info)
    displayMovie(info);
};


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;