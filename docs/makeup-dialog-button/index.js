import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/button";
import "@ebay/skin/alert-dialog";
import "@ebay/skin/confirm-dialog";
import "@ebay/skin/drawer-dialog";
import "@ebay/skin/fullscreen-dialog";
import "@ebay/skin/lightbox-dialog";
import "@ebay/skin/panel-dialog";
import "@ebay/skin/snackbar-dialog";
import "@ebay/skin/toast-dialog";

const DialogButton = require('../../packages/makeup-dialog-button');
const log = (e) => console.log(e); // eslint-disable-line no-console

window.onload = function() {
    document.querySelectorAll('.dialog-button').forEach(function(el, i) {
        const widget = new DialogButton(el);

        widget.dialog._el.addEventListener('dialog-open', log);
        widget.dialog._el.addEventListener('dialog-close', log);
        widget.dialog._el.addEventListener('dialog-confirm', log);
        widget.dialog._el.addEventListener('dialog-reject', log);
        widget.dialog._el.addEventListener('dialog-reset', log);
        widget.dialog._el.addEventListener('dialog-done', log);
        widget.dialog._el.addEventListener('dialog-acknowledge', log);
        widget.dialog._el.addEventListener('dialog-cta', log);
        widget.dialog._el.addEventListener('dialog-submit', log);
        widget.dialog._el.addEventListener('dialog-cancel', log);
    });
};
