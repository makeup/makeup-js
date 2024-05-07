function onKeyDown(e) {
  if (e.keyCode >= 32 && e.keyCode <= 40) {
    e.preventDefault();
  }
}
function add(el) {
  el.addEventListener("keydown", onKeyDown);
}
function remove(el) {
  el.removeEventListener("keydown", onKeyDown);
}
export {
  add,
  remove
};
