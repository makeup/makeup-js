import { addFocusExit } from "makeup-exit-emitter";

const logEl = document.getElementById("log");

function logEvent(text) {
  const item = document.createElement("li");
  item.textContent = text;
  logEl.prepend(item);
}

document.querySelectorAll(".widget").forEach((el) => {
  addFocusExit(el);

  el.addEventListener("focusin", () => el.classList.add("widget--active"));

  el.addEventListener("focusExit", (e) => {
    el.classList.remove("widget--active");
    const from = e.detail.fromElement?.tagName.toLowerCase() ?? "unknown";
    const to = e.detail.toElement?.tagName.toLowerCase() ?? "window";
    logEvent(`focusExit (${el.id}) — from: ${from}, to: ${to}`);
  });
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
