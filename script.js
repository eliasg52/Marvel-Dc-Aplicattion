const apiURL = 'db.json';
const SEARCHAPI = 'http://localhost:3000/animated-movies?q=';

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

getMovies(apiURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData['animated-movies']);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
            <img
                src="${movie.image}"
                alt="${movie.title}"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span>${movie.date}</span>
            </div>`;

    main.appendChild(movieElement);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = '';
  }
});
