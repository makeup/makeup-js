// requires NodeList.forEach polyfill for IE
require('nodelist-foreach-polyfill');

const Combobox = require('../../packages/makeup-combobox');

window.onload = function() {
    document.querySelectorAll('.combobox').forEach(function(el, i) {
        const widget = new Combobox(el, {
            autoSelect: (el.dataset.makeupAutoSelect === 'false') ? false : true
        });

        el.addEventListener('makeup-combobox-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-combobox-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
