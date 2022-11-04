'use strict';

import * as NavigationEmitter from 'makeup-navigation-emitter';
import nextID from 'makeup-next-id';

const defaultOptions = {
    activeDescendantClassName: 'active-descendant',
    autoInit: 'none',
    autoReset: 'none',
    autoScroll: false,
    axis: 'both',
    wrap: false
};

function onModelMutation(e) {
    const options = this._options;
    const modelIndex = this._navigationEmitter.model.index;

    this.matchingItems.forEach(function(item, index) {
        nextID(item);
        if (index !== modelIndex) {
            item.classList.remove(options.activeDescendantClassName);
        } else {
            item.classList.add(options.activeDescendantClassName);
        }
    });

    this._el.dispatchEvent(new CustomEvent('activeDescendantMutation', { detail: e.detail }));
}

function onModelChange(e) {
    const { fromIndex, toIndex } = e.detail;
    const fromItem = this.matchingItems[fromIndex];
    const toItem = this.matchingItems[toIndex];

    if (fromItem) {
        fromItem.classList.remove(this._options.activeDescendantClassName);
    }

    if (toItem) {
        toItem.classList.add(this._options.activeDescendantClassName);
        this._focusEl.setAttribute('aria-activedescendant', toItem.id);

        if (this._options.autoScroll && this._containerEl) {
            this._containerEl.scrollTop = toItem.offsetTop - this._containerEl.offsetHeight / 2;
        }
    }

    this._el.dispatchEvent(new CustomEvent('activeDescendantChange', { detail: e.detail }));
}

function onModelReset(e) {
    const toIndex = e.detail.toIndex;
    const activeClassName = this._options.activeDescendantClassName;

    this.matchingItems.forEach(function(el) {
        el.classList.remove(activeClassName);
    });

    if (toIndex !== null && toIndex !== -1) {
        const itemEl = this.matchingItems[toIndex];
        itemEl.classList.add(activeClassName);
        this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    } else {
        this._focusEl.removeAttribute('aria-activedescendant');
    }

    this._el.dispatchEvent(new CustomEvent('activeDescendantReset', { detail: e.detail }));
}

function onModelInit(e) {
    const { items, toIndex } = e.detail;
    const itemEl = items[toIndex];

    if (itemEl) {
        itemEl.classList.add(this._options.activeDescendantClassName);
        this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    }

    this._el.dispatchEvent(new CustomEvent('activeDescendantInit', { detail: e.detail }));
}

class ActiveDescendant {
    constructor(el) {
        this._el = el;
        this._onMutationListener = onModelMutation.bind(this);
        this._onChangeListener = onModelChange.bind(this);
        this._onResetListener = onModelReset.bind(this);
        this._onInitListener = onModelInit.bind(this);

        this._el.addEventListener('navigationModelMutation', this._onMutationListener);
        this._el.addEventListener('navigationModelChange', this._onChangeListener);
        this._el.addEventListener('navigationModelReset', this._onResetListener);
        this._el.addEventListener('navigationModelInit', this._onInitListener);
    }

    destroy() {
        this._el.removeEventListener('navigationModelMutation', this._onMutationListener);
        this._el.removeEventListener('navigationModelChange', this._onChangeListener);
        this._el.removeEventListener('navigationModelReset', this._onResetListener);
        this._el.removeEventListener('navigationModelInit', this._onInitListener);
    }
}

class LinearActiveDescendant extends ActiveDescendant {
    constructor(el, focusEl, itemContainerEl, itemSelector, selectedOptions) {
        super(el);

        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._focusEl = focusEl;
        this._itemContainerEl = itemContainerEl;
        this._itemSelector = itemSelector;

        // ensure container has an id
        nextID(this._itemContainerEl);

        if (this.isProgrammaticRelationship === true) {
            focusEl.setAttribute('aria-owns', this._itemContainerEl.id);
        }

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: this._options.autoInit,
            autoReset: this._options.autoReset,
            axis: this._options.axis,
            nonEmittingElementSelector: this._options.nonEmittingElementSelector,
            wrap: this._options.wrap
        });

        // ensure each item has an id
        this.matchingItems.forEach(function(itemEl) {
            nextID(itemEl);
        });
    }

    get isProgrammaticRelationship() {
        return this._itemContainerEl !== this._focusEl;
    }

    get isHierarchicalRelationship() {
        return this._itemContainerEl === this._focusEl;
    }

    // todo: rename or remove
    get index() {
        return this._navigationEmitter.model.index;
    }

    // todo: rename or remove
    set index(newIndex) {
        this._navigationEmitter.model.index = newIndex;
    }

    // todo: rename
    reset() {
        this._navigationEmitter.model.reset();
    }

    get currentItem() {
        return this._navigationEmitter.model.currentItem;
    }

    get navigableItems() {
        return this._navigationEmitter.model.navigableItems;
    }

    get matchingItems() {
        return this._navigationEmitter.model.matchingItems;
    }

    set wrap(newWrap) {
        this._navigationEmitter.model.options.wrap = newWrap;
    }

    destroy() {
        super.destroy();
        this._navigationEmitter.destroy();
    }
}

/*
class GridActiveDescendant extends ActiveDescendant {
    constructor(el, focusEl, containerEl, rowSelector, cellSelector) {
        super(el);
    }
}
*/

function createLinear(el, focusEl, itemContainerEl, itemSelector, selectedOptions) {
    return new LinearActiveDescendant(el, focusEl, itemContainerEl, itemSelector, selectedOptions);
}

export { createLinear };
