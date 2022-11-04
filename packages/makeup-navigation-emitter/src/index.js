import * as KeyEmitter from 'makeup-key-emitter';
import * as ExitEmitter from 'makeup-exit-emitter';

const defaultOptions = {
    axis: 'both',
    autoInit: 'interactive',
    autoReset: 'current',
    nonEmittingElementSelector: null,
    wrap: false
};

function findAriaCheckedIndex(items) {
    return items.findIndex((item) => item.getAttribute('aria-checked') === 'true');
}

function findAriaSelectedIndex(items) {
    return items.findIndex((item) => item.getAttribute('aria-selected') === 'true');
}

function onKeyPrev(e) {
    if (this.nonEmittingItems.length === 0 || this.nonEmittingItems.indexOf(e.detail.target) === -1) {
        if (!this.atStart()) {
            this.index = this.previousNavigableIndex;
        } else if (this.options.wrap) {
            this.index = this.lastNavigableIndex;
        }
    }
}

function onKeyNext(e) {
    if (this.nonEmittingItems.length === 0 || this.nonEmittingItems.indexOf(e.detail.target) === -1) {
        if (!this.atEnd()) {
            this.gotoNextNavigableIndex();
        } else if (this.options.wrap) {
            this.gotoFirstNavigableIndex();
        }
    }
}

function onClick(e) {
    let element = e.target;
    let elementIndex = this.matchingItems.indexOf(element);

    // traverse widget ancestors until matching element is found
    while (element !== this._el && elementIndex === -1) {
        element = element.parentNode;
        elementIndex = this.matchingItems.indexOf(element);
    }

    if (elementIndex !== -1) {
        this.index = elementIndex;
    }
}

function onKeyHome(e) {
    if (this.nonEmittingItems.length === 0 || this.nonEmittingItems.indexOf(e.detail.target) === -1) {
        this.index = this.firstNavigableIndex;
    }
}

function onKeyEnd(e) {
    if (this.nonEmittingItems.length === 0 || this.nonEmittingItems.indexOf(e.detail.target) === -1) {
        this.index = this.lastNavigableIndex;
    }
}

function onFocusExit() {
    if (this.options.autoReset !== null) {
        this.reset();
    }
}

function onMutation(e) {
    const fromIndex = this.index;
    let toIndex = this.index;
    const { removedNodes, type } = e[0];
    // console.log(e.type, e.detail);
    // console.log(attributeName, oldValue, removedNodes, target, type);

    // reset index position if currentItem is removed
    if (type === 'childList' && removedNodes.length > 0 && [...removedNodes].indexOf(this._lastItem) !== -1) {
        console.log('current item was removed');
    }

    // todo: reset index position if currentItem becomes disabled or hidden

    // index cannot be great than number of items!
    // reset index if position out of bounds after nodes are removed
    if (type === 'childList' && removedNodes.length > 0 && this.index >= this.matchingItems.length) {
        console.log('items were removed and current item is out of bounds');
        // reinitialise the model
        const autoInitPosition = this.findIndexPosition(this.options.autoInit);
        toIndex = autoInitPosition === -1 ? null : autoInitPosition;
        // do not use index setter, it will trigger change event
        this._index = toIndex;
    }

    this._el.dispatchEvent(new CustomEvent('navigationModelMutation', {
        bubbles: false,
        detail: { fromIndex, toIndex }
    }));
}

class NavigationModel {
    /**
     * @param {HTMLElement} el
     * @param {string} itemSelector
     * @param {typeof defaultOptions} selectedOptions
     */
    constructor(el, itemSelector, selectedOptions) {
        /** @member {typeof defaultOptions} */
        this.options = Object.assign({}, defaultOptions, selectedOptions);

        /** @member {HTMLElement} */
        this._el = el;

        /** @member {string} */
        this._itemSelector = itemSelector;
    }
}

