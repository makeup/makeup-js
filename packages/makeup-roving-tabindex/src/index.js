'use strict';

import * as NavigationEmitter from 'makeup-navigation-emitter';

// todo: rename autoReset to make it clearer it is for kb focus behaviour
const defaultOptions = {
    autoReset: null,
    autoInit: 'first',
    wrap: false,
    axis: 'both'
};

function onModelMutation() {
    const modelIndex = this._navigationEmitter.model.index;

    this.navigableItems.forEach((el, index) => el.setAttribute('tabindex', index !== modelIndex ? '-1' : '0'));
}

function onModelInit(e) {
    const { items, toIndex } = e.detail;

    items.filter((el, i) => i !== toIndex).forEach((el) => el.setAttribute('tabindex', '-1'));

    if (items[toIndex]) {
        items[toIndex].setAttribute('tabindex', '0');
    }
}

function onModelReset(e) {
    const items = this.matchingItems;

    items.filter((el, i) => i !== e.detail.toIndex).forEach((el) => el.setAttribute('tabindex', '-1'));
    items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
    const items = this.matchingItems;

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

        // todo: options.index is deprecated. Remove support in future release.
        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: (this._options.index !== undefined) ? this._options.index : this._options.autoInit,
            autoReset: this._options.autoReset,
            wrap: this._options.wrap,
            axis: this._options.axis
        });
    }

    // todo: rename or remove
    get index() {
        return this._navigationEmitter.model.index;
    }

    // todo: rename or remove
    set index(newIndex) {
        this._navigationEmitter.model.index = newIndex;
    }

    set wrap(newWrap) {
        this._navigationEmitter.model.options.wrap = newWrap;
    }

    get navigableItems() {
        return this._navigationEmitter.model.navigableItems;
    }

    get matchingItems() {
        return this._navigationEmitter.model.matchingItems;
    }

    // todo: rename
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
