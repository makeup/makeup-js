import * as KeyEmitter from 'makeup-key-emitter';
import * as ExitEmitter from 'makeup-exit-emitter';

// todo: autoInit: -1, autoReset: -1 are used for activeDescendant behaviour. These values can be abstracted away with
// a new "type" option (roving or active)

const defaultOptions = {
    axis: 'both',
    autoInit: 0,
    autoReset: null,
    ignoreButtons: false,
    wrap: false
};

function isButton(el) {
    return el.tagName.toLowerCase() === 'button' || el.type === 'button';
}

function onKeyPrev(e) {
    // todo: improve this button checking logic/config, it's a little unintuitive
    if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
        if (!this.atStart()) {
            this.index = this.prevNavigableIndex;
        } else if (this.options.wrap) {
            this.index = this.lastNavigableIndex;
        }
    }
}

function onKeyNext(e) {
    // todo: improve this button checking logic/config, it's a little unintuitive
    if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
        if (!this.atEnd()) {
            this.index = this.nextNavigableIndex;
        } else if (this.options.wrap) {
            this.index = this.firstNavigableIndex;
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
    // todo: improve this button checking logic/config, it's a little unintuitive
    if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
        this.index = this.firstNavigableIndex;
    }
}

function onKeyEnd(e) {
    // todo: improve this button checking logic/config, it's a little unintuitive
    if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
        this.index = this.lastNavigableIndex;
    }
}

function onFocusExit() {
    if (this.options.autoReset !== null) {
        this.reset();
    }
}

function onMutation() {
    // todo: reset index position if currentItem becomes disabled or hidden
    // const { target, attributeName } = e[0];

    // reset index if position is rendered invalid after mutation (e.g. nodes are hidden or disabled)
    if (this.index >= this.navigableItems.length) {
        // do not use index setter, it will trigger change event
        this._index = this.options.autoReset || this.options.autoInit;
    }

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
            if (typeof this.options.autoInit === 'number') {
                this._index = this.options.autoInit;
            } else {
                this._index = this.matchingItems.findIndex(
                    (item) => item.getAttribute(this.options.autoInit) === 'true'
                );
            }
            this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
                detail: {
                    items: this.matchingItems,
                    toIndex: this._index
                },
                bubbles: false
            }));
        }
    }

    get firstNavigableIndex() {
        return this.matchingItems.indexOf(this.navigableItems[0]);
    }

    get lastNavigableIndex() {
        return this.matchingItems.indexOf(this.navigableItems[this.navigableItems.length - 1]);
    }

    get nextNavigableIndex() {
        let nextNavigableIndex = -1;
        const el = this.navigableItems[this.navigableItems.indexOf(this.currentItem) + 1];

        if (el) nextNavigableIndex = this.matchingItems.indexOf(el);

        return nextNavigableIndex;
    }

    get prevNavigableIndex() {
        let prevNavigableIndex = -1;
        const el = this.navigableItems[this.navigableItems.indexOf(this.currentItem) - 1];

        if (el) prevNavigableIndex = this.matchingItems.indexOf(el);

        return prevNavigableIndex;
    }

    get currentItem() {
        return this.matchingItems[this.index];
    }

    get matchingItems() {
        return [...this.matchingNodes];
    }

    get matchingNodes() {
        return this._el.querySelectorAll(`${this._itemSelector}`);
    }

    get navigableItems() {
        return this.matchingItems.filter((el) => !el.hidden && el.getAttribute('aria-disabled') !== 'true');
    }

    get index() {
        return this._index;
    }

    set index(newIndex) {
        if (newIndex !== this.index && this.navigableItems.indexOf(this.matchingItems[newIndex]) !== -1) {
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
            // todo: add defensive code if autoReset index is out of bounds, disabled or hidden (-1 is a valid value)
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
