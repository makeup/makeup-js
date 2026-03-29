import { modal, unmodal } from "makeup-modal";

const modal1 = document.getElementById("modal-1");
const modal2 = document.getElementById("modal-2");
const modal3 = document.getElementById("modal-3");

const hoistCheckbox = document.getElementById("hoist-checkbox");
const wrapCheckbox = document.getElementById("wrap-checkbox");
const hiddenCheckbox = document.getElementById("hidden-checkbox");

const logEl = document.getElementById("log");

function getOptions() {
  return {
    hoist: hoistCheckbox.checked,
    wrap: wrapCheckbox.checked,
    useHiddenProperty: hiddenCheckbox.checked,
  };
}

function logEvent(name) {
  const item = document.createElement("li");
  item.textContent = name;
  logEl.prepend(item);
}

[modal1, modal2, modal3].forEach((el) => {
  const btn = el.querySelector(".toggle-btn");

  btn.addEventListener("click", () => {
    if (btn.getAttribute("aria-pressed") === "true") {
      unmodal();
    } else {
      modal(el, getOptions());
    }
  });

  el.addEventListener("makeup-modal", () => {
    logEvent("makeup-modal");
    btn.textContent = "Unmodal";
    btn.setAttribute("aria-pressed", "true");
    btn.focus();
  });

  el.addEventListener("makeup-unmodal", () => {
    logEvent("makeup-unmodal");
    btn.textContent = "Modal";
    btn.setAttribute("aria-pressed", "false");
  });
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
