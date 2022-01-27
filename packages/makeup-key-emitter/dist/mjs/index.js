function uncapitalizeFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
function onKeyDownOrUp(evt, el, keyEventType) {
  if (!evt.shiftKey) {
    const key = evt.key;
    switch (key) {
      case "Enter":
      case "Escape":
      case "PageUp":
      case "PageDown":
      case "End":
      case "Home":
      case "ArrowLeft":
      case "ArrowUp":
      case "ArrowRight":
      case "ArrowDown":
        el.dispatchEvent(new CustomEvent(uncapitalizeFirstLetter(`${key}Key${keyEventType}`), {
          detail: evt,
          bubbles: true
        }));
        break;
      case " ":
        el.dispatchEvent(new CustomEvent(`spacebarKey${keyEventType}`, {
          detail: evt,
          bubbles: true
        }));
        break;
      default:
        return;
    }
  }
}
function onKeyDown(e) {
  onKeyDownOrUp(e, this, "Down");
}
function onKeyUp(e) {
  onKeyDownOrUp(e, this, "Up");
}
function addKeyDown(el) {
  el.addEventListener("keydown", onKeyDown);
}
function addKeyUp(el) {
  el.addEventListener("keyup", onKeyUp);
}
function removeKeyDown(el) {
  el.removeEventListener("keydown", onKeyDown);
}
function removeKeyUp(el) {
  el.removeEventListener("keyup", onKeyUp);
}
function add(el) {
  addKeyDown(el);
  addKeyUp(el);
}
function remove(el) {
  removeKeyDown(el);
  removeKeyUp(el);
}
export {
  add,
  addKeyDown,
  addKeyUp,
  remove,
  removeKeyDown,
  removeKeyUp
};
