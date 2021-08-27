import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/icon-button";
import "@ebay/skin/panel-dialog";

const PanelDialog = require('../../packages/makeup-panel-dialog');

window.onload = function() {
    document.querySelectorAll('.panel-dialog').forEach(function(el, i) {
        const widget = new PanelDialog(el);
    });
};
