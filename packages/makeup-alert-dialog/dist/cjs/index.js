"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeupLightboxDialog = _interopRequireDefault(require("makeup-lightbox-dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var defaultAlertOptions = {
  baseClass: 'alert-dialog',
  baseClassModifier: 'alert',
  quickDismiss: false,
  acknowledgeButtonSelector: '.alert-dialog__acknowledge',
  windowSelector: '.alert-dialog__window'
};

var _default = /*#__PURE__*/function (_Lightbox) {
  _inherits(_default, _Lightbox);

  var _super = _createSuper(_default);

  function _default(el) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, _default);

    return _super.call(this, el, Object.assign({}, defaultAlertOptions, selectedOptions));
  }

  _createClass(_default, [{
    key: "_observeEvents",
    value: function _observeEvents() {
      _get(_getPrototypeOf(_default.prototype), "_observeEvents", this).call(this);

      this._acknowledgeButtonEl = this._el.querySelector(this._options.acknowledgeButtonSelector);
      this._onAcknowledgeButtonClickListener = _onAcknowledgeButtonClick.bind(this);

      this._acknowledgeButtonEl.addEventListener('click', this._onAcknowledgeButtonClickListener);
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      _get(_getPrototypeOf(_default.prototype), "_unobserveEvents", this).call(this);

      this._acknowledgeButtonEl.removeEventListener('click', this._onAcknowledgeButtonClickListener);
    }
  }, {
    key: "acknowledge",
    value: function acknowledge() {
      this._hide();

      this._el.dispatchEvent(new CustomEvent('dialog-acknowledge'));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

      this._onAcknowledgeButtonClickListener = null;
    }
  }]);

  return _default;
}(_makeupLightboxDialog.default);

exports.default = _default;

function _onAcknowledgeButtonClick() {
  this.acknowledge();
}
