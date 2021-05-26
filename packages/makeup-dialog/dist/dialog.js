"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = require('makeup-modal');

var focusables = require('makeup-focusables');

var transition = require('./transition.js');

var defaultDialogOptions = {
  baseClass: 'dialog',
  closeButtonSelector: '.dialog__close',
  focusManagementIndex: 0,
  quickDismiss: true,
  transitionsModifier: 'mask-fade'
};

var Dialog = /*#__PURE__*/function () {
  function Dialog(widgetEl, selectedOptions) {
    _classCallCheck(this, Dialog);

    this._options = _extends({}, defaultDialogOptions, selectedOptions);
    this._el = widgetEl;
    this._windowEl = this._el.querySelector(this._options.windowSelector);
    this._closeButtonEl = this._el.querySelector(this._options.closeButtonSelector);
    this._hasTransitions = this._el.classList.contains("".concat(this._options.baseClass, "--").concat(this._options.transitionsModifier));
    this._onCloseButtonClickListener = _onCloseButtonClick.bind(this);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onOpenTransitionEndCallback = _onOpenTransitionEnd.bind(this);
    this._onCloseTransitionEndCallback = _onCloseTransitionEnd.bind(this);

    this._el.classList.add("".concat(this._options.baseClass, "--js"));

    if (!this.hidden) {
      this._observeEvents();
    }
  }

  _createClass(Dialog, [{
    key: "focusables",
    get: function get() {
      return focusables(this._windowEl);
    }
  }, {
    key: "modal",
    get: function get() {
      return this._el.getAttribute('aria-modal') === 'true';
    }
  }, {
    key: "hidden",
    get: function get() {
      return this._el.hidden;
    }
  }, {
    key: "open",
    value: function open() {
      this._show();

      this._el.dispatchEvent(new CustomEvent('dialog-open'));
    }
  }, {
    key: "close",
    value: function close() {
      this._hide();

      this._el.dispatchEvent(new CustomEvent('dialog-close'));
    }
  }, {
    key: "_show",
    value: function _show() {
      if (this._hasTransitions) {
        if (this._cancelTransition) {
          this._cancelTransition();
        }

        this._cancelTransition = transition(this._el, "".concat(this._options.baseClass, "--show"), this._onOpenTransitionEndCallback);
      } else {
        this._el.hidden = false;
      }

      this._observeEvents();
    }
  }, {
    key: "_hide",
    value: function _hide() {
      if (this._hasTransitions) {
        if (this._cancelTransition) {
          this._cancelTransition();
        }

        this._cancelTransition = transition(this._el, "".concat(this._options.baseClass, "--hide"), this._onCloseTransitionEndCallback);
      } else {
        this._el.hidden = true;
      }

      this._autoDismissTimeout = null;

      this._unobserveEvents();
    }
  }, {
    key: "_observeEvents",
    value: function _observeEvents() {
      document.addEventListener('keydown', this._onKeyDownListener);

      if (this._closeButtonEl) {
        this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._el.removeEventListener('click', this._onCloseButtonClickListener);

      document.removeEventListener('keydown', this._onKeyDownListener);

      if (this._closeButtonEl) {
        this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveEvents();

      this._onCloseButtonClickListener = null;
      this._onKeyDownListener = null;
      this._onOpenTransitionEndCallback = null;
      this._onCloseTransitionEndCallback = null;
      this._autoDismissTimeout = null;
    }
  }]);

  return Dialog;
}();

var ModalDialog = /*#__PURE__*/function (_Dialog) {
  _inherits(ModalDialog, _Dialog);

  var _super = _createSuper(ModalDialog);

  function ModalDialog(el) {
    var _this;

    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ModalDialog);

    _this = _super.call(this, el, _extends({}, defaultDialogOptions, selectedOptions));

    _this._el.setAttribute('aria-modal', 'true');

    if (!_this.hidden) {
      _doModalFocusManagement(_assertThisInitialized(_this));
    }

    return _this;
  }

  _createClass(ModalDialog, [{
    key: "_show",
    value: function _show() {
      _get(_getPrototypeOf(ModalDialog.prototype), "_show", this).call(this);

      console.log(this._hasTransitions);

      if (!this._hasTransitions) {
        _doModalFocusManagement(this);
      }
    }
  }, {
    key: "_hide",
    value: function _hide() {
      _get(_getPrototypeOf(ModalDialog.prototype), "_hide", this).call(this);

      if (!this._hasTransitions) {
        Modal.unmodal();
      }
    }
  }]);

  return ModalDialog;
}(Dialog);

function _doModalFocusManagement(dialogWidget) {
  var autoFocusEl = dialogWidget._el.querySelector('[autofocus]');

  if (autoFocusEl) {
    autoFocusEl.focus();
  } else {
    dialogWidget.focusables[dialogWidget._options.focusManagementIndex].focus();
  }

  Modal.modal(dialogWidget._el);
}

function _onOpenTransitionEnd() {
  this._el.hidden = false;
  this._cancelTransition = undefined;

  if (this.modal) {
    _doModalFocusManagement(this);
  }
}

function _onCloseTransitionEnd() {
  if (this.modal) {
    Modal.unmodal();
  }

  this._el.hidden = true;
  this._cancelTransition = undefined;
}

function _onKeyDown(e) {
  if (this._options.quickDismiss === true && e.keyCode === 27) {
    this.close();
  }
}

function _onCloseButtonClick() {
  this.close();
}

module.exports = {
  Dialog: Dialog,
  ModalDialog: ModalDialog
};