// requires NodeList.forEach polyfill for IE
require('nodelist-foreach-polyfill');

const MenuButton = require('../../packages/makeup-menu-button');

window.onload = function() {
    document.querySelectorAll('.menu-button').forEach(function(el, i) {
        const widget = new MenuButton(el);

        el.addEventListener('makeup-menu-select', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-menu-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-menu-button-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
