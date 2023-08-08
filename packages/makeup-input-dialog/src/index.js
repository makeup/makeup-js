import Lightbox from "makeup-lightbox-dialog";

const defaultInputOptions = {
  baseClass: "lightbox-dialog",
  baseClassModifier: "input",
  submitButtonSelector: ".lightbox-dialog__submit",
  cancelButtonSelector: ".lightbox-dialog__cancel",
  windowSelector: ".lightbox-dialog__window",
};

export default class extends Lightbox {
  constructor(el, selectedOptions = {}) {
    super(el, Object.assign({}, defaultInputOptions, selectedOptions));
  }

  _observeEvents() {
    super._observeEvents();

    this._submitButtonEl = this._el.querySelector(this._options.submitButtonSelector);
    this._cancelButtonEl = this._el.querySelector(this._options.cancelButtonSelector);

    this._onSubmitButtonClickListener = _onSubmitButtonClick.bind(this);
    this._onCancelButtonClickListener = _onCancelButtonClick.bind(this);

    this._submitButtonEl.addEventListener("click", this._onSubmitButtonClickListener);
    this._cancelButtonEl.addEventListener("click", this._onCancelButtonClickListener);
  }

  _unobserveEvents() {
    super._unobserveEvents();

    this._submitButtonEl.removeEventListener("click", this._onSubmitButtonClickListener);
    this._cancelButtonEl.removeEventListener("click", this._onCancelButtonClickListener);
  }

  submit() {
    this._hide();

    this._el.dispatchEvent(new CustomEvent("dialog-submit"));
  }

  cancel() {
    this._hide();

    this._el.dispatchEvent(new CustomEvent("dialog-cancel"));
  }

  destroy() {
    super.destroy();

    this._onSubmitButtonClickListener = null;
    this._onCancelButtonClickListener = null;
  }
}

function _onSubmitButtonClick() {
  this.submit();
}

function _onCancelButtonClick() {
  this.cancel();
}
