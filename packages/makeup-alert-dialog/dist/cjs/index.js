"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupLightboxDialog = _interopRequireDefault(require("makeup-lightbox-dialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultAlertOptions = {
  baseClass: 'alert-dialog',
  baseClassModifier: 'alert',
  quickDismiss: false,
  acknowledgeButtonSelector: '.alert-dialog__acknowledge',
  windowSelector: '.alert-dialog__window'
};
class _default extends _makeupLightboxDialog.default {
  constructor(el) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultAlertOptions, selectedOptions));
  }
  _observeEvents() {
    super._observeEvents();
    this._acknowledgeButtonEl = this._el.querySelector(this._options.acknowledgeButtonSelector);
    this._onAcknowledgeButtonClickListener = _onAcknowledgeButtonClick.bind(this);
    this._acknowledgeButtonEl.addEventListener('click', this._onAcknowledgeButtonClickListener);
  }
  _unobserveEvents() {
    super._unobserveEvents();
    this._acknowledgeButtonEl.removeEventListener('click', this._onAcknowledgeButtonClickListener);
  }
  acknowledge() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent('dialog-acknowledge'));
  }
  destroy() {
    super.destroy();
    this._onAcknowledgeButtonClickListener = null;
  }
}
exports.default = _default;
function _onAcknowledgeButtonClick() {
  this.acknowledge();
}
