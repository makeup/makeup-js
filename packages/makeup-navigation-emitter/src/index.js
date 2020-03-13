'use strict';

// requires NodeList.forEach polyfill for IE
// conditional check due to https://github.com/imagitama/nodelist-foreach-polyfill/issues/7
if (typeof Element !== 'undefined') {
    require('nodelist-foreach-polyfill');
}

// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEvent = require('custom-event');

const KeyEmitter = require('makeup-key-emitter');
const ExitEmitter = require('makeup-exit-emitter');
const dataSetKey = 'data-makeup-index';

const defaultOptions = {
    axis: 'both',
    autoInit: 0,
    autoReset: null,
    wrap: false
};

const itemFilter = (el) => !el.hidden;

function clearData(els) {
    els.forEach(el => el.removeAttribute(dataSetKey));
}

function setData(els) {
    els.forEach((el, index) => el.setAttribute(dataSetKey, index));
}

function onKeyPrev() {
    if (!this.atStart()) {
        this.index--;
    } else if (this.options.wrap) {
        this.index = (this.filteredItems.length - 1);
    }
}

function onKeyNext() {
    if (!this.atEnd()) {
        this.index++;
    } else if (this.options.wrap) {
        this.index = 0;
    }
}

function onClick(e) {
    let element = e.target;
    let indexData = element.dataset.makeupIndex;

    // traverse widget ancestors until interactive element is found
    while (element !== this._el && !indexData) {
        element = element.parentNode;
        indexData = element.dataset.makeupIndex;
    }

    if (indexData !== undefined) {
        this.index = indexData;
    }
}

function onKeyHome() {
    this.index = 0;
}

function onKeyEnd() {
    this.index = this.filteredItems.length;
}

function onFocusExit() {
    if (this.options.autoReset !== null) {
        this.reset();
    }
}

function onMutation() {
    // clear data-makeup-index on ALL items
    clearData(this.items);

    // set data-makeup-index only on filtered items (e.g. non-hidden ones)
    setData(this.filteredItems);

    this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

class NavigationModel {
    constructor(el, itemSelector, selectedOptions) {
        this.options = Object.assign({}, defaultOptions, selectedOptions);
        this._el = el;
        this._itemSelector = itemSelector;
    }
}

class LinearNavigationModel extends NavigationModel {
    constructor(el, itemSelector, selectedOptions) {
        super(el, itemSelector, selectedOptions);

        if (this.options.autoInit !== null) {
            this._index = this.options.autoInit;
            this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
                detail: {
                    items: this.filteredItems,
                    toIndex: this.options.autoInit
                },
                bubbles: false
            }));
        }
    }

    get items() {
        return this._el.querySelectorAll(this._itemSelector);
    }

    get filteredItems() {
        return Array.prototype.slice.call(this.items).filter(itemFilter);
    }

    get index() {
        return this._index;
    }

    set index(newIndex) {
        if (newIndex > -1 && newIndex < this.filteredItems.length && newIndex !== this.index) {
            this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
                detail: {
                    fromIndex: this.index,
                    toIndex: newIndex
                },
                bubbles: false
            }));
            this._index = newIndex;
        }
    }

    reset() {
        if (this.options.autoReset !== null) {
            this._index = this.options.autoReset; // do not use index setter, it will trigger change event
            this._el.dispatchEvent(new CustomEvent('navigationModelReset', {
                detail: {
                    toIndex: this.options.autoReset
                },
                bubbles: false
            }));
        }
    }

    atEnd() {
        return this.index === this.filteredItems.length - 1;
    }

    atStart() {
        return this.index <= 0;
    }
}

// 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

class NavigationEmitter {
    constructor(el, model) {
        this.model = model;
        this.el = el;

        this._keyPrevListener = onKeyPrev.bind(model);
        this._keyNextListener = onKeyNext.bind(model);
        this._keyHomeListener = onKeyHome.bind(model);
        this._keyEndListener = onKeyEnd.bind(model);
        this._clickListener = onClick.bind(model);
        this._focusExitListener = onFocusExit.bind(model);
        this._observer = new MutationObserver(onMutation.bind(model));

        setData(model.filteredItems);

        KeyEmitter.addKeyDown(this.el);
        ExitEmitter.addFocusExit(this.el);

        const axis = model.options.axis;

        if (axis === 'both' || axis === 'x') {
            this.el.addEventListener('arrowLeftKeyDown', this._keyPrevListener);
            this.el.addEventListener('arrowRightKeyDown', this._keyNextListener);
        }
        if (axis === 'both' || axis === 'y') {
            this.el.addEventListener('arrowUpKeyDown', this._keyPrevListener);
            this.el.addEventListener('arrowDownKeyDown', this._keyNextListener);
        }
        this.el.addEventListener('homeKeyDown', this._keyHomeListener);
        this.el.addEventListener('endKeyDown', this._keyEndListener);
        this.el.addEventListener('click', this._clickListener);
        this.el.addEventListener('focusExit', this._focusExitListener);

        this._observer.observe(this.el, {
            childList: true,
            subtree: true,
            attributeFilter: ['hidden'],
            attributes: true
        });
    }

    destroy() {
        KeyEmitter.removeKeyDown(this.el);
        ExitEmitter.removeFocusExit(this.el);

        this.el.removeEventListener('arrowLeftKeyDown', this._keyPrevListener);
        this.el.removeEventListener('arrowRightKeyDown', this._keyNextListener);
        this.el.removeEventListener('arrowUpKeyDown', this._keyPrevListener);
        this.el.removeEventListener('arrowDownKeyDown', this._keyNextListener);
        this.el.removeEventListener('homeKeyDown', this._keyHomeListener);
        this.el.removeEventListener('endKeyDown', this._keyEndListener);
        this.el.removeEventListener('click', this._clickListener);
        this.el.removeEventListener('focusExit', this._focusExitListener);

        this._observer.disconnect();
    }

    static createLinear(el, itemSelector, selectedOptions) {
        const model = new LinearNavigationModel(el, itemSelector, selectedOptions);

        return new NavigationEmitter(el, model);
    }

    /*
    static createGrid(el, rowSelector, colSelector, selectedOptions) {
        return null;
    }
    */
}

module.exports = NavigationEmitter;
