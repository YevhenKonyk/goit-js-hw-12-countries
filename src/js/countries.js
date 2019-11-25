import countriesListTpl from '../templates/countries/countries-list.hbs';
import countryTpl from '../templates/countries/country.hbs';
// Notifications plugin
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

import countriesService from './services/countries-service.js';
import loader from './plugins/loader.js';

const debounce = require('lodash.debounce');

const refs = {
    searchInput: document.querySelector('input[data-value="query"]'),
    countriesList: document.querySelector('ul.js-countries-list'),
    countryContainer: document.querySelector('div.js-country'),
}

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 500) );

function searchInputHandler(e) {
     const searchValue = e.target.value;
    //  Check if value contains only spaces
     if (searchValue.trim().length === 0) {
         return;
     }

     countriesService.query = searchValue;
     
     clearCountriesData();

     fetchCountries();
}

function fetchCountries() {
    loader.showLoader();

    countriesService.fetchCountries()
        .then(countries => {

            if (countries.length > 10) {
                // show notification
                PNotify.error({
                    delay: 5000,
                    text: 'Too many matches found. Please enter a more specific query!',
                    modules: {
                        Buttons: {
                            sticker: false,
                            stickerHover: false,
                        }
                    }
                });
                
            } else if (countries.length >= 2 && countries.length <= 10 ) {
                renderCountries(countries);
            }

            if (countries.length === 1) {
                renderCountry(countries);
            }

            loader.hideLoader();
        });
}

function renderCountries(countries) {
    const markup = countriesListTpl(countries);
    refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function renderCountry(countries) {
    const markup = countries.map(country => countryTpl(country));
    refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearCountriesData() {
    refs.countriesList.innerHTML = '';
    refs.countryContainer.innerHTML = '';
}