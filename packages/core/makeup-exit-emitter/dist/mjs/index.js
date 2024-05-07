import nextID from "makeup-next-id";
const focusExitEmitters = {};
function doFocusExit(el, fromElement, toElement) {
  el.dispatchEvent(
    new CustomEvent("focusExit", {
      detail: { fromElement, toElement },
      bubbles: false
      // mirror the native mouseleave event
    })
  );
}
function onDocumentFocusIn(e) {
  const newFocusElement = e.target;
  const targetIsDescendant = this.el.contains(newFocusElement);
  if (targetIsDescendant === true) {
    this.currentFocusElement = newFocusElement;
  } else {
    window.removeEventListener("blur", this.onWindowBlurListener);
    document.removeEventListener("focusin", this.onDocumentFocusInListener);
    doFocusExit(this.el, this.currentFocusElement, newFocusElement);
    this.currentFocusElement = null;
  }
}
function onWindowBlur() {
  doFocusExit(this.el, this.currentFocusElement, void 0);
}
function onWidgetFocusIn() {
  document.addEventListener("focusin", this.onDocumentFocusInListener);
  window.addEventListener("blur", this.onWindowBlurListener);
}
class FocusExitEmitter {
  constructor(el) {
    this.el = el;
    this.currentFocusElement = null;
    this.onWidgetFocusInListener = onWidgetFocusIn.bind(this);
    this.onDocumentFocusInListener = onDocumentFocusIn.bind(this);
    this.onWindowBlurListener = onWindowBlur.bind(this);
    this.el.addEventListener("focusin", this.onWidgetFocusInListener);
  }
  removeEventListeners() {
    window.removeEventListener("blur", this.onWindowBlurListener);
    document.removeEventListener("focusin", this.onDocumentFocusInListener);
    this.el.removeEventListener("focusin", this.onWidgetFocusInListener);
  }
}
function addFocusExit(el) {
  let exitEmitter = null;
  nextID(el);
  if (!focusExitEmitters[el.id]) {
    exitEmitter = new FocusExitEmitter(el);
    focusExitEmitters[el.id] = exitEmitter;
  }
  return exitEmitter;
}
function removeFocusExit(el) {
  const exitEmitter = focusExitEmitters[el.id];
  if (exitEmitter) {
    exitEmitter.removeEventListeners();
    delete focusExitEmitters[el.id];
  }
}
export {
  addFocusExit,
  removeFocusExit
};
