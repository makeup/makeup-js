// REQUIRE
// const LightboxDialog = require('makeup-lightbox-dialog').default;

// IMPORT
import LightboxDialog from "makeup-lightbox-dialog";
import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/icon-button";
import "@ebay/skin/lightbox-dialog";

window.onload = function () {
  document.querySelectorAll(".lightbox-dialog").forEach(function (el, i) {
    const widget = new LightboxDialog(el);
  });
};
