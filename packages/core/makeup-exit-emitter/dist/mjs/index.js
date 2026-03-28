import nextID from "makeup-next-id";
const focusExitEmitters = /* @__PURE__ */ new Map();
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
  nextID(el);
  if (!focusExitEmitters.has(el.id)) {
    focusExitEmitters.set(el.id, new FocusExitEmitter(el));
  }
  return focusExitEmitters.get(el.id);
}
function removeFocusExit(el) {
  const exitEmitter = focusExitEmitters.get(el.id);
  if (exitEmitter) {
    exitEmitter.removeEventListeners();
    focusExitEmitters.delete(el.id);
  }
}
export {
  addFocusExit,
  removeFocusExit
};
