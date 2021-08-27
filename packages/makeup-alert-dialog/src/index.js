const Lightbox = require('makeup-lightbox-dialog');

const defaultAlertOptions = {
    baseClass: 'alert-dialog',
    baseClassModifier: 'alert',
    quickDismiss: false,
    acknowledgeButtonSelector: '.alert-dialog__acknowledge',
    windowSelector: '.alert-dialog__window'
};

module.exports = class extends Lightbox {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultAlertOptions, selectedOptions));
    }

    _observeEvents() {
        super._observeEvents();

        this._acknowledgeButtonEl = this._el.querySelector(this._options.acknowledgeButtonSelector);
        this._onAcknowledgeButtonClickListener = _onAcknowledgeButtonClick.bind(this);
        this._acknowledgeButtonEl.addEventListener('click', this._onAcknowledgeButtonClickListener);
    }

    _unobserveEvents() {
        super._unobserveEvents();

        this._acknowledgeButtonEl.removeEventListener('click', this._onAcknowledgeButtonClickListener);
    }

    acknowledge() {
        this._hide();

        this._el.dispatchEvent(new CustomEvent('dialog-acknowledge'));
    }

    destroy() {
        super.destroy();

        this._onAcknowledgeButtonClickListener = null;
    }
};

function _onAcknowledgeButtonClick() {
    this.acknowledge();
}
