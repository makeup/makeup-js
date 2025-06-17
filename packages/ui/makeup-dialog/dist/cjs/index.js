"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Modal = _interopRequireWildcard(require("makeup-modal"));
var _makeupFocusables = _interopRequireDefault(require("makeup-focusables"));
var _transition = _interopRequireDefault(require("./transition.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const defaultDialogOptions = {
  baseClass: "dialog",
  closeButtonSelector: ".dialog__close",
  focusManagementIndex: 0,
  modal: false,
  quickDismiss: true,
  transitionsModifier: "mask-fade"
};
class _default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultDialogOptions, selectedOptions);
    this._el = widgetEl;
    if (this._options.modal === true) {
      this._el.setAttribute("aria-modal", "true");
    }
    this._windowEl = this._el.querySelector(this._options.windowSelector);
    this._closeButtonEl = this._el.querySelector(this._options.closeButtonSelector);
    this._hasTransitions = this._el.classList.contains(`${this._options.baseClass}--${this._options.transitionsModifier}`);
    this._onCloseButtonClickListener = _onCloseButtonClick.bind(this);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onOpenTransitionEndCallback = _onOpenTransitionEnd.bind(this);
    this._onCloseTransitionEndCallback = _onCloseTransitionEnd.bind(this);
    this._el.classList.add(`${this._options.baseClass}--js`);
    if (!this.hidden) {
      if (this.modal) {
        _doModalFocusManagement(this);
      }
      this._observeEvents();
    }
  }
  get focusables() {
    return (0, _makeupFocusables.default)(this._windowEl);
  }
  get modal() {
    return this._el.getAttribute("aria-modal") === "true";
  }
  get hidden() {
    return this._el.hidden;
  }
  open() {
    this._show();
    this._el.dispatchEvent(new CustomEvent("dialog-open"));
  }
  close() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent("dialog-close"));
  }
  _show() {
    if (this._hasTransitions) {
      if (this._cancelTransition) {
        this._cancelTransition();
      }
      this._cancelTransition = (0, _transition.default)(this._el, `${this._options.baseClass}--show`, this._onOpenTransitionEndCallback);
    } else {
      if (this.modal) {
        setTimeout(() => _doModalFocusManagement(this), 50);
      }
      this._el.hidden = false;
    }
    this._observeEvents();
  }
  _hide() {
    if (this._hasTransitions) {
      if (this._cancelTransition) {
        this._cancelTransition();
      }
      this._cancelTransition = (0, _transition.default)(this._el, `${this._options.baseClass}--hide`, this._onCloseTransitionEndCallback);
    } else {
      if (this.modal) {
        Modal.unmodal();
      }
      this._el.hidden = true;
    }
    this._autoDismissTimeout = null;
    this._unobserveEvents();
  }
  _observeEvents() {
    document.addEventListener("keydown", this._onKeyDownListener);
    if (this._closeButtonEl) {
      this._closeButtonEl.addEventListener("click", this._onCloseButtonClickListener);
    }
  }
  _unobserveEvents() {
    this._el.removeEventListener("click", this._onCloseButtonClickListener);
    document.removeEventListener("keydown", this._onKeyDownListener);
    if (this._closeButtonEl) {
      this._closeButtonEl.addEventListener("click", this._onCloseButtonClickListener);
    }
  }
  destroy() {
    this._destroyed = true;
    this._unobserveEvents();
    this._onCloseButtonClickListener = null;
    this._onKeyDownListener = null;
    this._onOpenTransitionEndCallback = null;
    this._onCloseTransitionEndCallback = null;
    this._autoDismissTimeout = null;
  }
}
exports.default = _default;
function _doModalFocusManagement(dialogWidget) {
  const autoFocusEl = dialogWidget._el.querySelector("[autofocus]");
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
