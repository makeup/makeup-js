import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/toast-dialog";

const ToastDialog = require('../../packages/makeup-toast-dialog');

window.onload = function() {
    document.querySelectorAll('.toast-dialog').forEach(function(el, i) {
        const widget = new ToastDialog(el);
        console.log(widget, el);
    });
};
