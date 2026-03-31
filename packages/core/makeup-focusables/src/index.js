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
  "*[contenteditable]",
];

const focusableElSelector = focusableElList.join(",");

export default function (el, keyboardOnly = false, callback) {
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
  // filter out elements with display: none or nested in a display: none parent
  let focusableEls = [...el.querySelectorAll(focusableElSelector)].filter(
    (focusableEl) => !!(focusableEl.offsetWidth || focusableEl.offsetHeight || focusableEl.getClientRects().length),
  );

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter((focusableEl) => focusableEl.getAttribute("tabindex") !== "-1");
  }

  return focusableEls;
}
