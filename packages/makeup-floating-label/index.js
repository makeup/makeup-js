'use strict';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
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

module.exports = /*#__PURE__*/function () {
  function _class(el, userOptions) {
    _classCallCheck(this, _class);

    this.options = _extends({}, defaultOptions, userOptions);
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

  _createClass(_class, [{
    key: "setInvalid",
    value: function setInvalid(hasError) {
      if (hasError) {
        this.textboxEl.setAttribute('aria-invalid', 'true');
        this.labelEl.classList.add(this.options.labelElementInlineModifier);
      } else {
        this.textboxEl.setAttribute('aria-invalid', 'false');
        this.labelEl.classList.remove(this.options.labelElementInlineModifier);
      }
    }
  }, {
    key: "refresh",
    value: function refresh() {
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
  }]);

  return _class;
}();
