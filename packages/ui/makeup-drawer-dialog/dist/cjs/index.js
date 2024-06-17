"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupLightboxDialog = _interopRequireDefault(require("makeup-lightbox-dialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultDrawerOptions = {
  baseClass: "drawer-dialog",
  quickDismiss: true,
  closeButtonSelector: ".drawer-dialog__close",
  focusManagementIndex: 1,
  resizeButtonSelector: ".drawer-dialog__handle",
  windowSelector: ".drawer-dialog__window"
};
class _default extends _makeupLightboxDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultDrawerOptions, selectedOptions));
  }
  _observeEvents() {
    super._observeEvents();
    this._resizeButtonEl = this._el.querySelector(this._options.resizeButtonSelector);
    this._onResizeButtonClickListener = _onResizeButtonClick.bind(this);
    this._resizeButtonEl.addEventListener("click", this._onResizeButtonClickListener);
  }
  _unobserveEvents() {
    super._unobserveEvents();
    this._resizeButtonEl.removeEventListener("click", this._onResizeButtonClickListener);
  }
  resize() {
    this._el.querySelector(".drawer-dialog__window").classList.toggle("drawer-dialog__window--expanded");
    this._el.dispatchEvent(new CustomEvent("dialog-resize"));
  }
  destroy() {
    super.destroy();
    this._onResizeButtonClickListener = null;
  }
}
exports.default = _default;
function _onResizeButtonClick() {
  this.resize();
}
