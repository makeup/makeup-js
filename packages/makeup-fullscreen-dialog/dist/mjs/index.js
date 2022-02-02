import Dialog from "makeup-dialog";
const defaultFullscreenOptions = {
  baseClass: "fullscreen-dialog",
  quickDismiss: false,
  closeButtonSelector: ".fullscreen-dialog__close",
  transitionsModifier: "transition",
  windowSelector: ".fullscreen-dialog__window"
};
class src_default extends Dialog {
  constructor(el, selectedOptions = {}) {
    super(el, Object.assign({}, defaultFullscreenOptions, selectedOptions, { modal: true }));
  }
}
export {
  src_default as default
};
