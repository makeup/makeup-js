'use strict';

import * as NavigationEmitter from 'makeup-navigation-emitter';

const defaultOptions = {
    autoInit: 'interactive',
    autoReset: 'current',
    wrap: false,
    axis: 'both'
};

function onModelMutation(e) {
    const { toIndex } = e.detail;

    this.items.forEach((el) => el.setAttribute('tabindex', '-1'));
    const el = this.items[toIndex];
    if (el) el.setAttribute('tabindex', '0');

    this._el.dispatchEvent(new CustomEvent('rovingTabindexMutation', { detail: e.detail }));
}

function onModelInit(e) {
    const { items, toIndex } = e.detail;
    const itemEl = items[toIndex];

    items.filter((el) => el !== itemEl).forEach((el) => el.setAttribute('tabindex', '-1'));

    if (itemEl) {
        itemEl.setAttribute('tabindex', '0');
    }

    this._el.dispatchEvent(new CustomEvent('rovingTabindexInit', { detail: e.detail }));
}

function onModelReset(e) {
    const items = this.items;

    items.filter((el, i) => i !== e.detail.toIndex).forEach((el) => el.setAttribute('tabindex', '-1'));
    items[e.detail.toIndex].setAttribute('tabindex', '0');

    this._el.dispatchEvent(new CustomEvent('rovingTabindexReset', { detail: e.detail }));
}

function onModelChange(e) {
    const items = this.items;

    const fromItem = items[e.detail.fromIndex];
    const toItem = items[e.detail.toIndex];

    if (fromItem) {
        fromItem.setAttribute('tabindex', '-1');
    }

    if (toItem) {
        toItem.setAttribute('tabindex', '0');
        toItem.focus();
    }

    this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', { detail: e.detail }));
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

        // todo: options.index is deprecated. Remove support in future release.
        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: (this._options.index !== undefined) ? this._options.index : this._options.autoInit,
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

    get currentItem() {
        return this._navigationEmitter.model.currentItem;
    }

    get items() {
        return this._navigationEmitter.model.items;
    }

    reset() {
        this._navigationEmitter.model.reset();
    }

    destroy() {
        super.destroy();
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

export { createLinear };
