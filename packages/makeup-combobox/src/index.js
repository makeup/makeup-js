import Expander from 'makeup-expander';
import Listbox from 'makeup-listbox';

const defaultOptions = {
    autoSelect: true,
    collapseTimeout: 150,
    customElementMode: false
};

export default class {
    constructor(widgetEl, selectedOptions) {
        this._options = Object.assign({}, defaultOptions, selectedOptions);
        this._el = widgetEl;

        this._inputEl = this._el.querySelector('input');
        this._listboxEl = this._el.querySelector('.combobox__listbox');
        this._autocompleteType = this._inputEl.getAttribute('aria-autocomplete');

        this._inputEl.setAttribute('autocomplete', 'off');
        this._inputEl.setAttribute('role', 'combobox');

        this._listboxEl.hidden = false;

        this._listboxWidget = new Listbox(this._listboxEl, {
            activeDescendantClassName: 'combobox__option--active',
            autoReset: -1,
            autoSelect: this._options.autoSelect,
            focusableElement: this._inputEl,
            listboxOwnerElement: this._el
        });

        this._expander = new Expander(this._el, {
            collapseOnClickOut: true,
            collapseOnFocusOut: true,
            contentSelector: '.combobox__listbox',
            expandedClass: 'combobox--expanded',
            expandOnFocus: true,
            hostSelector: 'input'
        });

        this._destroyed = false;

        this._onInputFocusListener = _onInputFocus.bind(this);
        this._onListboxClickListener = _onListboxClick.bind(this);
        this._onListboxActiveDescendantChangeListener = _onListboxActiveDescendantChange.bind(this);
        this._onTextboxKeyDownListener = _onTextboxKeyDown.bind(this);
        this._onTextboxInputListener = _onTextboxInput.bind(this);
        this._onTextboxClickListener = _onTextboxClick.bind(this);
        this._onMutationListener = _onMutation.bind(this);

        this._el.classList.add('combobox--js');

        if (!this._options.customElementMode) {
            this._mutationObserver = new MutationObserver(this._onMutationListener);
            this._observeMutations();
            this._observeEvents();
        }
    }

    resetFilter() {
        this._listboxWidget._activeDescendant.reset();
        this._listboxWidget.items.forEach(el => (el.hidden = false));
    }

    _observeMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.observe(this._inputEl, {
                attributes: true,
                childList: true,
                subtree: true
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
            this._listboxEl.addEventListener('click', this._onListboxClickListener);
            this._listboxWidget._activeDescendantRootEl.addEventListener(
                'activeDescendantChange',
                this._onListboxActiveDescendantChangeListener
            );
            this._inputEl.addEventListener('focus', this._onInputFocusListener);
            this._inputEl.addEventListener('keydown', this._onTextboxKeyDownListener);
            this._inputEl.addEventListener('input', this._onTextboxInputListener);
            this._inputEl.addEventListener('click', this._onTextboxClickListener);
        }
    }

    _unobserveEvents() {
        this._listboxEl.removeEventListener('click', this._onListboxClickListener);
        this._listboxWidget._activeDescendantRootEl.removeEventListener(
            'activeDescendantChange',
            this._onListboxActiveDescendantChangeListener
        );
        this._inputEl.removeEventListener('focus', this._onInputFocusListener);
        this._inputEl.removeEventListener('keydown', this._onTextboxKeyDownListener);
        this._inputEl.removeEventListener('input', this._onTextboxInputListener);
        this._inputEl.removeEventListener('click', this._onTextboxClickListener);
    }

    destroy() {
        this._destroyed = true;
        this._unobserveMutations();
        this._unobserveEvents();

        this._onInputFocusListener = null;
        this._onListboxClickListener = null;
        this._onListboxActiveDesendanctChangeListener = null;
        this._onTextboxKeyDownListener = null;
        this._onTextboxInputListener = null;
        this._onTextboxClickListener = null;
        this._onMutationListener = null;
    }
}

function _onInputFocus() {
    this.resetFilter();
}

function _onTextboxKeyDown(e) {
    // up and down keys should not move caret
    if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
    }

    // down arrow key should always expand listbox
    if (e.keyCode === 40) {
        if (this._expander.expanded === false) {
            this._expander.expanded = true;
        }
    }

    // escape key should always collapse listbox
    if (e.keyCode === 27) {
        if (this._expander.expanded === true) {
            this._expander.expanded = false;
            this._listboxWidget._activeDescendant.reset();
        }
    }

    // for manual selection, ENTER should not submit form when there is an active descendant
    if (this._options.autoSelect === false && e.keyCode === 13 && this._inputEl.getAttribute('aria-activedescendant')) {
        e.preventDefault();
        const widget = this;

        this._inputEl.value = this._listboxWidget.items[this._listboxWidget._activeDescendant.index].innerText;

        _dispatchChangeEvent(this._el, this._inputEl.value);

        this._listboxWidget._activeDescendant.reset();

        setTimeout(function() {
            widget._expander.expanded = false;
            if (widget._autocompleteType === 'list') {
                if (widget._inputEl.value.length === 0) {
                    widget.resetFilter();
                } else {
                    _filterSuggestions(widget._inputEl.value, widget._listboxWidget.items);
                }
            }
        }, this._options.collapseTimeout);
    }
}

function _onTextboxClick() {
    if (this._expander.expanded === false) {
        this._expander.expanded = true;
    }
}

function _onTextboxInput() {
    if (this._expander.expanded === false) {
        this._expander.expanded = true;
    }

    if (this._autocompleteType === 'list') {
        this._listboxWidget._activeDescendant.reset();
        if (this._inputEl.value.length === 0) {
            this.resetFilter();
        } else {
            _filterSuggestions(this._inputEl.value, this._listboxWidget.items);
        }
    }
}

function _onListboxClick(e) {
    const widget = this;
    const element = e.target.closest('[role=option]');
    const indexData = this._listboxWidget.items.indexOf(element);
    console.log(indexData);
    if (indexData !== undefined) {
        this._inputEl.value = this._listboxWidget.items[indexData].innerText;

        if (this._options.autoSelect === false) {
            _dispatchChangeEvent(this._el, this._inputEl.value);
        }

        setTimeout(function() {
            widget._expander.expanded = false;
        }, this._options.collapseTimeout);
    }
}

function _onListboxActiveDescendantChange(e) {
    if (this._options.autoSelect === true) {
        this._inputEl.value = this._listboxWidget.items[e.detail.toIndex].innerText;

        _dispatchChangeEvent(this._el, this._inputEl.value);
    }
}

function _onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this._el.dispatchEvent(new CustomEvent('makeup-combobox-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}

function _filterSuggestions(value, items) {
    const numChars = value.length;
    const currentValue = value.toLowerCase();

    const matchedItems = items.filter((el) => {
        return el.innerText.trim().substring(0, numChars).toLowerCase() === currentValue;
    });

    const unmatchedItems = items.filter((el) => {
        return el.innerText.trim().substring(0, numChars).toLowerCase() !== currentValue;
    });

    matchedItems.forEach((el) => (el.hidden = false));
    unmatchedItems.forEach((el) => (el.hidden = true));
}

function _dispatchChangeEvent(el, value) {
    el.dispatchEvent(new CustomEvent('makeup-combobox-change', {
        detail: { value }
    }));
}
