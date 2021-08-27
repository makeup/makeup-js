const Dialog = require('makeup-dialog');

const defaultFullscreenOptions = {
    baseClass: 'fullscreen-dialog',
    quickDismiss: false,
    closeButtonSelector: '.fullscreen-dialog__close',
    transitionsModifier: 'transition',
    windowSelector: '.fullscreen-dialog__window'
};

module.exports = class extends Dialog {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultFullscreenOptions, selectedOptions, { modal: true }));
    }
};
