"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupDialog = _interopRequireDefault(require("makeup-dialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultSnackbarOptions = {
  autoDismissTimer: 6000,
  baseClass: 'snackbar-dialog',
  ctaButtonSelector: '.snackbar-dialog__cta',
  transitionsModifier: 'transition'
};
class _default extends _makeupDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultSnackbarOptions, selectedOptions));
    this._autoDismissTimeout = null;
  }
  _show() {
    var _this = this;
    super._show();
    this._autoDismissTimeout = setTimeout(function () {
      let widget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this;
      return widget.close();
    }, this._options.autoDismissTimer);
  }
  _observeEvents() {
    super._observeEvents();
    this._ctaEl = this._el.querySelector(this._options.ctaButtonSelector);
    if (this._ctaEl) {
      this._onCtaClickListener = _onCtaButtonClick.bind(this);
      this._ctaEl.addEventListener('click', this._onCtaClickListener);
    }
  }
  _unobserveEvents() {
    super._unobserveEvents();
    if (this._ctaEl) {
      this._ctaEl.removeEventListener('click', this._onCtaClickListener);
    }
  }
  cta() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent('dialog-cta'));
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
