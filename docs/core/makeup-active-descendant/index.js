import { createLinear } from "makeup-active-descendant";
import { add as addPreventScrollKeys } from "makeup-prevent-scroll-keys";

const widget1El = document.getElementById("widget-1");
const widget2El = document.getElementById("widget-2");
const logEl1 = document.getElementById("log-1");
const logEl2 = document.getElementById("log-2");

const logEvent = (logEl, e) => {
  const item = document.createElement("li");
  item.textContent = `${e.type} — from: ${e.detail.fromIndex}, to: ${e.detail.toIndex}`;
  logEl.prepend(item);
};

// Hierarchical: focusEl is the ul (ancestor of items)
const focusEl1 = widget1El.querySelector("ul");
const nav1 = createLinear(widget1El, focusEl1, focusEl1, "li");

addPreventScrollKeys(focusEl1);

["activeDescendantInit", "activeDescendantChange", "activeDescendantReset", "activeDescendantMutation"].forEach(
  (eventName) => widget1El.addEventListener(eventName, (e) => logEvent(logEl1, e)),
);

// Programmatic: focusEl is the input (not an ancestor of items)
const focusEl2 = widget2El.querySelector("input[type='text']");
const containerEl2 = widget2El.querySelector("ul");
const nav2 = createLinear(widget2El, focusEl2, containerEl2, "li", {
  ignoreByDelegateSelector: 'input[type="button"]',
});

addPreventScrollKeys(focusEl2);

["activeDescendantInit", "activeDescendantChange", "activeDescendantReset", "activeDescendantMutation"].forEach(
  (eventName) => widget2El.addEventListener(eventName, (e) => logEvent(logEl2, e)),
);

// Controls — apply to both widgets
const navs = [nav1, nav2];
const widgetEls = [widget1El, widget2El];

document.getElementById("append").addEventListener("click", () => {
  widgetEls.forEach((el) => {
    const ul = el.querySelector("ul");
    const item = document.createElement("li");
    item.setAttribute("role", "option");
    item.textContent = `Item ${ul.children.length + 1}`;
    ul.appendChild(item);
  });
});

document.getElementById("prepend").addEventListener("click", () => {
  widgetEls.forEach((el) => {
    const ul = el.querySelector("ul");
    const item = document.createElement("li");
    item.setAttribute("role", "option");
    item.textContent = `Item ${ul.children.length + 1}`;
    ul.insertBefore(item, ul.firstElementChild);
  });
});

document.getElementById("removeFirst").addEventListener("click", () => {
  widgetEls.forEach((el) => {
    const first = el.querySelector("ul").firstElementChild;
    if (first) first.remove();
  });
});

document.getElementById("removeLast").addEventListener("click", () => {
  widgetEls.forEach((el) => {
    const last = el.querySelector("ul").lastElementChild;
    if (last) last.remove();
  });
});

document.getElementById("disableCurrent").addEventListener("click", () => {
  navs.forEach((nav) => nav.currentItem?.setAttribute("aria-disabled", "true"));
});

document.getElementById("wrap").addEventListener("change", (e) => {
  navs.forEach((nav) => (nav.wrap = e.target.checked));
});

document.getElementById("clear-1").addEventListener("click", () => {
  logEl1.innerHTML = "";
});

document.getElementById("clear-2").addEventListener("click", () => {
  logEl2.innerHTML = "";
});
