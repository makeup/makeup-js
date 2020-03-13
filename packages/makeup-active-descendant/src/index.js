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
const nextID = require('makeup-next-id');

const defaultOptions = {
    activeDescendantClassName: 'active-descendant',
    autoInit: -1,
    autoReset: -1,
    autoScroll: false,
    axis: 'both'
};

function onModelMutation() {
    const options = this._options;
    const modelIndex = this._navigationEmitter.model.index;

    this.filteredItems.forEach(function(item, index) {
        nextID(item);
        if (index !== modelIndex) {
            item.classList.remove(options.activeDescendantClassName);
        } else {
            item.classList.add(options.activeDescendantClassName);
        }
    });
}

function onModelChange(e) {
    const fromItem = this.filteredItems[e.detail.fromIndex];
    const toItem = this.filteredItems[e.detail.toIndex];

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

    this.filteredItems.forEach(function(el) {
        el.classList.remove(activeClassName);
    });

    if (toIndex > -1) {
        const itemEl = this.filteredItems[toIndex];
        itemEl.classList.add(activeClassName);
        this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    } else {
        this._focusEl.removeAttribute('aria-activedescendant');
    }
}

class ActiveDescendant {
    constructor(el) {
        this._el = el;
        this._onMutationListener = onModelMutation.bind(this);
        this._onChangeListener = onModelChange.bind(this);
        this._onResetListener = onModelReset.bind(this);

        this._el.addEventListener('navigationModelMutation', this._onMutationListener);
        this._el.addEventListener('navigationModelChange', this._onChangeListener);
        this._el.addEventListener('navigationModelReset', this._onResetListener);
    }

    destroy() {
        this._el.removeEventListener('navigationModelMutation', this._onMutationListener);
        this._el.removeEventListener('navigationModelChange', this._onChangeListener);
        this._el.removeEventListener('navigationModelReset', this._onResetListener);
    }
}

class LinearActiveDescendant extends ActiveDescendant {
    constructor(el, focusEl, containerEl, itemSelector, selectedOptions) {
        super(el);

        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: this._options.autoInit,
            autoReset: this._options.autoReset,
            axis: this._options.axis
        });

        this._focusEl = focusEl;
        this._containerEl = containerEl;
        this._itemSelector = itemSelector;

        // ensure container has an id
        nextID(containerEl);

        // if DOM hierarchy cannot be determined,
        // focus element must programatically 'own' the container of descendant items
        if (containerEl !== focusEl) {
            focusEl.setAttribute('aria-owns', containerEl.id);
        }

        // ensure each item has an id
        this.items.forEach(function(itemEl) {
            nextID(itemEl);
        });

        if (this._options.autoInit > -1) {
            const itemEl = this.filteredItems[this._options.autoInit];

            itemEl.classList.add(this._options.activeDescendantClassName);

            this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
        }
    }

    get index() {
        return this._navigationEmitter.model.index;
    }

    set index(newIndex) {
        this._navigationEmitter.model.index = newIndex;
    }

    reset() {
        this._navigationEmitter.model.reset();
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

module.exports = {
    createLinear
};
