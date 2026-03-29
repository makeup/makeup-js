import * as NavigationEmitter from "makeup-navigation-emitter";
import { add as addPreventScrollKeys } from "makeup-prevent-scroll-keys";

const widgetEls = document.querySelectorAll(".widget");

const perWidgetOptions = [{}, { autoInit: "none", autoReset: "none" }, { autoInit: "none", autoReset: "none" }];

const eventNames = ["navigationModelInit", "navigationModelChange", "navigationModelReset", "navigationModelMutation"];

// prevent page scroll on arrow keys for widget-1 and widget-2 (widget-3 uses an input which handles this natively)
[document.getElementById("widget-1"), document.getElementById("widget-2")].forEach(addPreventScrollKeys);

const emitters = [...widgetEls].map((el, index) => {
  const logEl = document.getElementById(`log-${index + 1}`);

  function logEvent(e) {
    const item = document.createElement("li");
    const detail = e.detail ? ` ${e.detail.fromIndex} → ${e.detail.toIndex}` : "";
    item.textContent = `${e.type}${detail}`;
    logEl.prepend(item);
  }

  eventNames.forEach((name) => el.addEventListener(name, logEvent));

  document.getElementById(`clear-${index + 1}`).addEventListener("click", () => {
    logEl.innerHTML = "";
  });

  return NavigationEmitter.createLinear(el, "li", perWidgetOptions[index]);
});

document.getElementById("wrap").addEventListener("change", (e) => {
  emitters.forEach((emitter) => {
    emitter.model.options.wrap = e.target.checked;
  });
});

document.getElementById("appender").addEventListener("click", () => {
  widgetEls.forEach((el) => {
    const listEl = el.querySelector("ul");
    const newItem = document.createElement("li");
    newItem.textContent = `Item ${listEl.querySelectorAll("li").length + 1}`;
    listEl.appendChild(newItem);
  });
});
