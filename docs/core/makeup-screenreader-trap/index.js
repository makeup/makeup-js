import { trap, untrap } from "makeup-screenreader-trap";

const logEl = document.getElementById("log");

function logEvent(eventName) {
  const item = document.createElement("li");
  item.textContent = eventName;
  logEl.prepend(item);
}

document.querySelectorAll(".trap").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.getAttribute("aria-pressed") === "true") {
      untrap();
    } else {
      trap(btn, { useHiddenProperty: btn.hasAttribute("data-use-hidden-property") });
    }
  });

  btn.addEventListener("screenreaderTrap", () => {
    btn.textContent = "Untrap";
    btn.setAttribute("aria-pressed", "true");
  });

  btn.addEventListener("screenreaderUntrap", () => {
    btn.textContent = "Trap";
    btn.setAttribute("aria-pressed", "false");
  });
});

document.addEventListener("screenreaderTrap", () => logEvent("screenreaderTrap"));
document.addEventListener("screenreaderUntrap", () => logEvent("screenreaderUntrap"));

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
