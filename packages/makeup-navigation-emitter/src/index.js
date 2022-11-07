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
    // todo: update KeyEmitter to filter out nonEmitting items?
    if (this.nonEmittingItems.length === 0 || !this.nonEmittingItems.includes(e.detail.target)) {
        this.gotoPreviousNavigableIndex();
    }
}

function onKeyNext(e) {
    // todo: update KeyEmitter to filter out nonEmitting items?
    if (this.nonEmittingItems.length === 0 || !this.nonEmittingItems.includes(e.detail.target)) {
        this.gotoNextNavigableIndex();
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
    // todo: update KeyEmitter to filter out nonEmitting items?
    if (this.nonEmittingItems.length === 0 || !this.nonEmittingItems.includes(e.detail.target)) {
        this.index = this.firstNavigableIndex;
    }
}

function onKeyEnd(e) {
    // todo: update KeyEmitter to filter out nonEmitting items?
    if (this.nonEmittingItems.length === 0 || !this.nonEmittingItems.includes(e.detail.target)) {
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
    const { addedNodes, attributeName, removedNodes, target, type } = e[0];

    if (type === 'attributes') {
        if (target === this.currentItem) {
            if (attributeName === 'aria-disabled') {
                // current item was disabled - keep it as current index (until a keyboard navigation happens)
                toIndex = this.index;
            } else if (attributeName === 'hidden') {
                // current item was hidden and focus is lost - reset index to first interactive element
                toIndex = this.firstNavigableIndex;
            }
        } else {
            toIndex = this.index;
        }
    } else if (type === 'childList') {
        if (removedNodes.length > 0 && [...removedNodes].includes(this._cachedElement)) {
            // current item was removed and focus is lost - reset index to first interactive element
            toIndex = this.firstNavigableIndex;
        } else if (removedNodes.length > 0 || addedNodes.length > 0) {
            // nodes were added and/or removed - keep current item and resync its index
            toIndex = this.matchingItems.indexOf(this._cachedElement);
        }
    }

    this._index = toIndex;

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
        // todo: convert index to Tuple to store last/current values instead?
        this._cachedElement = this.matchingItems[toIndex];

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
        let nextNavigableIndex = -1;

        if (this.index === null) {
            nextNavigableIndex = this.firstNavigableIndex;
        } else if (this.options.wrap && this.atEnd()) {
            nextNavigableIndex = this.firstNavigableIndex;
        } else {
            const remainingItems = this.matchingItems.slice(this.index + 1);
            const navigableItems = this.navigableItems;
            const item = remainingItems.filter(el => navigableItems.includes(el))[0];
            nextNavigableIndex = this.matchingItems.indexOf(item);
        }

        return nextNavigableIndex;
    }

    get previousNavigableIndex() {
        let previousNavigableIndex = -1;

        if (this.options.wrap && this.atStart()) {
            previousNavigableIndex = this.lastNavigableIndex;
        } else if (this.index !== null) {
            const remainingItems = this.matchingItems.slice(0, this.index);
            const navigableItems = this.navigableItems;
            const item = remainingItems.reverse().filter(el => navigableItems.includes(el))[0];
            previousNavigableIndex = this.matchingItems.indexOf(item);
        }

        return previousNavigableIndex;
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
            this._cachedElement = this.matchingItems[toIndex];
            this._index = toIndex;

            this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
                bubbles: false,
                detail: { fromIndex, toIndex }
            }));
        }
    }

    isIndexNavigable(index) {
        return this.navigableItems.includes(this.matchingItems[index]);
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
