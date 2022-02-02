import focusables from "makeup-focusables";
let trappedEl;
let topTrap;
let outerTrapBefore;
let innerTrapBefore;
let innerTrapAfter;
let outerTrapAfter;
let botTrap;
let firstFocusableElement;
let lastFocusableElement;
function createTrapBoundary() {
  const trapBoundary = document.createElement("div");
  trapBoundary.setAttribute("aria-hidden", "true");
  trapBoundary.setAttribute("tabindex", "0");
  trapBoundary.className = "keyboard-trap-boundary";
  return trapBoundary;
}
function setFocusToFirstFocusableElement() {
  firstFocusableElement.focus();
}
function setFocusToLastFocusableElement() {
  lastFocusableElement.focus();
}
function createTraps() {
  topTrap = createTrapBoundary();
  outerTrapBefore = topTrap.cloneNode();
  innerTrapBefore = topTrap.cloneNode();
  innerTrapAfter = topTrap.cloneNode();
  outerTrapAfter = topTrap.cloneNode();
  botTrap = topTrap.cloneNode();
  topTrap.addEventListener("focus", setFocusToFirstFocusableElement);
  outerTrapBefore.addEventListener("focus", setFocusToFirstFocusableElement);
  innerTrapBefore.addEventListener("focus", setFocusToLastFocusableElement);
  innerTrapAfter.addEventListener("focus", setFocusToFirstFocusableElement);
  outerTrapAfter.addEventListener("focus", setFocusToLastFocusableElement);
  botTrap.addEventListener("focus", setFocusToLastFocusableElement);
}
function untrap() {
  if (trappedEl) {
    topTrap = safeDetach(topTrap);
    outerTrapBefore = safeDetach(outerTrapBefore);
    innerTrapBefore = safeDetach(innerTrapBefore);
    innerTrapAfter = safeDetach(innerTrapAfter);
    outerTrapAfter = safeDetach(outerTrapAfter);
    botTrap = safeDetach(botTrap);
    trappedEl.classList.remove("keyboard-trap--active");
    trappedEl.dispatchEvent(new CustomEvent("keyboardUntrap", { bubbles: true }));
    trappedEl = null;
  }
  return trappedEl;
}
function safeDetach(el) {
  const parent = el.parentNode;
  return parent ? parent.removeChild(el) : el;
}
function trap(el) {
  if (!topTrap) {
    createTraps();
  } else {
    untrap();
  }
  trappedEl = el;
  const body = typeof document === "undefined" ? null : document.body;
  const focusableElements = focusables(trappedEl, true);
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
  body.insertBefore(topTrap, body.childNodes[0]);
  trappedEl.parentNode.insertBefore(outerTrapBefore, trappedEl);
  trappedEl.insertBefore(innerTrapBefore, trappedEl.childNodes[0]);
  trappedEl.appendChild(innerTrapAfter);
  trappedEl.parentNode.insertBefore(outerTrapAfter, trappedEl.nextElementSibling);
  body.appendChild(botTrap);
  trappedEl.dispatchEvent(new CustomEvent("keyboardTrap", { bubbles: true }));
  trappedEl.classList.add("keyboard-trap--active");
  return trappedEl;
}
function refresh() {
  if (topTrap && trappedEl) {
    let focusableElements = focusables(trappedEl, true);
    focusableElements = focusableElements.filter(function(el) {
      return !el.classList.contains("keyboard-trap-boundary");
    });
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  }
}
export {
  refresh,
  trap,
  untrap
};
