import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/icon";
import "@ebay/skin/icon-button";
import "@ebay/skin/lightbox-dialog";

const Lightbox = require('../../packages/makeup-dialog').Lightbox;

window.onload = function() {
    document.querySelectorAll('.lightbox-dialog').forEach(function(el, i) {
        const widget = new Lightbox(el);
    });
};
