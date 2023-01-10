// add styles to body and searchbox
// import function FetchCountries from /fetchCountries.js
// add searchFilters to FetchCountries(name)
// add plagins debounse i notifix
// addEventListener 'input' to #search-box, use Debounce with DEBOUNCE_DELAY
// if #search-box is empty, add .country-list and .country-info innerHTML = '', use also trim()
// if response.arr.length > 10 add notification "Too many matches found. Please enter a more specific name."
// if response.arr.length > 2 && response.arr.length < 10 create markup in .country-list li>img(flags.svg) + p(name.official)
// if response.arr.length = 1 create markup in .country-info img(flags.svg) + h1(name.official) + h2(capital) + h2(population) +h2(languages)
// create onSearchError()  for notification "Oops, there is no country with that name"
/////start

import './css/styles.css';
import { fetchCountries } from './fetchCountries';
//CONST
const DEBOUNCE_DELAY = 300;
const options = {
  width: '500px',
  borderRadius: '30px',
  position: 'center-bottom',
  distance: '25px',
  fontSize: '30px',
  timeout: 2000,
};

//librares
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

//refs
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// main function in listener
function onSearch(event) {
  const country = event.target.value;
  //sanitation
  if (!searchInput.value.trim()) {
    clearMarkup();
  }
  clearMarkup();

  fetchCountries(country)
    .then(data => searchValidation(data))
    .catch(error => {
      Notify.warning('Oops, there is no country with that name', options);
    });
}

//  function for search validation
function searchValidation(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', options);
  } else if (data.length > 1) {
    createListMarkup(data);
  } else {
    createCountryMarkup(data);
  }
}

//function for create country list
function createListMarkup(data) {
  const markup = data
    .map(
      country =>
        `<li>
        <img src="${country.flags.svg}" alt="${country.name.official}">
        <p> ${country.name.official}</p>
      </li>`
    )
    .join('');

  countryList.innerHTML = markup;
}

// function for create country card
function createCountryMarkup(data) {
  const markup = data
    .map(
      country =>
        `<div><img src="${country.flags.svg}" alt="${country.name.official}">
      <h1>${country.name.official}</h1>
      </div>
      <h2>Capital: <span>${country.capital}</span></h2>
      <h2>Population:<span> ${country.population}</span></h2>
      <h2>Languages:<span> ${Object.values(country.languages).join(', ')}</span></h2>`
    )
    .join('');
  countryInfo.innerHTML = markup;
}

//  function for clear markup
function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
