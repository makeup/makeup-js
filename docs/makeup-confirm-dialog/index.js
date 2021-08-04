const ConfirmDialog = require('../../packages/makeup-confirm-dialog');

window.onload = function() {
    document.querySelectorAll('.confirm-dialog').forEach(function(el, i) {
        const widget = new ConfirmDialog(el);
    });
};
