"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.add = void 0;
const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "End", "Home", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"]);
const onKeyDown = e => {
  if (SCROLL_KEYS.has(e.key)) {
    e.preventDefault();
  }
};
const add = el => {
  el.addEventListener("keydown", onKeyDown);
};
exports.add = add;
const remove = el => {
  el.removeEventListener("keydown", onKeyDown);
};
exports.remove = remove;
