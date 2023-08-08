"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupDialog = _interopRequireDefault(require("makeup-dialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultLightboxOptions = {
  baseClass: "lightbox-dialog",
  baseClassModifier: "",
  quickDismiss: true,
  closeButtonSelector: ".lightbox-dialog__close",
  windowSelector: ".lightbox-dialog__window"
};
class _default extends _makeupDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultLightboxOptions, selectedOptions, {
      modal: true
    }));
  }
  _observeEvents() {
    super._observeEvents();
    this._onClickListener = _onClick.bind(this);
    this._el.addEventListener("click", this._onClickListener);
  }
  _unobserveEvents() {
    super._unobserveEvents();
    this._el.removeEventListener("click", this._onClickListener);
  }
  destroy() {
    super.destroy();
    this._onClickListener = null;
  }
}
exports.default = _default;
function _onClick(e) {
  if (this._options.quickDismiss === true && e.target === this._el) {
    this.close();
  }
}
