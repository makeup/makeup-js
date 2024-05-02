// REQUIRE
// const modal = require('../../packages/ui/makeup-modal');

// IMPORT
import * as modal from "../../packages/ui/makeup-modal";

const modal1 = document.getElementById("modal-1");
const modal2 = document.getElementById("modal-2");
const modal3 = document.getElementById("modal-3");

const button1 = document.getElementById("button-1");
const button2 = document.getElementById("button-2");
const button3 = document.getElementById("button-3");

const unmodalButton = document.getElementById("button-unmodal");

const hoistCheckbox = document.getElementById("hoist-checkbox");
const wrapCheckbox = document.getElementById("wrap-checkbox");
const hiddenCheckbox = document.getElementById("hidden-checkbox");

modal1.addEventListener("makeup-modal", (e) => console.log(e));
modal2.addEventListener("makeup-modal", (e) => console.log(e));
modal3.addEventListener("makeup-modal", (e) => console.log(e));
modal1.addEventListener("makeup-unmodal", (e) => console.log(e));
modal2.addEventListener("makeup-unmodal", (e) => console.log(e));
modal3.addEventListener("makeup-unmodal", (e) => console.log(e));

button1.addEventListener("click", () => {
  modal.modal(modal1, {
    hoist: hoistCheckbox.checked,
    useHiddenProperty: hiddenCheckbox.checked,
    wrap: wrapCheckbox.checked,
  });
});

button2.addEventListener("click", () => {
  modal.modal(modal2, {
    hoist: hoistCheckbox.checked,
    useHiddenProperty: hiddenCheckbox.checked,
    wrap: wrapCheckbox.checked,
  });
});

button3.addEventListener("click", () => {
  modal.modal(modal3, {
    hoist: hoistCheckbox.checked,
    useHiddenProperty: hiddenCheckbox.checked,
    wrap: wrapCheckbox.checked,
  });
});

unmodalButton.addEventListener("click", () => {
  modal.unmodal();
});
