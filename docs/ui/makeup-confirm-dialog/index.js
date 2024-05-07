import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/confirm-dialog";

// REQUIRE
// const ConfirmDialog = require('../../../packages/ui/makeup-confirm-dialog');

// IMPORT
import ConfirmDialog from "../../../packages/ui/makeup-confirm-dialog";

window.onload = function () {
  document.querySelectorAll(".confirm-dialog").forEach(function (el, i) {
    const widget = new ConfirmDialog(el);
  });
};
