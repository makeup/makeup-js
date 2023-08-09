// REQUIRE
// const FloatingLabel = require('../../packages/makeup-floating-label').default;

// IMPORT
import FloatingLabel from "../../packages/makeup-floating-label";

document.addEventListener("DOMContentLoaded", function () {
  const widgetEls = document.querySelectorAll(".floating-label");
  const autofillBtn = document.getElementById("autofill");
  const refreshBtn = document.getElementById("refresh");
  const invalidateBtn = document.getElementById("invalidate");
  const validateBtn = document.getElementById("validate");
  const disableBtn = document.getElementById("disable");
  const enableBtn = document.getElementById("enable");
  const widgets = [];

  widgetEls.forEach(function (el) {
    widgets.push(new FloatingLabel(el));
  });

  autofillBtn.addEventListener("click", function () {
    widgetEls.forEach(function (el) {
      const input = el.querySelector("input");
      if (input) {
        input.value = "Autofill Text";
      } else {
        el.querySelector("select").value = "UK";
      }
    });
  });

  refreshBtn.addEventListener("click", function () {
    widgets.forEach(function (el, index) {
      widgets[index].refresh();
    });
  });

  invalidateBtn.addEventListener("click", function () {
    widgets.forEach(function (el, index) {
      widgets[index].formControlEl.setAttribute("aria-invalid", "true");
    });
  });

  validateBtn.addEventListener("click", function () {
    widgets.forEach(function (el, index) {
      widgets[index].formControlEl.setAttribute("aria-invalid", "false");
    });
  });

  disableBtn.addEventListener("click", function () {
    widgets.forEach(function (el, index) {
      widgets[index].formControlEl.disabled = true;
    });
  });

  enableBtn.addEventListener("click", function () {
    widgets.forEach(function (el, index) {
      widgets[index].formControlEl.disabled = false;
    });
  });
});
