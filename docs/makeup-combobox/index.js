import '../docs.css';
import '@ebay/skin/combobox';

// REQUIRE
// const Combobox = require('../../packages/makeup-combobox').default;

// IMPORT
import Combobox from '../../packages/makeup-combobox';

window.onload = function() {
    document.querySelectorAll('.combobox').forEach(function(el, i) {
        const widget = new Combobox(el, {
            autoSelect: el.dataset.makeupAutoSelect !== 'false'
        });

        el.addEventListener('makeup-combobox-change', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-combobox-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
