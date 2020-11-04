'use strict';

const defaultOptions = {
    labelElementAnimateModifier: 'floating-label__label--animate',
    labelElementInlineModifier: 'floating-label__label--inline',
    labelElementFocusModifier: 'floating-label__label--focus',
    labelElementInvalidModifier: 'floating-label__label--invalid',
    textboxElementBackgroundRGB: 'rgb(255, 255, 255)'
};

function hasValue(input) {
    return input.value.length > 0;
}

function isInvalid(input) {
    return input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true';
}

function isAutofilled(input, color) {
    // check for computed background color because of Chrome autofill bug
    // https://stackoverflow.com/questions/35049555/chrome-autofill-autocomplete-no-value-for-password/35783761#35783761
    return getComputedStyle(input).backgroundColor !== color;
}

function _onBlur() {
    if (!hasValue(this.textboxEl)) {
        this.labelEl.classList.add(this.options.labelElementInlineModifier);
    }
    this.labelEl.classList.remove(this.options.labelElementFocusModifier);
}

function _onFocus() {
    this.labelEl.classList.add(this.options.labelElementAnimateModifier);
    this.labelEl.classList.add(this.options.labelElementFocusModifier);
    this.labelEl.classList.remove(this.options.labelElementInlineModifier);
}

module.exports = class {
    constructor(el, userOptions) {
        this.options = Object.assign({}, defaultOptions, userOptions);

        this.rootEl = el;
        this.labelEl = this.rootEl.querySelector('label');
        this.textboxEl = this.rootEl.querySelector('input');

        this._onBlurListener = _onBlur.bind(this);
        this._onFocusListener = _onFocus.bind(this);

        this.textboxEl.addEventListener('blur', this._onBlurListener);
        this.textboxEl.addEventListener('focus', this._onFocusListener);

        if (!hasValue(this.textboxEl) && !isAutofilled(this.textboxEl, this.options.textboxElementBackgroundRGB)) {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
        if (document.activeElement === this.textboxEl) {
            this.labelEl.classList.add(this.options.labelElementFocusModifier);
        }

        if (isInvalid(this.textboxEl)) {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
    }

    setInvalid(hasError) {
        if (hasError) {
            this.textboxEl.setAttribute('aria-invalid', 'true');
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        } else {
            this.textboxEl.setAttribute('aria-invalid', 'false');
            this.labelEl.classList.remove(this.options.labelElementInlineModifier);
        }
    }

    refresh() {
        if (hasValue(this.textboxEl) || isAutofilled(this.textboxEl, this.options.textboxElementBackgroundRGB)) {
            this.labelEl.classList.remove(this.options.labelElementInlineModifier);
        } else {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
        if (document.activeElement === this.textboxEl) {
            this.labelEl.classList.add(this.options.labelElementFocusModifier);
        }
        if (isInvalid(this.textboxEl)) {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
    }
};
