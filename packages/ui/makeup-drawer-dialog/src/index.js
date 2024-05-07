import Lightbox from "makeup-lightbox-dialog";

const defaultDrawerOptions = {
  baseClass: "drawer-dialog",
  quickDismiss: true,
  closeButtonSelector: ".drawer-dialog__close",
  focusManagementIndex: 1,
  resizeButtonSelector: ".drawer-dialog__handle",
  windowSelector: ".drawer-dialog__window",
};

export default class extends Lightbox {
  constructor(el, selectedOptions = {}) {
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

function _onResizeButtonClick() {
  this.resize();
}
