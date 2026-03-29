import { modal, unmodal } from "makeup-modal";

const modal1 = document.getElementById("modal-1");
const modal2 = document.getElementById("modal-2");
const modal3 = document.getElementById("modal-3");

const unmodalButton = document.getElementById("button-unmodal");
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
  el.addEventListener("makeup-modal", () => {
    logEvent("makeup-modal");
    unmodalButton.disabled = false;
  });
  el.addEventListener("makeup-unmodal", () => {
    logEvent("makeup-unmodal");
    unmodalButton.disabled = true;
  });
});

document.getElementById("button-1").addEventListener("click", () => modal(modal1, getOptions()));
document.getElementById("button-2").addEventListener("click", () => modal(modal2, getOptions()));
document.getElementById("button-3").addEventListener("click", () => modal(modal3, getOptions()));

unmodalButton.addEventListener("click", () => unmodal());

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
