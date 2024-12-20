import Dialog from "makeup-dialog";
const defaultLightboxOptions = {
  baseClass: "lightbox-dialog",
  baseClassModifier: "",
  quickDismiss: true,
  closeButtonSelector: ".lightbox-dialog__close",
  windowSelector: ".lightbox-dialog__window"
};
class index_default extends Dialog {
  constructor(el, selectedOptions = {}) {
    super(el, Object.assign({}, defaultLightboxOptions, selectedOptions, { modal: true }));
  }
  _observeEvents() {
    super._observeEvents();
    this._onClickListener = _onClick.bind(this);
    this._el.addEventListener("click", this._onClickListener);
  }
  _unobserveEvents() {
    super._unobserveEvents();
    this._el.removeEventListener("click", this._onClickListener);
  }
  destroy() {
    super.destroy();
    this._onClickListener = null;
  }
}
function _onClick(e) {
  if (this._options.quickDismiss === true && e.target === this._el) {
    this.close();
  }
}
export {
  index_default as default
};
