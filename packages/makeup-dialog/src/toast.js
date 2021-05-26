const Dialog = require('./dialog.js').Dialog;

const defaultToastOptions = {
    baseClass: 'toast-dialog',
    closeButtonSelector: '.toast-dialog__close',
    ctaButtonSelector: '.toast-dialog__cta',
    transitionsModifier: 'transition'
};

module.exports = class extends Dialog {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultToastOptions, selectedOptions));
    }

    _show() {
        super._show();
    }

    _observeEvents() {
        super._observeEvents();

        this._ctaEl = this._el.querySelector(this._options.ctaButtonSelector);

        if (this._ctaEl) {
            this._onCtaClickListener = _onCtaButtonClick.bind(this);
            this._ctaEl.addEventListener('click', this._onCtaClickListener);
        }
    }

    _unobserveEvents() {
        super._unobserveEvents();

        if (this._ctaEl) {
            this._ctaEl.removeEventListener('click', this._onCtaClickListener);
        }
    }

    cta() {
        this._hide();
        this._el.dispatchEvent(new CustomEvent('dialog-cta'));
    }

    destroy() {
        super.destroy();
        this._onCtaClickListener = null;
    }
};

function _onCtaButtonClick() {
    this.cta();
}
