import * as Modal from "makeup-modal";
import focusables from "makeup-focusables";
import transition from "./transition.js";
const defaultDialogOptions = {
  baseClass: "dialog",
  closeButtonSelector: ".dialog__close",
  focusManagementIndex: 0,
  modal: false,
  quickDismiss: true,
  transitionsModifier: "mask-fade"
};
class src_default {
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
    return focusables(this._windowEl);
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
      this._cancelTransition = transition(this._el, `${this._options.baseClass}--show`, this._onOpenTransitionEndCallback);
    } else {
      if (this.modal) {
        _doModalFocusManagement(this);
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
      this._cancelTransition = transition(this._el, `${this._options.baseClass}--hide`, this._onCloseTransitionEndCallback);
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
  this._cancelTransition = void 0;
  if (this.modal) {
    _doModalFocusManagement(this);
  }
}
function _onCloseTransitionEnd() {
  if (this.modal) {
    Modal.unmodal();
  }
  this._el.hidden = true;
  this._cancelTransition = void 0;
}
function _onKeyDown(e) {
  if (this._options.quickDismiss === true && e.keyCode === 27) {
    this.close();
  }
}
function _onCloseButtonClick() {
  this.close();
}
export {
  src_default as default
};
