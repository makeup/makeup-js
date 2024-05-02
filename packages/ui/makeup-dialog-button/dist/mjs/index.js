const defaultOptions = {
  customElementMode: false
};
class src_default {
  constructor(widgetEl, dialog, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this._el = widgetEl;
    this._el.setAttribute("aria-haspopup", "dialog");
    this._dialog = dialog;
    this._onClickListener = _onClick.bind(this);
    this._onDialogCloseListener = _onDialogClose.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this._el.classList.add("dialog-button--js");
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this._el, {
        attributes: true,
        childList: false,
        subtree: false
      });
    }
  }
  _unobserveMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.disconnect();
    }
  }
  _observeEvents() {
    if (this._destroyed !== true) {
      this._el.addEventListener("click", this._onClickListener);
      this._dialog._el.addEventListener("dialog-close", this._onDialogCloseListener);
    }
  }
  _unobserveEvents() {
    this._el.removeEventListener("click");
    this._dialog._el.removeEventListener("dialog-close", this._onDialogCloseListener);
  }
  destroy() {
    this._destroyed = true;
    this._unobserveMutations();
    this._unobserveEvents();
    this._onClickListener = null;
    this._onDialogCloseListener = null;
    this._onMutationListener = null;
  }
}
function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this._el.dispatchEvent(
        new CustomEvent("makeup-dialog-button-mutation", {
          detail: {
            attributeName: mutation.attributeName
          }
        })
      );
    }
  }
}
function _onClick() {
  this._dialog.open();
}
function _onDialogClose() {
  if (this._dialog.modal === true) {
    this._el.focus();
  }
}
export {
  src_default as default
};
