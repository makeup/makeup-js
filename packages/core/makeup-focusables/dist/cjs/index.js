"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const focusableElList = ["a[href]", "area[href]", "button:not([disabled])", "embed", "iframe", "input:not([disabled])", "object", "select:not([disabled])", "textarea:not([disabled])", "*[tabindex]", "*[contenteditable]"];
const focusableElSelector = focusableElList.join();
function _default(el) {
  let keyboardOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let callback = arguments.length > 2 ? arguments[2] : undefined;
  if (callback) {
    const request = requestAnimationFrame(() => {
      callback(getFocusables(el, keyboardOnly));
    });
    return () => {
      cancelAnimationFrame(request);
    };
  }
  return getFocusables(el, keyboardOnly);
}
function getFocusables(el) {
  let keyboardOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusableElSelector));

  // filter out elements with display: none
  focusableEls = focusableEls.filter(function (focusableEl) {
    return window.getComputedStyle(focusableEl).display !== "none";
  });
  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(function (focusableEl) {
      return focusableEl.getAttribute("tabindex") !== "-1";
    });
  }
  return focusableEls;
}
