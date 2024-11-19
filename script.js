
// script.js

async function fetchMovieData() {
    const response = await fetch('netflix_series.json');
    return await response.json();
}

function populateGenres(movies) {
    const genreSelect = document.getElementById('genre');
    const genres = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => {
            genres.add(genre);
        });
    });
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

function pickRandomMovie(movies, selectedGenre) {
    const filteredMovies = movies.filter(movie =>
        movie.genres.includes(selectedGenre)
    );
    if (filteredMovies.length === 0) {
        alert(translations[selectedLanguage].noMoviesFound);
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    return filteredMovies[randomIndex];
}

function updateMovieDetails(movie) {
    const movieTitle = document.getElementById('movieTitle');
    const movieDescription = document.getElementById('movieDescription');
    const movieYear = document.getElementById('movieYear');
    const movieRating = document.getElementById('movieRating');

    movieTitle.textContent = movie.title;
    movieDescription.textContent = movie.description;
    movieYear.textContent = `${translations[selectedLanguage].movieYear}: ${movie.release_year}`;
    movieRating.textContent = `${translations[selectedLanguage].movieRating}: ${movie.rating}`;
}

function updateLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    selectedLanguage = languageSelect.value;

    document.getElementById('headerTitle').textContent = translations[selectedLanguage].headerTitle;
    document.querySelector('label[for="genre"]').textContent = translations[selectedLanguage].genreLabel;
    document.querySelector('label[for="languageSelect"]').textContent = translations[selectedLanguage].languageLabel;
    document.querySelector('option[value=""]').textContent = translations[selectedLanguage].selectGenre;
    document.getElementById('pickMovieBtn').textContent = translations[selectedLanguage].pickMovieButton;
}

let selectedLanguage = 'en';

async function main() {
    const movies = await fetchMovieData();
    populateGenres(movies);

    document.getElementById('languageSelect').addEventListener('change', () => {
        updateLanguage();
    });

    document.getElementById('pickMovieBtn').addEventListener('click', () => {
        const selectedGenre = document.getElementById('genre').value;
        if (!selectedGenre) {
            alert(translations[selectedLanguage].selectGenreAlert);
            return;
        }

        const randomMovie = pickRandomMovie(movies, selectedGenre);
        if (randomMovie) {
            updateMovieDetails(randomMovie);
        }
    });
}

main();
