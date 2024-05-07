import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/link";
import "@ebay/skin/snackbar-dialog";

// REQUIRE
// const SnackbarDialog = require('../../../packages/ui/makeup-snackbar-dialog').default;

// IMPORT
import SnackbarDialog from "../../../packages/ui/makeup-snackbar-dialog";

window.onload = function () {
  document.querySelectorAll(".snackbar-dialog").forEach(function (el, i) {
    const widget = new SnackbarDialog(el);
    console.log(widget, el);
  });
};
