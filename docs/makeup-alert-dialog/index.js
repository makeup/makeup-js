const AlertDialog = require('../../packages/makeup-alert-dialog');

window.onload = function() {
    document.querySelectorAll('.alert-dialog').forEach(function(el, i) {
        const widget = new AlertDialog(el);
    });
};
