const Panel = require('./panel.js');

const defaultFilterPanelOptions = {
    baseClassModifier: 'filter',
    resetButtonSelector: '.panel-dialog__reset'
};

module.exports = class extends Panel {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultFilterPanelOptions, selectedOptions));
    }

    _observeEvents() {
        super._observeEvents();

        this._resetButtonEl = this._el.querySelector(this._options.resetButtonSelector);
        this._onResetButtonClickListener = _onResetButtonClick.bind(this);
        this._resetButtonEl.addEventListener('click', this._onResetButtonClickListener);
    }

    _unobserveEvents() {
        super._unobserveEvents();

        this._resetButtonEl.removeEventListener('click', this._onResetButtonClickListener);
    }

    reset() {
        this._el.dispatchEvent(new CustomEvent('dialog-reset'));
    }

    destroy() {
        super.destroy();

        this._onResetButtonClickListener = null;
    }
};

function _onResetButtonClick() {
    this.reset();
}
