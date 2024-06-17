import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/icon";
import "@ebay/skin/icon-button";
import "@ebay/skin/fullscreen-dialog";

// REQUIRE
// const FullscreenDialog = require('makeup-fullscreen-dialog').default;

// IMPORT
import FullscreenDialog from "makeup-fullscreen-dialog";

window.onload = function () {
  document.querySelectorAll(".fullscreen-dialog").forEach(function (el, i) {
    const widget = new FullscreenDialog(el);
  });
};
