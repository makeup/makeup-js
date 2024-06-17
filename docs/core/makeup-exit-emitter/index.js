// REQUIRE
//const ExitEmitter = require('makeup-exit-emitter');

// IMPORT
import * as ExitEmitter from "makeup-exit-emitter";

document.querySelectorAll(".widget").forEach((el) => {
  ExitEmitter.addFocusExit(el);

  el.addEventListener("focusin", function () {
    this.classList.add("focusin");
  });

  el.addEventListener("focusExit", function () {
    this.classList.remove("focusin");
  });
});
