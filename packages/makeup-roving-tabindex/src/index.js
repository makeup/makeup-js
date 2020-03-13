'use strict';

// requires NodeList.forEach polyfill for IE
// conditional check due to https://github.com/imagitama/nodelist-foreach-polyfill/issues/7
if (typeof Element !== 'undefined') {
    require('nodelist-foreach-polyfill');
}

// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEvent = require('custom-event');

const NavigationEmitter = require('makeup-navigation-emitter');

const defaultOptions = {
    autoReset: null,
    index: 0,
    wrap: false,
    axis: 'both'
};

const nodeListToArray = (nodeList) => Array.prototype.slice.call(nodeList);

function onModelMutation() {
    const modelIndex = this._navigationEmitter.model.index;

    this.filteredItems.forEach((el, index) => el.setAttribute('tabindex', index !== modelIndex ? '-1' : '0'));
}

function onModelInit(e) {
    const items = e.detail.items;

    nodeListToArray(items).filter((el, i) => i !== e.detail.toIndex).forEach(el => el.setAttribute('tabindex', '-1'));

    if (items[e.detail.toIndex]) {
        items[e.detail.toIndex].setAttribute('tabindex', '0');
    }
}

function onModelReset(e) {
    this._index = e.detail.toIndex; // seems unused internally. scheduled for deletion.

    const items = this.filteredItems;

    nodeListToArray(items).filter((el, i) => i !== e.detail.toIndex).forEach(el => el.setAttribute('tabindex', '-1'));
    items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
    const items = this.filteredItems;

    const fromItem = items[e.detail.fromIndex];
    const toItem = items[e.detail.toIndex];

    if (fromItem) {
        fromItem.setAttribute('tabindex', '-1');
    }

    if (toItem) {
        toItem.setAttribute('tabindex', '0');
        toItem.focus();
    }

    this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', {
        detail: {
            fromIndex: e.detail.fromIndex,
            toIndex: e.detail.toIndex
        }
    }));
}

class RovingTabindex {
    constructor(el) {
        this._el = el;
        this._onMutationListener = onModelMutation.bind(this);
        this._onChangeListener = onModelChange.bind(this);
        this._onInitListener = onModelInit.bind(this);
        this._onResetListener = onModelReset.bind(this);

        this._el.addEventListener('navigationModelMutation', this._onMutationListener);
        this._el.addEventListener('navigationModelChange', this._onChangeListener);
        this._el.addEventListener('navigationModelInit', this._onInitListener);
        this._el.addEventListener('navigationModelReset', this._onResetListener);
    }

    destroy() {
        this._el.removeEventListener('navigationModelMutation', this._onMutationListener);
        this._el.removeEventListener('navigationModelChange', this._onChangeListener);
        this._el.removeEventListener('navigationModelInit', this._onInitListener);
        this._el.removeEventListener('navigationModelReset', this._onResetListener);
    }
}

class LinearRovingTabindex extends RovingTabindex {
    constructor(el, itemSelector, selectedOptions) {
        super(el);

        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._itemSelector = itemSelector;

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: this._options.index,
            autoReset: this._options.autoReset,
            wrap: this._options.wrap,
            axis: this._options.axis
        });
    }

    get index() {
        return this._navigationEmitter.model.index;
    }

    set index(newIndex) {
        this._navigationEmitter.model.index = newIndex;
    }

    set wrap(newWrap) {
        this._navigationEmitter.model.options.wrap = newWrap;
    }

    get filteredItems() {
        return this._navigationEmitter.model.filteredItems;
    }

    get items() {
        return this._navigationEmitter.model.items;
    }

    // backwards compat
    get _items() {
        return this.items;
    }

    reset() {
        this._navigationEmitter.model.reset();
    }

    destroy() {
        this._navigationEmitter.destroy();
    }
}

/*
class GridRovingTabindex extends RovingTabindex {
    constructor(el, rowSelector, cellSelector, selectedOptions) {
        super(el);
    }
}
*/

function createLinear(el, itemSelector, selectedOptions) {
    return new LinearRovingTabindex(el, itemSelector, selectedOptions);
}

module.exports = {
    createLinear
};
