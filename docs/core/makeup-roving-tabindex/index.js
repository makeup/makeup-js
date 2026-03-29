import { createLinear } from "makeup-roving-tabindex";
import { add as addPreventScrollKeys } from "makeup-prevent-scroll-keys";

const widgetEl = document.querySelector(".widget");
const logEl = document.getElementById("log");

const logEvent = (e) => {
  const item = document.createElement("li");
  item.textContent = `${e.type} — from: ${e.detail.fromIndex}, to: ${e.detail.toIndex}`;
  logEl.prepend(item);
};

const rover = createLinear(widgetEl, "li");

addPreventScrollKeys(widgetEl);

widgetEl.addEventListener("rovingTabindexInit", logEvent);
widgetEl.addEventListener("rovingTabindexChange", logEvent);
widgetEl.addEventListener("rovingTabindexMutation", logEvent);
widgetEl.addEventListener("rovingTabindexReset", logEvent);

document.getElementById("appender").addEventListener("click", () => {
  const ul = widgetEl.querySelector("ul");
  const item = document.createElement("li");
  item.textContent = `Item ${ul.children.length + 1}`;
  ul.appendChild(item);
});

document.getElementById("prepender").addEventListener("click", () => {
  const ul = widgetEl.querySelector("ul");
  const item = document.createElement("li");
  item.textContent = `Item ${ul.children.length + 1}`;
  ul.insertBefore(item, ul.firstElementChild);
});

document.getElementById("removeFirst").addEventListener("click", () => {
  const first = widgetEl.querySelector("ul").firstElementChild;
  if (first) first.remove();
});

document.getElementById("removeLast").addEventListener("click", () => {
  const last = widgetEl.querySelector("ul").lastElementChild;
  if (last) last.remove();
});

document.getElementById("removeCurrent").addEventListener("click", () => rover.currentItem?.remove());

document
  .getElementById("disableCurrent")
  .addEventListener("click", () => rover.currentItem?.setAttribute("aria-disabled", "true"));

document.getElementById("hideCurrent").addEventListener("click", () => {
  if (rover.currentItem) rover.currentItem.hidden = true;
});

document.getElementById("wrap").addEventListener("change", (e) => {
  rover.wrap = e.target.checked;
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
