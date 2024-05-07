// REQUIRE
// const keyboardTrap = require('../../../packages/core/makeup-keyboard-trap');

// IMPORT
import * as keyboardTrap from "../../../packages/core/makeup-keyboard-trap";

const trap = document.getElementById("trap");
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  if (this.getAttribute("aria-pressed") === "true") {
    keyboardTrap.untrap();
  } else {
    keyboardTrap.trap(this.parentNode);
  }
});

document.addEventListener("keyboardTrap", function (e) {
  console.log(this, e);
});

document.addEventListener("keyboardUntrap", function (e) {
  console.log(this, e);
});

trap.addEventListener("keyboardUntrap", function (e) {
  console.log(this, e);
  btn.innerText = "Trap";
  btn.setAttribute("aria-pressed", "false");
});

trap.addEventListener("keyboardTrap", function (e) {
  console.log(this, e);
  btn.innerText = "Untrap";
  btn.setAttribute("aria-pressed", "true");
});
