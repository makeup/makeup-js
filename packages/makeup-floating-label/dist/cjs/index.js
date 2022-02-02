"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var defaultOptions = {
  labelElementAnimateModifier: 'floating-label__label--animate',
  labelElementInlineModifier: 'floating-label__label--inline',
  labelElementFocusModifier: 'floating-label__label--focus',
  labelElementInvalidModifier: 'floating-label__label--invalid',
  labelElementDisabledModifier: 'floating-label__label--disabled',
  textboxElementBackgroundRGB: ['rgb(255, 255, 255)', 'rgb(247, 247, 247)', 'rgb(245, 245, 245)', 'rgb(230, 32, 72)', 'rgb(254, 245, 246)']
}; // Common getter. Will get either first option text (for select),
// or placeholder for textbox

function getPlaceHolder(formControlEl) {
  if (isSelect(formControlEl)) {
    var firstOption = formControlEl.querySelector('option');
    return !firstOption.value ? firstOption.text : null;
  } else if (formControlEl.hasAttribute('placeholder')) {
    return formControlEl.getAttribute('placeholder');
  }
} // Common setter. Will set either first option text (for select),
// or placeholder for textbox


function setPlaceholder(formControlEl, value) {
  if (isSelect(formControlEl)) {
    formControlEl.style['min-width'] = '';
    var beforeWidth = formControlEl.offsetWidth;
    formControlEl.querySelector('option').text = value;

    if (!value && beforeWidth > formControlEl.offsetWidth) {
      formControlEl.style['min-width'] = "".concat(beforeWidth, "px");
    }
  } else if (value) {
    formControlEl.setAttribute('placeholder', value);
  } else {
    formControlEl.removeAttribute('placeholder');
  }
} // Called on mutatation. Sets placeholder for current state (focused or unfocused)


function checkForPlaceholder(formControlEl) {
  if (isSelect(formControlEl)) {
    var firstOption = formControlEl.querySelector('option');

    if (!!firstOption.value) {
      // If first option has a value then it is not a placeholder
      return;
    }

    return !!firstOption.text;
  }

  return formControlEl.hasAttribute('placeholder');
}

function onMutation() {
  var textboxFocus = isFocused(this.formControlEl);
  this.placeholder = getPlaceHolder(this.formControlEl) || this.placeholder;
  var placeholderCheck = checkForPlaceholder(this.formControlEl, this.placeholder);

  if (!!this.placeholder && textboxFocus && !placeholderCheck) {
    // Input has focus, make sure it has "placeholder" option
    setPlaceholder(this.formControlEl, this.placeholder);
  } else if (!textboxFocus && placeholderCheck) {
    setPlaceholder(this.formControlEl, '');
  }

  if (isInvalid(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInvalidModifier);
  } else {
    this.labelEl.classList.remove(this.options.labelElementInvalidModifier);
  }

  if (isDisabled(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementDisabledModifier);
  } else {
    this.labelEl.classList.remove(this.options.labelElementDisabledModifier);
  }
}

function isFocused(formControlEl) {
  return document.activeElement === formControlEl;
}

function isSelect(formControlEl) {
  return formControlEl.tagName === 'SELECT';
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
    var bgColor = getComputedStyle(input).backgroundColor;
    return Array.isArray(color) ? !color.includes(bgColor) : bgColor !== color;
  }

  return false;
}

function _onBlur() {
  if (!hasValue(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInlineModifier);
  }

  this.labelEl.classList.remove(this.options.labelElementFocusModifier);

  if (isInvalid(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInvalidModifier);
  }

  setPlaceholder(this.formControlEl, '');
}

function _onFocus() {
  this.labelEl.classList.add(this.options.labelElementAnimateModifier);
  this.labelEl.classList.add(this.options.labelElementFocusModifier);
  this.labelEl.classList.remove(this.options.labelElementInlineModifier);
  this.labelEl.classList.remove(this.options.labelElementInvalidModifier);

  if (this.placeholder) {
    setPlaceholder(this.formControlEl, this.placeholder);
  }
}

var _default = /*#__PURE__*/function () {
  function _default(el, userOptions) {
    _classCallCheck(this, _default);

    this.options = Object.assign({}, defaultOptions, userOptions);
    this._observer = new MutationObserver(onMutation.bind(this));
    this.rootEl = el;
    this.labelEl = this.rootEl.querySelector('label');
    this.formControlEl = this.rootEl.querySelector('input,textarea,select');
    this._onBlurListener = _onBlur.bind(this);
    this._onFocusListener = _onFocus.bind(this);
    this.formControlEl.addEventListener('blur', this._onBlurListener);
    this.formControlEl.addEventListener('focus', this._onFocusListener);

    if (!hasValue(this.formControlEl) && !isAutofilled(this.formControlEl, this.options.textboxElementBackgroundRGB)) {
      this.labelEl.classList.add(this.options.labelElementInlineModifier);
    }

    if (isFocused(this.formControlEl)) {
      this.labelEl.classList.add(this.options.labelElementFocusModifier);
    }

    onMutation.call(this);

    this._observer.observe(this.formControlEl, {
      childList: isSelect(this.formControlEl),
      subtree: isSelect(this.formControlEl),
      attributeFilter: ['disabled', 'aria-invalid', 'placeholder', 'value'],
      attributes: true
    });
  }

  _createClass(_default, [{
    key: "destroy",
    value: function destroy() {
      this._observer.disconnect();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (hasValue(this.formControlEl) || isSelect(this.formControlEl) || isAutofilled(this.formControlEl, this.options.textboxElementBackgroundRGB)) {
        this.labelEl.classList.remove(this.options.labelElementInlineModifier);
      } else {
        this.labelEl.classList.add(this.options.labelElementInlineModifier);
      }

      if (isFocused(this.formControlEl)) {
        this.labelEl.classList.add(this.options.labelElementFocusModifier);
      }
    }
  }]);

  return _default;
}();

exports.default = _default;
