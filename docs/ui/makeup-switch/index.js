import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/switch";

import MakeupSwitch from "makeup-switch";

const logEl = document.getElementById("log");

function logEvent(e) {
  const item = document.createElement("li");
  item.textContent = `makeup-switch-toggle — on: ${e.detail.on}`;
  logEl.prepend(item);
}

document.querySelectorAll(".switch").forEach((el) => {
  new MakeupSwitch(el);
  el.addEventListener("makeup-switch-toggle", logEvent);
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
