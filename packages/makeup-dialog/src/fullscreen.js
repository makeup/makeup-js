const ModalDialog = require('./dialog.js').ModalDialog;

const defaultFullscreenOptions = {
    baseClass: 'fullscreen-dialog',
    quickDismiss: false,
    closeButtonSelector: '.fullscreen-dialog__close',
    windowSelector: '.fullscreen-dialog__window'
};

module.exports = class extends ModalDialog {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultFullscreenOptions, selectedOptions));
    }
};
