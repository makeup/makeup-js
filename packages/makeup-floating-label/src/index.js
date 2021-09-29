'use strict';

const defaultOptions = {
    labelElementAnimateModifier: 'floating-label__label--animate',
    labelElementInlineModifier: 'floating-label__label--inline',
    labelElementFocusModifier: 'floating-label__label--focus',
    labelElementInvalidModifier: 'floating-label__label--invalid',
    labelElementDisabledModifier: 'floating-label__label--disabled',
    textboxElementBackgroundRGB: [
        'rgb(255, 255, 255)',
        'rgb(247, 247, 247)',
        'rgb(245, 245, 245)',
        'rgb(230, 32, 72)',
        'rgb(254, 245, 246)'
    ]
};

function getPlaceHolder(textboxEl) {
    if (isSelect(textboxEl)) {
        const firstOption = textboxEl.querySelector('option');
        return !firstOption.value ? firstOption.text : null;
    } else if (textboxEl.hasAttribute('placeholder')) {
        return textboxEl.getAttribute('placeholder');
    }
}

function setPlaceholder(textboxEl, value) {
    if (isSelect(textboxEl)) {
        textboxEl.style['min-width'] = '';
        const beforeWidth = textboxEl.offsetWidth;

        textboxEl.querySelector('option').text = value;
        if (!value && beforeWidth > textboxEl.offsetWidth) {
            textboxEl.style['min-width'] = `${beforeWidth}px`;
        }
    } else {
        if (value) {
            textboxEl.setAttribute('placeholder', value);
        } else {
            textboxEl.removeAttribute('placeholder');
        }
    }
}

function mutatePlaceholder(textboxEl, textboxFocus, placeholder) {
    let placeholderCheck;
    if (isSelect(textboxEl)) {
        const firstOption = textboxEl.querySelector('option');
        if (!!firstOption.value) {
            // If first option has a value then it is not a placeholder
            return;
        }
        placeholderCheck = !!firstOption.text;
    } else {
        placeholderCheck = textboxEl.hasAttribute('placeholder');
    }
    if (!!placeholder && textboxFocus && !placeholderCheck) {
        // Input has focus, make sure it has "placeholder" option
        setPlaceholder(textboxEl, placeholder);
    } else if (!textboxFocus && placeholderCheck) {
        setPlaceholder(textboxEl, '');
    }
}

function modifyPlaceholder(textboxEl, textboxFocus, placeholder) {
    if (textboxFocus) {
        if (placeholder) {
            setPlaceholder(textboxEl, placeholder);
        }
    } else {
        setPlaceholder(textboxEl, '');
    }
}

function onMutation() {
    const textboxFocus = isFocused(this.textboxEl);

    this.placeholder = getPlaceHolder(this.textboxEl) || this.placeholder;

    mutatePlaceholder(this.textboxEl, textboxFocus, this.placeholder);

    if (isInvalid(this.textboxEl)) {
        this.labelEl.classList.add(this.options.labelElementInvalidModifier);
    } else {
        this.labelEl.classList.remove(this.options.labelElementInvalidModifier);
    }
    if (isDisabled(this.textboxEl)) {
        this.labelEl.classList.add(this.options.labelElementDisabledModifier);
    } else {
        this.labelEl.classList.remove(this.options.labelElementDisabledModifier);
    }
}

function isFocused(textboxEl) {
    return document.activeElement === textboxEl;
}

function isSelect(textboxEl) {
    return textboxEl.tagName === 'SELECT';
}

function hasValue(input) {
    return input.value.length > 0;
}

function isDisabled(input) {
    return input.hasAttribute('disabled');
}

function isInvalid(input) {
    return input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true';
}

function isAutofilled(input, color) {
    // check for computed background color because of Chrome autofill bug
    // https://stackoverflow.com/questions/35049555/chrome-autofill-autocomplete-no-value-for-password/35783761#35783761
    if (!isSelect(input)) {
        const bgColor = getComputedStyle(input).backgroundColor;
        return Array.isArray(color) ? !color.includes(bgColor) : bgColor !== color;
    }
    return false;
}

function _onBlur() {
    if (!hasValue(this.textboxEl)) {
        this.labelEl.classList.add(this.options.labelElementInlineModifier);
    }
    this.labelEl.classList.remove(this.options.labelElementFocusModifier);

    if (isInvalid(this.textboxEl)) {
        this.labelEl.classList.add(this.options.labelElementInvalidModifier);
    }

    modifyPlaceholder(this.textboxEl, false, this.placeholder);
}

function _onFocus() {
    this.labelEl.classList.add(this.options.labelElementAnimateModifier);
    this.labelEl.classList.add(this.options.labelElementFocusModifier);
    this.labelEl.classList.remove(this.options.labelElementInlineModifier);
    this.labelEl.classList.remove(this.options.labelElementInvalidModifier);

    modifyPlaceholder(this.textboxEl, true, this.placeholder);
}

module.exports = class {
    constructor(el, userOptions) {
        this.options = Object.assign({}, defaultOptions, userOptions);

        this._observer = new MutationObserver(onMutation.bind(this));

        this.rootEl = el;
        this.labelEl = this.rootEl.querySelector('label');
        this.textboxEl = this.rootEl.querySelector('input,textarea,select');

        this._onBlurListener = _onBlur.bind(this);
        this._onFocusListener = _onFocus.bind(this);

        this.textboxEl.addEventListener('blur', this._onBlurListener);
        this.textboxEl.addEventListener('focus', this._onFocusListener);

        if (!hasValue(this.textboxEl) && !isAutofilled(this.textboxEl, this.options.textboxElementBackgroundRGB)) {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
        if (isFocused(this.textboxEl)) {
            this.labelEl.classList.add(this.options.labelElementFocusModifier);
        }

        onMutation.call(this);

        this._observer.observe(this.textboxEl, {
            childList: isSelect(this.textboxEl),
            subtree: isSelect(this.textboxEl),
            attributeFilter: ['disabled', 'aria-invalid', 'placeholder', 'value'],
            attributes: true
        });
    }

    destroy() {
        this._observer.disconnect();
    }

    refresh() {
        if (hasValue(this.textboxEl) || isAutofilled(this.textboxEl, this.options.textboxElementBackgroundRGB)) {
            this.labelEl.classList.remove(this.options.labelElementInlineModifier);
        } else {
            this.labelEl.classList.add(this.options.labelElementInlineModifier);
        }
        if (isFocused(this.textboxEl)) {
            this.labelEl.classList.add(this.options.labelElementFocusModifier);
        }
    }
};
