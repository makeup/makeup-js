const Lightbox = require('../../packages/makeup-dialog').Lightbox;

window.onload = function() {
    document.querySelectorAll('.lightbox-dialog').forEach(function(el, i) {
        const widget = new Lightbox(el);
    });
};
