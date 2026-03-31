const SCROLL_KEYS = /* @__PURE__ */ new Set([
  " ",
  "PageUp",
  "PageDown",
  "End",
  "Home",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown"
]);
const onKeyDown = (e) => {
  if (SCROLL_KEYS.has(e.key)) {
    e.preventDefault();
  }
};
const add = (el) => {
  el.addEventListener("keydown", onKeyDown);
};
const remove = (el) => {
  el.removeEventListener("keydown", onKeyDown);
};
export {
  add,
  remove
};
