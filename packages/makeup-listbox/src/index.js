/**
* A listbox can be a standalone focusable widget, or controlled by a separate, focusable widget
* (a textbox for example, in the case of a combobox or datepicker)
*
* This listbox code currently supports single-selct only!
* This code has been copied from Skin & MIND Patterns and has not yet been cleaned up.
*/

// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEvent = require('custom-event');

const findIndex = require('core-js-pure/features/array/find-index');
const ActiveDescendant = require('makeup-active-descendant');
const PreventScrollKeys = require('makeup-prevent-scroll-keys');

const defaultOptions = {
    activeDescendantClassName: 'listbox__option--active', // the classname applied to the current active desdcendant
    autoReset: null, // passed to makeup-active-descendant
    autoSelect: true, // when true, aria-checked state matches active-descendant
    customElementMode: false,
    focusableElement: null, // used in a combobox/datepicker scenario
    listboxOwnerElement: null, // used in a combobox/datepicker scenario
    multiSelect: false, // todo
    useAriaChecked: true // doubles up on support for aria-selected to announce visible selected/checked state
};

module.exports = class {
    constructor(widgetEl, selectedOptions) {
        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this.el = widgetEl;

        // in cases such as combobox, the active-descendant logic is controlled by a parent widget
        this._activeDescendantRootEl = this._options.listboxOwnerElement || this.el;

        if (widgetEl.getAttribute('role') === 'listbox') {
            this._listboxEl = widgetEl;
        } else {
            this._listboxEl = this.el.querySelector('[role=listbox]');
        }

        if (!this._options.focusableElement && this._listboxEl.getAttribute('tabindex') === null) {
            this._listboxEl.setAttribute('tabindex', '0');
        }

        this._activeDescendant = ActiveDescendant.createLinear(
            this._activeDescendantRootEl,
            this._options.focusableElement || this._listboxEl,
            this._listboxEl,
            '[role=option]',
            {
                activeDescendantClassName: this._options.activeDescendantClassName,
                autoInit: this.index,
                autoReset: this._options.autoReset,
                axis: 'y',
                ignoreButtons: true
            }
        );

        PreventScrollKeys.add(this.el);

        this._onFocusListener = _onFocus.bind(this);
        this._onMouseDownListener = _onMouseDown.bind(this);
        this._onKeyDownListener = _onKeyDown.bind(this);
        this._onClickListener = _onClick.bind(this);
        this._onActiveDescendantChangeListener = _onActiveDescendantChange.bind(this);
        this._onMutationListener = _onMutation.bind(this);

        this.el.classList.add('listbox--js');

        if (!this._options.customElementMode) {
            this._mutationObserver = new MutationObserver(this._onMutationListener);
            // this._observeMutations();
            this._observeEvents();
        }
    }

    _observeMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.observe(document.querySelector('[role=listbox]'), {
                attributes: true,
                childList: false,
                subtree: false
            });
        }
    }

    _unobserveMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.disconnect();
        }
    }

    _observeEvents() {
        if (this._destroyed !== true) {
            this._listboxEl.addEventListener('focus', this._onFocusListener);
            this._listboxEl.addEventListener('mousedown', this._onMouseDownListener);
            this._activeDescendantRootEl.addEventListener(
                'activeDescendantChange',
                this._onActiveDescendantChangeListener
            );
            this._listboxEl.addEventListener('keydown', this._onKeyDownListener);
            this._listboxEl.addEventListener('click', this._onClickListener);
        }
    }

    _unobserveEvents() {
        this._listboxEl.removeEventListener('focus', this._onFocusListener);
        this._listboxEl.removeEventListener('mousedown', this._onMouseDownListener);
        this._listboxEl.removeEventListener('keydown', this._onKeyDownListener);
        this._listboxEl.removeEventListener('click', this._onClickListener);
        this._activeDescendantRootEl.removeEventListener(
            'activeDescendantChange',
            this._onActiveDescendantChangeListener
        );
    }

    get index() {
        return findIndex(Array.prototype.slice.call(this.items), (el) => el.getAttribute('aria-selected') === 'true');
    }

    get items() {
        return this._listboxEl.querySelectorAll('[role=option]');
    }

    select(index) {
        this._unobserveMutations();

        if (index > -1 && index < this.items.length) {
            this.items[index].setAttribute('aria-selected', 'true');

            if (this._options.useAriaChecked === true) {
                this.items[index].setAttribute('aria-checked', 'true');
            }

            this.el.dispatchEvent(new CustomEvent('makeup-listbox-change', {
                detail: {
                    optionIndex: index,
                    optionValue: this.items[index].innerText
                }
            }));
        }

        this._observeMutations();
    }

    unselect(index) {
        this._unobserveMutations();

        if (index > -1 && index < this.items.length) {
            this.items[index].setAttribute('aria-selected', 'false');
            if (this._options.useAriaChecked === true) {
                this.items[index].setAttribute('aria-checked', 'false');
            }
        }

        this._observeMutations();
    }

    destroy() {
        this._destroyed = true;
        this._unobserveMutations();
        this._unobserveEvents();

        this._onFocusListener = null;
        this._onMouseDownListener = null;
        this._onKeyDownListener = null;
        this._onClickListener = null;
        this._onActiveDescendantChangeListener = null;
        this._onMutationListener = null;
    }
};

/*
*   For listbox with auto select, the first keyboard focus should set selection to first option
*/
function _onFocus() {
    if (this._mouseDownFlag !== true && this._options.autoSelect === true && this.index === -1) {
        this._activeDescendant.index = 0;
        this.items[0].setAttribute('aria-selected', 'true');

        if (this._options.useAriaChecked === true) {
            this.items[0].setAttribute('aria-checked', 'true');
        }
    }
    this._mouseDownFlag = false;
}

/*
*   This flag is used to help us detect if first focus comes from keyboard or as a result of mouse _onClick
*/
function _onMouseDown() {
    this._mouseDownFlag = true;
}

function _onKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) { // enter key or spacebar key
        const toElIndex = this._activeDescendant.index;
        const toEl = this.items[toElIndex];
        const isTolElSelected = toEl.getAttribute('aria-selected') === 'true';

        if (isTolElSelected === false) {
            this.unselect(this.index);
            this.select(toElIndex);
        }
    }
}

function _onClick(e) {
    const toEl = e.target.closest('[role=option]');
    const toElIndex = toEl.dataset.makeupIndex;
    const isTolElSelected = toEl.getAttribute('aria-selected') === 'true';

    if (isTolElSelected === false) {
        this.unselect(this.index);
        this.select(toElIndex);
    }
}

function _onActiveDescendantChange(e) {
    this.el.dispatchEvent(new CustomEvent('makeup-listbox-active-descendant-change', {
        detail: e.detail
    }));

    if (this._options.autoSelect === true) {
        const fromEl = this.items[e.detail.fromIndex];
        const toEl = this.items[e.detail.toIndex];

        if (fromEl) {
            this.unselect(e.detail.fromIndex);
        }

        if (toEl) {
            this.select(e.detail.toIndex);
        }
    }
}

function _onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this.el.dispatchEvent(new CustomEvent('makeup-listbox-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}
