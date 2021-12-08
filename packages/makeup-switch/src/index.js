const defaultOptions = {
    bem: {
        control: 'switch__control'
    },
    customElementMode: false
};

export default class {
    constructor(el, selectedOptions) {
        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this.el = el;

        this._onClickListener = _onClick.bind(this);
        this._onKeyDownListener = _onKeyDown.bind(this);
        this._onMutationListener = _onMutation.bind(this);

        if (this.disabled) {
            this._focusableElement.setAttribute('tabindex', '-1');
        }

        this.el.classList.add('switch--js');

        if (!this._options.customElementMode) {
            this._mutationObserver = new MutationObserver(this._onMutationListener);
            this._observeMutations();
            this._observeEvents();
        }
    }

    _observeMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.observe(this._focusableElement, {
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
        this._focusableElement.addEventListener('click', this._onClickListener);
        this._focusableElement.addEventListener('keydown', this._onKeyDownListener);
    }

    _unobserveEvents() {
        this._focusableElement.removeEventListener('click', this._onClickListener);
        this._focusableElement.removeEventListener('keydown', this._onKeyDownListener);
    }

    get _focusableElement() {
        return this.el.querySelector(`.${this._options.bem.control}`);
    }

    set checked(isChecked) {
        this._unobserveMutations();

        this._focusableElement.setAttribute('aria-checked', isChecked.toString());
        this.el.dispatchEvent(new CustomEvent('makeup-switch-toggle', {
            composed: true,
            detail: {
                on: this.checked
            }
        }));

        this._observeMutations();
    }

    get checked() {
        return this._focusableElement.getAttribute('aria-checked') === 'true';
    }

    set disabled(isDisabled) {
        this._unobserveMutations();

        this._focusableElement.setAttribute('aria-disabled', isDisabled.toString());
        this._focusableElement.setAttribute('tabindex', isDisabled ? '-1' : '0');

        this._observeMutations();
    }

    get disabled() {
        return this._focusableElement.getAttribute('aria-disabled') === 'true';
    }

    set labelledby(theId) {
        this._unobserveMutations();

        this._focusableElement.setAttribute('aria-labelledby', theId);

        // customElementMode a11y workaround
        // aria-labelledby cannot resolve element id references that live outside of the Shadow DOM
        // as a workaround we can use aria-label
        if (this._options.customElementMode) {
            const labellingEl = document.getElementById(this.labelledby);

            if (labellingEl && labellingEl.innerText !== '') {
                this.label = labellingEl.innerText;
            }
        }

        this._observeMutations();
    }

    get labelledby() {
        return this._focusableElement.getAttribute('aria-labelledby');
    }

    get label() {
        return this._focusableElement.getAttribute('aria-label');
    }

    set label(theLabel) {
        this._unobserveMutations();

        this._focusableElement.setAttribute('aria-label', theLabel);

        this._observeMutations();
    }

    toggle() {
        this.checked = !(this.checked);
    }

    destroy() {
        this._unobserveMutations();
        this._unobserveEvents();
        this._onClickListener = null;
        this._onKeyDownListener = null;
        this._onMutationListener = null;
    }
}

function _onKeyDown(e) {
    if (!this.disabled) {
        switch (e.keyCode) {
            case 32:
                e.preventDefault();
                this.toggle();
                break;
            case 37:
                this.checked = false;
                break;
            case 39:
                this.checked = true;
                break;
            default:
                break;
        }
    }
}

function _onClick() {
    if (!this.disabled) {
        this.toggle();
    }
}

function _onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this.el.dispatchEvent(new CustomEvent('makeup-switch-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}
