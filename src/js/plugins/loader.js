const loader = document.querySelector('.loader-overlay');

export default {
    showLoader() {
        loader.classList.remove('js-hide');
    },

    hideLoader() {
        loader.classList.add('js-hide');
    }
}