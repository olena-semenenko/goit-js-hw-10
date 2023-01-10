// return promise from fetch

const baseURL = 'https://restcountries.com/v3.1/name/';
const searchFilters = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${baseURL}${name}?fields=${searchFilters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
