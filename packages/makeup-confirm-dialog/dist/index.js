"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Lightbox = require('makeup-dialog').Lightbox;

var defaultOptions = {
  baseClass: 'confirm-dialog',
  closeButtonSelector: '.confirm-dialog__close',
  quickDismiss: true,
  confirmButtonSelector: '.confirm-dialog__confirm',
  focusManagementIndex: 1,
  rejectButtonSelector: '.confirm-dialog__reject',
  windowSelector: '.confirm-dialog__window'
};

module.exports = /*#__PURE__*/function (_Lightbox) {
  _inherits(_class, _Lightbox);

  var _super = _createSuper(_class);

  function _class(el) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, _class);

    return _super.call(this, el, Object.assign({}, defaultOptions, selectedOptions));
  }

  _createClass(_class, [{
    key: "_observeEvents",
    value: function _observeEvents() {
      _get(_getPrototypeOf(_class.prototype), "_observeEvents", this).call(this);

      this._confirmButtonEl = this._el.querySelector(this._options.confirmButtonSelector);
      this._rejectButtonEl = this._el.querySelector(this._options.rejectButtonSelector);
      this._onConfirmButtonClickListener = _onConfirmButtonClick.bind(this);
      this._onRejectButtonClickListener = _onRejectButtonClick.bind(this);

      this._confirmButtonEl.addEventListener('click', this._onConfirmButtonClickListener);

      this._rejectButtonEl.addEventListener('click', this._onRejectButtonClickListener);
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      _get(_getPrototypeOf(_class.prototype), "_unobserveEvents", this).call(this);

      this._confirmButtonEl.removeEventListener('click', this._onConfirmButtonClickListener);

      this._rejectButtonEl.removeEventListener('click', this._onRejectButtonClickListener);
    }
  }, {
    key: "confirm",
    value: function confirm() {
      this._hide();

      this._el.dispatchEvent(new CustomEvent('dialog-confirm'));
    }
  }, {
    key: "reject",
    value: function reject() {
      this._hide();

      this._el.dispatchEvent(new CustomEvent('dialog-reject'));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);

      this._onConfirmButtonClickListener = null;
      this._onRejectButtonClickListener = null;
    }
  }]);

  return _class;
}(Lightbox);

function _onConfirmButtonClick() {
  this.confirm();
}

function _onRejectButtonClick() {
  this.reject();
}