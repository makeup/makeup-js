'use strict';

import * as NavigationEmitter from 'makeup-navigation-emitter';
import nextID from 'makeup-next-id';

// todo: rename autoInit and autoReset to make it clearer they are for kb focus behaviour
const defaultOptions = {
    activeDescendantClassName: 'active-descendant',
    autoInit: -1,
    autoReset: -1,
    autoScroll: false,
    axis: 'both',
    ignoreButtons: false,
    wrap: false
};

function onModelMutation() {
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
}

function onModelChange(e) {
    const fromItem = this.matchingItems[e.detail.fromIndex];
    const toItem = this.matchingItems[e.detail.toIndex];

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

    this._el.dispatchEvent(new CustomEvent('activeDescendantChange', {
        detail: {
            fromIndex: e.detail.fromIndex,
            toIndex: e.detail.toIndex
        }
    }));
}

function onModelReset(e) {
    const toIndex = e.detail.toIndex;
    const activeClassName = this._options.activeDescendantClassName;

    this.matchingItems.forEach(function(el) {
        el.classList.remove(activeClassName);
    });

    if (toIndex > -1) {
        const itemEl = this.matchingItems[toIndex];
        itemEl.classList.add(activeClassName);
        this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    } else {
        this._focusEl.removeAttribute('aria-activedescendant');
    }
}

function onModelInit(e) {
    const { items, toIndex } = e.detail;

    if (toIndex > -1) {
        const itemEl = items[toIndex];

        itemEl.classList.add(this._options.activeDescendantClassName);
        this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    }
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
    constructor(el, focusEl, containerEl, itemSelector, selectedOptions) {
        super(el);

        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._focusEl = focusEl;
        this._containerEl = containerEl;
        this._itemSelector = itemSelector;

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: this._options.autoInit,
            autoReset: this._options.autoReset,
            axis: this._options.axis,
            ignoreButtons: this._options.ignoreButtons,
            wrap: this._options.wrap
        });

        // ensure container has an id
        nextID(containerEl);

        // if DOM hierarchy cannot be determined,
        // focus element must programatically 'own' the container of descendant items
        if (containerEl !== focusEl) {
            focusEl.setAttribute('aria-owns', containerEl.id);
        }

        // ensure each item has an id
        this.matchingItems.forEach(function(itemEl) {
            nextID(itemEl);
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

    // todo: rename
    reset() {
        this._navigationEmitter.model.reset();
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

function createLinear(el, focusEl, containerEl, itemSelector, selectedOptions) {
    return new LinearActiveDescendant(el, focusEl, containerEl, itemSelector, selectedOptions);
}

export { createLinear };
