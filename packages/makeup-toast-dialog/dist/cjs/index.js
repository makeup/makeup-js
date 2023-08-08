"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupDialog = _interopRequireDefault(require("makeup-dialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultToastOptions = {
  baseClass: "toast-dialog",
  closeButtonSelector: ".toast-dialog__close",
  ctaButtonSelector: ".toast-dialog__cta",
  transitionsModifier: "transition"
};
class _default extends _makeupDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultToastOptions, selectedOptions));
  }
  _show() {
    super._show();
  }
  _observeEvents() {
    super._observeEvents();
    this._ctaEl = this._el.querySelector(this._options.ctaButtonSelector);
    if (this._ctaEl) {
      this._onCtaClickListener = _onCtaButtonClick.bind(this);
      this._ctaEl.addEventListener("click", this._onCtaClickListener);
    }
  }
  _unobserveEvents() {
    super._unobserveEvents();
    if (this._ctaEl) {
      this._ctaEl.removeEventListener("click", this._onCtaClickListener);
    }
  }
  cta() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent("dialog-cta"));
  }
  destroy() {
    super.destroy();
    this._onCtaClickListener = null;
  }
}
exports.default = _default;
function _onCtaButtonClick() {
  this.cta();
}
