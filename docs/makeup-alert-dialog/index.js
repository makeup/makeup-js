// STYLES
import '../docs.css';
import '@ebay/skin/global';
import '@ebay/skin/button';
import '@ebay/skin/alert-dialog';

// REQUIRE
//const AlertDialog = require('../../packages/makeup-alert-dialog');

// IMPORT
import AlertDialog from '../../packages/makeup-alert-dialog';

window.onload = function () {
    document.querySelectorAll('.alert-dialog').forEach(function (el, i) {
        const widget = new AlertDialog(el);
    });
};
