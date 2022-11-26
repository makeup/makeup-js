"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Modal = _interopRequireWildcard(require("makeup-modal"));
var _makeupFocusables = _interopRequireDefault(require("makeup-focusables"));
var _transition = _interopRequireDefault(require("./transition.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var defaultDialogOptions = {
  baseClass: 'dialog',
  closeButtonSelector: '.dialog__close',
  focusManagementIndex: 0,
  modal: false,
  quickDismiss: true,
  transitionsModifier: 'mask-fade'
};
class _default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultDialogOptions, selectedOptions);
    this._el = widgetEl;
    if (this._options.modal === true) {
      this._el.setAttribute('aria-modal', 'true');
    }
    this._windowEl = this._el.querySelector(this._options.windowSelector);
    this._closeButtonEl = this._el.querySelector(this._options.closeButtonSelector);
    this._hasTransitions = this._el.classList.contains("".concat(this._options.baseClass, "--").concat(this._options.transitionsModifier));
    this._onCloseButtonClickListener = _onCloseButtonClick.bind(this);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onOpenTransitionEndCallback = _onOpenTransitionEnd.bind(this);
    this._onCloseTransitionEndCallback = _onCloseTransitionEnd.bind(this);
    this._el.classList.add("".concat(this._options.baseClass, "--js"));
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
    return this._el.getAttribute('aria-modal') === 'true';
  }
  get hidden() {
    return this._el.hidden;
  }
  open() {
    this._show();
    this._el.dispatchEvent(new CustomEvent('dialog-open'));
  }
  close() {
    this._hide();
    this._el.dispatchEvent(new CustomEvent('dialog-close'));
  }
  _show() {
    if (this._hasTransitions) {
      if (this._cancelTransition) {
        this._cancelTransition();
      }
      this._cancelTransition = (0, _transition.default)(this._el, "".concat(this._options.baseClass, "--show"), this._onOpenTransitionEndCallback);
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
      this._cancelTransition = (0, _transition.default)(this._el, "".concat(this._options.baseClass, "--hide"), this._onCloseTransitionEndCallback);
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
    document.addEventListener('keydown', this._onKeyDownListener);
    if (this._closeButtonEl) {
      this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
    }
  }
  _unobserveEvents() {
    this._el.removeEventListener('click', this._onCloseButtonClickListener);
    document.removeEventListener('keydown', this._onKeyDownListener);
    if (this._closeButtonEl) {
      this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
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
  var autoFocusEl = dialogWidget._el.querySelector('[autofocus]');
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
