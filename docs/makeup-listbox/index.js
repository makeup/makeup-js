// requires NodeList.forEach polyfill for IE
require('nodelist-foreach-polyfill');

const Listbox = require('../../packages/makeup-listbox');

window.onload = function() {
    document.querySelectorAll('.listbox').forEach(function(el, i) {
        const widget = new Listbox(el, {
            autoSelect: (el.dataset.makeupAutoSelect === 'false') ? false : true
        });

        el.addEventListener('makeup-listbox-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-listbox-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
