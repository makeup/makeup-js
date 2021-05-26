const Panel = require('./panel.js');

const defaultSortPanelOptions = {
    baseClassModifier: 'sort',
    doneButtonSelector: '.panel-dialog__done'
};

module.exports = class extends Panel {
    constructor(el, selectedOptions = {}) {
        super(el, Object.assign({}, defaultSortPanelOptions, selectedOptions));
    }

    _observeEvents() {
        super._observeEvents();

        this._doneButtonEl = this._el.querySelector(this._options.doneButtonSelector);
        this._onDoneButtonClickListener = _onDoneButtonClick.bind(this);
        this._doneButtonEl.addEventListener('click', this._onDoneButtonClickListener);
    }

    _unobserveEvents() {
        super._unobserveEvents();

        this._doneButtonEl.removeEventListener('click', this._onDoneButtonClickListener);
    }

    done() {
        this._hide();

        this._el.dispatchEvent(new CustomEvent('dialog-done'));
    }

    destroy() {
        super.destroy();

        this._onDoneButtonClickListener = null;
    }
};

function _onDoneButtonClick() {
    this.done();
}
