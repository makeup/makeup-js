import focusables from "makeup-focusables";

const widgetEl = document.getElementById("widget");
const countAllEl = document.getElementById("count-all");
const countKeyboardEl = document.getElementById("count-keyboard");
const originalHTML = widgetEl.innerHTML;

function updateCounts() {
  countAllEl.textContent = focusables(widgetEl).length;
  countKeyboardEl.textContent = focusables(widgetEl, true).length;
}

updateCounts();

document.getElementById("append-keyboard").addEventListener("click", () => {
  const el = document.createElement("button");
  el.textContent = "Appended button";
  widgetEl.appendChild(el);
  updateCounts();
});

document.getElementById("append-programmatic").addEventListener("click", () => {
  const el = document.createElement("div");
  el.setAttribute("tabindex", "-1");
  el.textContent = "Appended tabindex=-1";
  widgetEl.appendChild(el);
  updateCounts();
});

document.getElementById("append-hidden").addEventListener("click", () => {
  const el = document.createElement("button");
  el.setAttribute("hidden", "");
  el.textContent = "Appended hidden button";
  widgetEl.appendChild(el);
  updateCounts();
});

document.getElementById("reset").addEventListener("click", () => {
  widgetEl.innerHTML = originalHTML;
  updateCounts();
});
