const Lightbox = require('./lightbox.js');

const defaultConfirmationOptions = {
    baseClass: 'lightbox-dialog',
    baseClassModifier: 'confirmation',
    quickDismiss: false,
    confirmButtonSelector: '.lightbox-dialog__confirm',
    focusManagementIndex: 1,
    rejectButtonSelector: '.lightbox-dialog__reject',
    windowSelector: '.lightbox-dialog__compact-window'
};

module.exports = class extends Lightbox {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultConfirmationOptions, selectedOptions));
    }

    _observeEvents() {
        super._observeEvents();

        this._confirmButtonEl = this._el.querySelector(this._options.confirmButtonSelector);
        this._rejectButtonEl = this._el.querySelector(this._options.rejectButtonSelector);

        this._onConfirmButtonClickListener = _onConfirmButtonClick.bind(this);
        this._onRejectButtonClickListener = _onRejectButtonClick.bind(this);

        this._confirmButtonEl.addEventListener('click', this._onConfirmButtonClickListener);
        this._rejectButtonEl.addEventListener('click', this._onRejectButtonClickListener);
    }

    _unobserveEvents() {
        super._unobserveEvents();

        this._confirmButtonEl.removeEventListener('click', this._onConfirmButtonClickListener);
        this._rejectButtonEl.removeEventListener('click', this._onRejectButtonClickListener);
    }

    confirm() {
        this._hide();

        this._el.dispatchEvent(new CustomEvent('dialog-confirm'));
    }

    reject() {
        this._hide();

        this._el.dispatchEvent(new CustomEvent('dialog-reject'));
    }

    destroy() {
        super.destroy();

        this._onConfirmButtonClickListener = null;
        this._onRejectButtonClickListener = null;
    }
};

function _onConfirmButtonClick() {
    this.confirm();
}

function _onRejectButtonClick() {
    this.reject();
}
