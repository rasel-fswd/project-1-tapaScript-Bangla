import { getMovieReviewData } from './data.js';

function inti() {
  const movieReviewData = getMovieReviewData();
  registerEventHandler(movieReviewData);
  paintStats(movieReviewData);
  paintMovieData(movieReviewData);
}


//Printing statistics
function paintStats(data) {
  //Processing data
  const flatReviewData = data.flat();
  const totalMovie = data.length;
  const totalReview = flatReviewData.length;
  const totalRating = flatReviewData.reduce((acc, item) => {
    return acc + item.rating;
  }, 0);
  const averageRating = (totalRating / flatReviewData.length).toFixed(2);

  //Selecting DOM elements
  const totalMovieElm = document.getElementById('total-movies');
  const totalReviewElm = document.getElementById('total-reviews');
  const averageRatingElm = document.getElementById('total-average-rating');

  //Disply Data to the DOM
  addStats(totalMovieElm, totalMovie);
  addStats(totalReviewElm, totalReview);
  addStats(averageRatingElm, averageRating);
}

//Creating HTML ELements and Displaying data to the DOM
function addStats(elm, value) {
  const spanElm = document.createElement('span');
  spanElm.classList.add('text-6xl', 'font-semibold');
  spanElm.innerText = value;
  elm.appendChild(spanElm);
}

//Printing movie Review Dtata
function paintMovieData(movieReview) {
  const flatReviewData = movieReview.flat();
  const sorted = flatReviewData.toSorted((a, b) => b.on - a.on);
  const movieListEl = document.querySelector('#movie-list ul');

  addMovieReviewData(movieListEl, sorted);
}

function registerEventHandler(movieReview) {
  const sortBtn = document.getElementById('sortBtn');
  sortBtn.addEventListener('click', () => sortByReview(movieReview));
}

function sortByReview(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const movieListEl = document.querySelector('#movie-list ul');
  removeAllChildNodes(movieListEl);
  addMovieReviewData(movieListEl, flatReviewData);
}

function addMovieReviewData(movieListEl, movieReview) {
  movieReview.map(movie => {
    const liElem = document.createElement('li');
    liElem.classList.add('card', 'p-2', 'my-2');

    const titleElem = document.createElement('p');
    titleElem.classList.add('text-xl', 'mb-2');
    titleElem.innerText = `${movie.title} - ${movie.rating}`;
    liElem.appendChild(titleElem);
    movieListEl.appendChild(liElem);

    const reviewElem = document.createElement('p');
    reviewElem.classList.add('mx-2', 'mb-2');
    reviewElem.innerText = movie.content;
    liElem.appendChild(reviewElem);
    movieListEl.appendChild(liElem);

    const byElem = document.createElement('p');
    byElem.classList.add('mx-2', 'mb-2');
    byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(movie.on)}`;
    liElem.appendChild(byElem);
    movieListEl.appendChild(liElem);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

inti();
