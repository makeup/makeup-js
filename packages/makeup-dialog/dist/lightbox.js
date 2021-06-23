"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ModalDialog = require('./dialog.js').ModalDialog;

var defaultLightboxOptions = {
  baseClass: 'lightbox-dialog',
  baseClassModifier: '',
  quickDismiss: true,
  closeButtonSelector: '.lightbox-dialog__close',
  windowSelector: '.lightbox-dialog__window'
};

module.exports = /*#__PURE__*/function (_ModalDialog) {
  _inherits(_class, _ModalDialog);

  var _super = _createSuper(_class);

  function _class(el) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, _class);

    return _super.call(this, el, Object.assign({}, defaultLightboxOptions, selectedOptions));
  }

  _createClass(_class, [{
    key: "_observeEvents",
    value: function _observeEvents() {
      _get(_getPrototypeOf(_class.prototype), "_observeEvents", this).call(this);

      this._onClickListener = _onClick.bind(this);

      this._el.addEventListener('click', this._onClickListener);
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      _get(_getPrototypeOf(_class.prototype), "_unobserveEvents", this).call(this);

      this._el.removeEventListener('click', this._onClickListener);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);

      this._onClickListener = null;
    }
  }]);

  return _class;
}(ModalDialog);

function _onClick(e) {
  if (this._options.quickDismiss === true && e.target === this._el) {
    this.close();
  }
}