import { trap, untrap } from "makeup-keyboard-trap";

const trapEl = document.getElementById("trap");
const toggleBtn = document.getElementById("toggle");
const logEl = document.getElementById("log");

function logEvent(name) {
  const item = document.createElement("li");
  item.textContent = name;
  logEl.prepend(item);
}

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.getAttribute("aria-pressed") === "true") {
    untrap();
  } else {
    trap(trapEl);
  }
});

trapEl.addEventListener("keyboardTrap", () => {
  toggleBtn.textContent = "Untrap";
  toggleBtn.setAttribute("aria-pressed", "true");
  logEvent("keyboardTrap");
});

trapEl.addEventListener("keyboardUntrap", () => {
  toggleBtn.textContent = "Trap";
  toggleBtn.setAttribute("aria-pressed", "false");
  logEvent("keyboardUntrap");
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
