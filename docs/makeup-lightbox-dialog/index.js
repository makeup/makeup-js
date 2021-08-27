import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/lightbox-dialog";

const LightboxDialog = require('../../packages/makeup-lightbox-dialog');

window.onload = function() {
    document.querySelectorAll('.lightbox-dialog').forEach(function(el, i) {
        const widget = new LightboxDialog(el);
    });
};
