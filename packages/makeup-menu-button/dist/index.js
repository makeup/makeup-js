"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Expander = require('makeup-expander');

var Menu = require('makeup-menu');

var defaultOptions = {
  customElementMode: false,
  expandedClass: 'expand-btn--expanded',
  menuSelector: '.menu-button__menu',
  buttonTextSelector: ".expand-btn__text"
};

module.exports = /*#__PURE__*/function () {
  function _class(widgetEl, selectedOptions) {
    var _this$_buttonEl$datas;

    _classCallCheck(this, _class);

    this._options = _extends({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._buttonEl = widgetEl.querySelector('button');
    this.menu = new Menu(widgetEl.querySelector(this._options.menuSelector));
    this._buttonPrefix = (_this$_buttonEl$datas = this._buttonEl.dataset) === null || _this$_buttonEl$datas === void 0 ? void 0 : _this$_buttonEl$datas.makeupMenuButtonPrefix;
    this._buttonTextEl = this._buttonEl.querySelector(defaultOptions.buttonTextSelector);
    this._expander = new Expander(widgetEl, {
      alwaysDoFocusManagement: true,
      collapseOnClick: true,
      collapseOnClickOut: true,
      collapseOnFocusOut: true,
      contentSelector: this._options.menuSelector,
      expandedClass: this._options.expandedClass,
      expandOnClick: true,
      focusManagement: 'focusable',
      hostSelector: 'button'
    });
    this._onButtonFirstClickListener = _onButtonFirstClick.bind(this);
    this._onMenuKeyDownListener = _onMenuKeyDown.bind(this);
    this._onMenuItemSelectListener = _onMenuItemSelect.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add('menu-button--js');

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
        this._mutationObserver.observe(this.el, {
          attributeFilter: ['aria-expanded', 'disabled'],
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
      if (this._destroyed !== true) {
        this._buttonEl.addEventListener('click', this._onButtonFirstClickListener, {
          once: true
        });

        this.menu.el.addEventListener('keydown', this._onMenuKeyDownListener);
        this.menu.el.addEventListener('makeup-menu-select', this._onMenuItemSelectListener);
        this.menu.el.addEventListener('makeup-menu-change', this._onMenuItemSelectListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._buttonEl.removeEventListener('click', this._onButtonFirstClickListener);

      this.menu.el.removeEventListener('keydown', this._onMenuKeyDownListener);
      this.menu.el.removeEventListener('makeup-menu-select', this._onMenuItemSelectListener);
      this.menu.el.removeEventListener('makeup-menu-change', this._onMenuItemSelectListener);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveMutations();

      this._unobserveEvents();

      this._onButtonFirstClickListener = null;
      this._onMenuKeyDownListener = null;
      this._onMenuItemSelectListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _class;
}();

function _onMutation(mutationsList) {
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this.el.dispatchEvent(new CustomEvent('makeup-menu-button-mutation', {
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

function _onButtonFirstClick() {
  this.menu.el.hidden = false;
}

function _onMenuKeyDown(e) {
  if (e.keyCode === 27) {
    this._expander.collapse();

    this._buttonEl.focus();
  }
}

function _onMenuItemSelect(e) {
  if (this._buttonPrefix && e.detail.el.getAttribute('role') === 'menuitemradio') {
    this._buttonTextEl.innerText = "".concat(this._buttonPrefix, " ").concat(e.detail.el.innerText);
  }

  var widget = this;
  setTimeout(function () {
    widget._expander.collapse();

    widget._buttonEl.focus();
  }, 150);
}
