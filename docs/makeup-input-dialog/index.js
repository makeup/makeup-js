import "../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/lightbox-dialog";
import "@ebay/skin/textbox";

// REQUIRE
// const InputDialog = require('../../packages/ui/makeup-input-dialog').default;

// IMPORT
import InputDialog from "../../packages/ui/makeup-input-dialog";

window.onload = function () {
  document.querySelectorAll(".lightbox-dialog--input").forEach(function (el, i) {
    const widget = new InputDialog(el);
  });
};
