"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  bem: {
    control: 'switch__control'
  },
  customElementMode: false
};

var _default = /*#__PURE__*/function () {
  function _default(el, selectedOptions) {
    _classCallCheck(this, _default);

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

  _createClass(_default, [{
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this._focusableElement, {
          attributes: true,
          childList: false,
          subtree: false
        });
      }
    }
  }, {
    key: "_unobserveMutations",
    value: function _unobserveMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.disconnect();
      }
    }
  }, {
    key: "_observeEvents",
    value: function _observeEvents() {
      this._focusableElement.addEventListener('click', this._onClickListener);

      this._focusableElement.addEventListener('keydown', this._onKeyDownListener);
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._focusableElement.removeEventListener('click', this._onClickListener);

      this._focusableElement.removeEventListener('keydown', this._onKeyDownListener);
    }
  }, {
    key: "_focusableElement",
    get: function get() {
      return this.el.querySelector(".".concat(this._options.bem.control));
    }
  }, {
    key: "checked",
    get: function get() {
      return this._focusableElement.getAttribute('aria-checked') === 'true';
    },
    set: function set(isChecked) {
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
  }, {
    key: "disabled",
    get: function get() {
      return this._focusableElement.getAttribute('aria-disabled') === 'true';
    },
    set: function set(isDisabled) {
      this._unobserveMutations();

      this._focusableElement.setAttribute('aria-disabled', isDisabled.toString());

      this._focusableElement.setAttribute('tabindex', isDisabled ? '-1' : '0');

      this._observeMutations();
    }
  }, {
    key: "labelledby",
    get: function get() {
      return this._focusableElement.getAttribute('aria-labelledby');
    },
    set: function set(theId) {
      this._unobserveMutations();

      this._focusableElement.setAttribute('aria-labelledby', theId); // customElementMode a11y workaround
      // aria-labelledby cannot resolve element id references that live outside of the Shadow DOM
      // as a workaround we can use aria-label


      if (this._options.customElementMode) {
        var labellingEl = document.getElementById(this.labelledby);

        if (labellingEl && labellingEl.innerText !== '') {
          this.label = labellingEl.innerText;
        }
      }

      this._observeMutations();
    }
  }, {
    key: "label",
    get: function get() {
      return this._focusableElement.getAttribute('aria-label');
    },
    set: function set(theLabel) {
      this._unobserveMutations();

      this._focusableElement.setAttribute('aria-label', theLabel);

      this._observeMutations();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.checked = !this.checked;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._unobserveMutations();

      this._unobserveEvents();

      this._onClickListener = null;
      this._onKeyDownListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _default;
}();

exports.default = _default;

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
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this.el.dispatchEvent(new CustomEvent('makeup-switch-mutation', {
          detail: {
            attributeName: mutation.attributeName
          }
        }));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
