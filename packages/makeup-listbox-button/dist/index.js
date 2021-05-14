"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Expander = require('makeup-expander');

var Listbox = require('makeup-listbox');

var defaultOptions = {
  autoSelect: true,
  buttonLabelSelector: '.expand-btn__text',
  collapseTimeout: 150,
  customElementMode: false,
  listboxSelector: '.listbox-button__listbox'
};

module.exports = /*#__PURE__*/function () {
  function _class(widgetEl, selectedOptions) {
    var _this$_buttonEl$datas;

    _classCallCheck(this, _class);

    this._options = _extends({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._buttonEl = this.el.querySelector('button');
    this._buttonLabelEl = widgetEl.querySelector(this._options.buttonLabelSelector);
    this._buttonPrefix = (_this$_buttonEl$datas = this._buttonEl.dataset) === null || _this$_buttonEl$datas === void 0 ? void 0 : _this$_buttonEl$datas.listboxButtonPrefix;
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

  _createClass(_class, [{
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this._buttonEl, {
          attributeFilter: ['aria-expanded'],
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
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._buttonEl.removeEventListener('click', this._onButtonFirstClickListener);

      this.listbox.el.removeEventListener('click', this._onListboxClickListener);
      this.listbox.el.removeEventListener('keydown', this._onListboxKeyDownListener);
      this.listbox.el.removeEventListener('makeup-listbox-change', this._onListboxChangeListener);
    }
  }, {
    key: "_observeEvents",
    value: function _observeEvents() {
      if (this._destroyed !== true) {
        this._buttonEl.addEventListener('click', this._onButtonFirstClickListener, {
          once: true
        });

        this.listbox.el.addEventListener('click', this._onListboxClickListener);
        this.listbox.el.addEventListener('keydown', this._onListboxKeyDownListener);
        this.listbox.el.addEventListener('makeup-listbox-change', this._onListboxChangeListener);
      }
    }
  }, {
    key: "collapse",
    value: function collapse() {
      var widget = this;
      setTimeout(function () {
        widget._unobserveMutations();

        widget._expander.collapse();

        widget._observeMutations();

        widget._buttonEl.focus();
      }, this._options.collapseTimeout);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveEvents();

      this._unobserveMutations();

      this._onButtonFirstClickListener = null;
      this._onListboxClickListener = null;
      this._onListboxKeyDownListener = null;
      this._onListboxChangeListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _class;
}(); // listbox element should be hidden in initial SSR markup (for progressive enhancement)


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
  var fromValue = this._buttonLabelEl.innerText;
  var toValue = e.detail.optionValue;

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
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this.el.dispatchEvent(new CustomEvent('makeup-listbox-button-mutation', {
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
