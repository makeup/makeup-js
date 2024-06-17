import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/icon-button";
import "@ebay/skin/panel-dialog";

// REQUIRE
// const PanelDialog = require('makeup-panel-dialog');

// IMPORT
import PanelDialog from "makeup-panel-dialog";

window.onload = function () {
  document.querySelectorAll(".panel-dialog").forEach(function (el, i) {
    const widget = new PanelDialog(el);
  });
};
