import debounce from 'lodash.debounce';

import API from './fetchCountries.js';
import { onOutputInfo, onNoCountry, onError } from './notify.js';

import countriesListTemplate from '../partials/countries-list.hbs';
import countriesCardTemplate from '../partials/countries-card.hbs';

import refs from './refs.js';
const { inputEL, countriesEL, clearBtnEL } = refs;

inputEL.addEventListener('input', debounce(onSearch, 500));
clearBtnEL.addEventListener('click', clearCountry);

function onSearch() {
  if (!inputEL.value) {
    clearCountry();
    return;
  }
  API(inputEL.value).then(countries => onCountrySearch(countries));
}

function onCountrySearch(countries) {
  if (countries.length === 1) {
    clearCountry();
    return onAppendCountriesCard(countries);
  } else if (countries.length >= 2 && countries.length <= 10) {
    clearCountry();
    return onAppendListCountries(countries);
  } else if (countries.length > 10) {
    return onOutputInfo();
  } else if (countries.status === 404) {
    return onNoCountry();
  } else {
    return onError();
  }
}

function clearCountry() {
  inputEL.value = '';
  countriesEL.innerHTML = '';
}

function onAppendListCountries(countries) {
  countriesEL.insertAdjacentHTML('beforeend', countriesListTemplate(countries));

  const listCountryEL = document.querySelector('.countries-list');
  listCountryEL.addEventListener('click', targetValue);
}

function onAppendCountriesCard(countries) {
  countriesEL.insertAdjacentHTML('beforeend', countriesCardTemplate(countries));
}

function targetValue(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  API(e.target.textContent).then(onCountrySearch);
}
