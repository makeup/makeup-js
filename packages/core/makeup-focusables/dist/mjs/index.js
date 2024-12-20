const focusableElList = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "embed",
  "iframe",
  "input:not([disabled])",
  "object",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "*[tabindex]",
  "*[contenteditable]"
];
const focusableElSelector = focusableElList.join();
function index_default(el, keyboardOnly = false, callback) {
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
function getFocusables(el, keyboardOnly = false) {
  let focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusableElSelector));
  focusableEls = focusableEls.filter(function(focusableEl) {
    return !!(focusableEl.offsetWidth || focusableEl.offsetHeight || focusableEl.getClientRects().length);
  });
  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(function(focusableEl) {
      return focusableEl.getAttribute("tabindex") !== "-1";
    });
  }
  return focusableEls;
}
export {
  index_default as default
};
