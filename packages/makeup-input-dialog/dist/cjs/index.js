"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupLightboxDialog = _interopRequireDefault(require("makeup-lightbox-dialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultInputOptions = {
  baseClass: 'lightbox-dialog',
  baseClassModifier: 'input',
  submitButtonSelector: '.lightbox-dialog__submit',
  cancelButtonSelector: '.lightbox-dialog__cancel',
  windowSelector: '.lightbox-dialog__window'
};
class _default extends _makeupLightboxDialog.default {
  constructor(el) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultInputOptions, selectedOptions));
  }
  _observeEvents() {
    super._observeEvents();
    this._submitButtonEl = this._el.querySelector(this._options.submitButtonSelector);
    this._cancelButtonEl = this._el.querySelector(this._options.cancelButtonSelector);
    this._onSubmitButtonClickListener = _onSubmitButtonClick.bind(this);
    this._onCancelButtonClickListener = _onCancelButtonClick.bind(this);
    this._submitButtonEl.addEventListener('click', this._onSubmitButtonClickListener);
    this._cancelButtonEl.addEventListener('click', this._onCancelButtonClickListener);
  }
  _unobserveEvents() {
    super._unobserveEvents();
    this._submitButtonEl.removeEventListener('click', this._onSubmitButtonClickListener);
    this._cancelButtonEl.removeEventListener('click', this._onCancelButtonClickListener);
  }
  submit() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent('dialog-submit'));
  }
  cancel() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent('dialog-cancel'));
  }
  destroy() {
    super.destroy();
    this._onSubmitButtonClickListener = null;
    this._onCancelButtonClickListener = null;
  }
}
exports.default = _default;
function _onSubmitButtonClick() {
  this.submit();
}
function _onCancelButtonClick() {
  this.cancel();
}
