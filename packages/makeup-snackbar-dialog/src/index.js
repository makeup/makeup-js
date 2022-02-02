import Dialog from 'makeup-dialog';

const defaultSnackbarOptions = {
    autoDismissTimer: 6000,
    baseClass: 'snackbar-dialog',
    ctaButtonSelector: '.snackbar-dialog__cta',
    transitionsModifier: 'transition'
};

export default class extends Dialog {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultSnackbarOptions, selectedOptions));
        this._autoDismissTimeout = null;
    }

    _show() {
        super._show();

        this._autoDismissTimeout = setTimeout((widget = this) => widget.close(), this._options.autoDismissTimer);
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
}

function _onCtaButtonClick() {
    this.cta();
}