class LinearNavigationModel extends NavigationModel {
    /**
     * @param {HTMLElement} el
     * @param {string} itemSelector
     * @param {typeof defaultOptions} selectedOptions
     */
    constructor(el, itemSelector, selectedOptions) {
        super(el, itemSelector, selectedOptions);

        const fromIndex = this._index;
        const toIndex = this.findIndexPosition(this.options.autoInit);

        // do not use setter as it will trigger a change event
        this._index = toIndex;

        // always keep reference to the last item (for use in mutation observer)
        this._lastItem = this.matchingItems[toIndex];

        this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
            bubbles: false,
            detail: {
                firstInteractiveIndex: this.firstNavigableIndex,
                fromIndex,
                items: this.matchingItems,
                toIndex
            }
        }));
    }

    get firstNavigableIndex() {
        return this.matchingItems.indexOf(this.navigableItems[0]);
    }

    get lastNavigableIndex() {
        return this.matchingItems.indexOf(this.navigableItems[this.navigableItems.length - 1]);
    }

    get nextNavigableIndex() {
        let nextNavigableIndex = null;

        if (this.index === null) {
            nextNavigableIndex = this.firstNavigableIndex;
        } else if (this.options.wrap && this.atEnd()) {
            nextNavigableIndex = this.firstNavigableIndex;
        } else {
            const el = this.nextNavigableItem;

            if (el) nextNavigableIndex = this.matchingItems.indexOf(el);
        }

        return nextNavigableIndex;
    }

    get previousNavigableIndex() {
        let previousNavigableIndex = null;

        if (this.options.wrap && this.atStart()) {
            previousNavigableIndex = this.lastNavigableIndex;
        } else if (this.index !== null) {
            const el = this.previousNavigableItem;

            if (el) previousNavigableIndex = this.matchingItems.indexOf(el);
        }

        return previousNavigableIndex;
    }

    get nextNavigableItem() {
        return this.navigableItems[this.navigableItems.indexOf(this.currentItem) + 1];
    }

    get previousNavigableItem() {
        return this.navigableItems[this.navigableItems.indexOf(this.currentItem) - 1];
    }

    get currentItem() {
        return this.matchingItems[this.index];
    }

    get matchingItems() {
        return [...this._el.querySelectorAll(`${this._itemSelector}`)];
    }

    get navigableItems() {
        return this.matchingItems.filter((el) => !el.hidden && el.getAttribute('aria-disabled') !== 'true');
    }

    get nonEmittingItems() {
        const selector = this.options.nonEmittingElementSelector;

        return (selector !== null) ? [...this._el.querySelectorAll(selector)] : [];
    }

    get index() {
        return this._index;
    }

    /**
     * @param {number} toIndex - index position of navigable item in matchingItems
     */
    set index(toIndex) {
        if (toIndex !== this.index && this.isIndexNavigable(toIndex) === true) {
            const fromIndex = this.index;
            // always keep reference to the last item (for use in mutation observer, as it becomes "lost" at that point)
            this._lastItem = this.matchingItems[fromIndex];
            this._index = toIndex;

            this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
                bubbles: false,
                detail: { fromIndex, toIndex }
            }));
        }
    }

    isIndexNavigable(index) {
        return this.navigableItems.indexOf(this.matchingItems[index]) !== -1;
    }

    gotoFirstNavigableIndex() {
        this.index = this.firstNavigableIndex;
    }

    gotoLastNavigableIndex() {
        this.index = this.lastNavigableIndex;
    }

    gotoNextNavigableIndex() {
        this.index = this.nextNavigableIndex;
    }

    gotoPreviousNavigableIndex() {
        this.index = this.previousNavigableIndex;
    }

    // returning -1 means not found
    findIndexPosition(value) {
        let index = -1;

        switch (value) {
            case 'none':
                index = null;
                break;
            case 'current':
                index = this.index;
                break;
            case 'interactive':
                index = this.firstNavigableIndex;
                break;
            case 'ariaChecked':
                index = findAriaCheckedIndex(this.matchingItems);
                break;
            case 'ariaSelected':
                index = findAriaSelectedIndex(this.matchingItems);
                break;
            case 'ariaSelectedOrInteractive':
                index = findAriaSelectedIndex(this.matchingItems);
                index = (index === -1) ? this.firstNavigableIndex : index;
                break;
            default:
                index = value;
        }

        return index;
    }

    reset() {
        const fromIndex = this.index;
        const toIndex = this.findIndexPosition(this.options.autoReset);

        if (toIndex !== fromIndex) {
            // do not use setter as it will trigger a navigationModelChange event
            this._index = toIndex;

            this._el.dispatchEvent(new CustomEvent('navigationModelReset', {
                bubbles: false,
                detail: { fromIndex, toIndex }
            }));
        }
    }

    atEnd() {
        return this.index === this.lastNavigableIndex;
    }

    atStart() {
        return this.index === this.firstNavigableIndex;
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
    /**
     * @param {HTMLElement} el
     * @param {LinearNavigationModel} model
     */
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
            attributeFilter: ['aria-disabled', 'hidden'],
            attributes: true,
            attributeOldValue: true
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
}

function createLinear(el, itemSelector, selectedOptions) {
    const model = new LinearNavigationModel(el, itemSelector, selectedOptions);

    return new NavigationEmitter(el, model);
}

/*
static createGrid(el, rowSelector, colSelector, selectedOptions) {
    return null;
}
*/

export { createLinear };
