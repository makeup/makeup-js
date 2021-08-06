const Expander = require('makeup-expander');
const Listbox = require('makeup-listbox');

const defaultOptions = {
    autoSelect: true,
    buttonLabelSelector: '.expand-btn__text',
    collapseTimeout: 150,
    customElementMode: false,
    listboxSelector: '.listbox-button__listbox'
};

module.exports = class {
    constructor(widgetEl, selectedOptions) {
        this._options = Object.assign({}, defaultOptions, selectedOptions);
        this.el = widgetEl;
        this._buttonEl = this.el.querySelector('button');
        this._buttonLabelEl = widgetEl.querySelector(this._options.buttonLabelSelector);
        this._buttonPrefix = this._buttonEl.dataset?.listboxButtonPrefix;

        this.listbox = new Listbox(this.el.querySelector(this._options.listboxSelector), {
            activeDescendantClassName: 'listbox-button__option--active',
            autoSelect: this._options.autoSelect
        });

        this._expander = new Expander(this.el, {
            alwaysDoFocusManagement: true,
            collapseOnClick: true,
            collapseOnClickOut: true,
            collapseOnFocusOut: true,
            contentSelector: this._options.listboxSelector,
            expandedClass: 'listbox-button--expanded',
            expandOnClick: true,
            focusManagement: 'focusable',
            hostSelector: 'button'
        });

        this._onButtonFirstClickListener = _onButtonFirstClick.bind(this);
        this._onListboxClickListener = _onListboxClick.bind(this);
        this._onListboxKeyDownListener = _onListboxKeyDown.bind(this);
        this._onListboxChangeListener = _onListboxChange.bind(this);
        this._onMutationListener = _onMutation.bind(this);

        this.el.classList.add('listbox-button--js');

        if (!this._options.customElementMode) {
            this._mutationObserver = new MutationObserver(this._onMutationListener);
            this._observeMutations();
            this._observeEvents();
        }
    }

    _observeMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.observe(this._buttonEl, {
                attributeFilter: ['aria-expanded'],
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

    _unobserveEvents() {
        this._buttonEl.removeEventListener('click', this._onButtonFirstClickListener);
        this.listbox.el.removeEventListener('click', this._onListboxClickListener);
        this.listbox.el.removeEventListener('keydown', this._onListboxKeyDownListener);
        this.listbox.el.removeEventListener('makeup-listbox-change', this._onListboxChangeListener);
    }

    _observeEvents() {
        if (this._destroyed !== true) {
            this._buttonEl.addEventListener('click', this._onButtonFirstClickListener, { once: true });
            this.listbox.el.addEventListener('click', this._onListboxClickListener);
            this.listbox.el.addEventListener('keydown', this._onListboxKeyDownListener);
            this.listbox.el.addEventListener('makeup-listbox-change', this._onListboxChangeListener);
        }
    }

    collapse() {
        const widget = this;

        setTimeout(function() {
            widget._unobserveMutations();
            widget._expander.expanded = false;
            widget._observeMutations();
            widget._buttonEl.focus();
        }, this._options.collapseTimeout);
    }

    destroy() {
        this._destroyed = true;

        this._unobserveEvents();
        this._unobserveMutations();

        this._onButtonFirstClickListener = null;
        this._onListboxClickListener = null;
        this._onListboxKeyDownListener = null;
        this._onListboxChangeListener = null;
        this._onMutationListener = null;
    }
};

// listbox element should be hidden in initial SSR markup (for progressive enhancement)
function _onButtonFirstClick() {
    this.listbox.el.hidden = false;
}

function _onListboxKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 27 || e.keyCode === 32) {
        this.collapse();
    }
}

function _onListboxClick() {
    this.collapse();
}

function _onListboxChange(e) {
    const fromValue = this._buttonLabelEl.innerText;
    const toValue = e.detail.optionValue;

    if (this._buttonPrefix) {
        this._buttonLabelEl.innerText = this._buttonPrefix + toValue;
    } else {
        this._buttonLabelEl.innerText = toValue;
    }

    this.el.dispatchEvent(new CustomEvent('makeup-listbox-button-change', {
        detail: {
            fromValue: fromValue,
            toValue: toValue
        }
    }));
}

function _onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this.el.dispatchEvent(new CustomEvent('makeup-listbox-button-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}
