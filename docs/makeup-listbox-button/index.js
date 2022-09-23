import '../docs.css';
import '@ebay/skin/expand-button';
import '@ebay/skin/listbox-button';

// REQUIRE
// const ListboxButton = require('../../packages/makeup-listbox-button').default;

// IMPORT
import ListboxButton from '../../packages/makeup-listbox-button';

window.onload = function() {
    document.querySelectorAll('.listbox-button').forEach(function(el, i) {
        const widget = new ListboxButton(el, {
            autoSelect: el.dataset.makeupAutoSelect !== 'false'
        });

        el.addEventListener('makeup-listbox-button-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-listbox-button-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
