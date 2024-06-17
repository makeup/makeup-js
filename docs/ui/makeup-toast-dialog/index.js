import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/icon-button";
import "@ebay/skin/toast-dialog";

// REQUIRE
// const ToastDialog = require('makeup-toast-dialog').default;

// IMPORT
import ToastDialog from "makeup-toast-dialog";

window.onload = function () {
  document.querySelectorAll(".toast-dialog").forEach(function (el, i) {
    const widget = new ToastDialog(el);
    console.log(widget, el);
  });
};
