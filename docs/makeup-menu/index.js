import '../docs.css';
import '@ebay/skin/menu';

// REQUIRE
// const Menu = require('../../packages/makeup-menu').default;

// IMPORT
import Menu from '../../packages/makeup-menu';

window.onload = function() {
    document.querySelectorAll('.menu').forEach(function(el, i) {
        const widget = new Menu(el);

        el.addEventListener('makeup-menu-select', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-menu-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-menu-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
