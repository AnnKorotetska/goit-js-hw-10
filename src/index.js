import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markup, createMarkup, resetMarkup } from './js/markup';

const DEBOUNCE_DELAY = 300;

const searchCountry = document.querySelector('#search-box');

searchCountry.addEventListener(
  'input',
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);

function onSearchCountry(e) {
  resetMarkup();

  const nameCountry = e.target.value.trim();

  if (nameCountry === '') {
    return;
  }

  fetchCountries(nameCountry).then(onSuccess).catch(onError);
}

function onSuccess(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (data.length === 1) {
    markup(data);
  } else {
    createMarkup(data);
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}
