import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/icon";
import "@ebay/skin/icon-button";
import "@ebay/skin/drawer-dialog";

// REQUIRE
// const DrawerDialog = require('makeup-drawer-dialog').default;

// IMPORT
import DrawerDialog from "makeup-drawer-dialog";

window.onload = function () {
  document.querySelectorAll(".drawer-dialog").forEach(function (el, i) {
    const widget = new DrawerDialog(el);
  });
};
