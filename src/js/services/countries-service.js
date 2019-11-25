const baseUrl = 'https://restcountries.eu/rest/v2';
const resource = '/name/';

export default {
    query: '',

    fetchCountries() {

        const requestParams = `${this.query}`;

        return fetch(baseUrl + resource + requestParams)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });

    },

    get searchQuery() {
        return this.query;
    },

    set searchQuery(value) {
        this.query = value;
    },
}