const Lightbox = require('makeup-lightbox-dialog');

const defaultPanelOptions = {
    baseClass: 'panel-dialog',
    quickDismiss: true,
    closeButtonSelector: '.panel-dialog__close',
    doneButtonSelector: '.panel-dialog__done',
    windowSelector: '.panel-dialog__window',
    transitionsModifier: 'mask-fade-slow'
};

module.exports = class extends Lightbox {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultPanelOptions, selectedOptions));
    }
};
