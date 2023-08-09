// STYLES
import "../docs.css";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/button";
import "@ebay/skin/icon-button";
import "@ebay/skin/link";
import "@ebay/skin/textbox";
import "@ebay/skin/alert-dialog";
import "@ebay/skin/confirm-dialog";
import "@ebay/skin/drawer-dialog";
import "@ebay/skin/fullscreen-dialog";
import "@ebay/skin/lightbox-dialog";
import "@ebay/skin/panel-dialog";
import "@ebay/skin/snackbar-dialog";
import "@ebay/skin/toast-dialog";

// REQUIRE
/*
const DialogButton = require('../../packages/makeup-dialog-button');
const LightboxDialog = require('../../packages/makeup-lightbox-dialog');
const AlertDialog = require('../../packages/makeup-alert-dialog');
const ConfirmDialog = require('../../packages/makeup-confirm-dialog');
const DrawerDialog = require('../../packages/makeup-drawer-dialog');
const FullscreenDialog = require('../../packages/makeup-fullscreen-dialog');
const InputDialog = require('../../packages/makeup-input-dialog');
const PanelDialog = require('../../packages/makeup-panel-dialog');
const SnackbarDialog = require('../../packages/makeup-snackbar-dialog');
const ToastDialog = require('../../packages/makeup-toast-dialog');
*/

// IMPORT
import DialogButton from "../../packages/makeup-dialog-button";
import LightboxDialog from "../../packages/makeup-lightbox-dialog";
import AlertDialog from "../../packages/makeup-alert-dialog";
import ConfirmDialog from "../../packages/makeup-confirm-dialog";
import DrawerDialog from "../../packages/makeup-drawer-dialog";
import FullscreenDialog from "../../packages/makeup-fullscreen-dialog";
import InputDialog from "../../packages/makeup-input-dialog";
import PanelDialog from "../../packages/makeup-panel-dialog";
import SnackbarDialog from "../../packages/makeup-snackbar-dialog";
import ToastDialog from "../../packages/makeup-toast-dialog";

const log = (e) => console.log(e); // eslint-disable-line no-console

window.onload = function () {
  document.querySelectorAll(".dialog-button").forEach(function (el, i) {
    const dialogId = el.dataset.makeupFor;
    const dialogEl = document.getElementById(dialogId);
    const dialogClassList = dialogEl.classList;
    let dialogWidget;

    if (dialogClassList.contains("confirm-dialog")) {
      dialogWidget = new ConfirmDialog(dialogEl);
    } else if (dialogClassList.contains("alert-dialog")) {
      dialogWidget = new AlertDialog(dialogEl);
    } else if (dialogClassList.contains("lightbox-dialog--input")) {
      dialogWidget = new InputDialog(dialogEl);
    } else if (dialogClassList.contains("fullscreen-dialog")) {
      dialogWidget = new FullscreenDialog(dialogEl);
    } else if (dialogClassList.contains("snackbar-dialog")) {
      dialogWidget = new SnackbarDialog(dialogEl);
    } else if (dialogClassList.contains("toast-dialog")) {
      dialogWidget = new ToastDialog(dialogEl);
    } else if (dialogClassList.contains("drawer-dialog")) {
      dialogWidget = new DrawerDialog(dialogEl);
    } else if (dialogClassList.contains("panel-dialog")) {
      dialogWidget = new PanelDialog(dialogEl);
    } else if (dialogClassList.contains("lightbox-dialog")) {
      dialogWidget = new LightboxDialog(dialogEl);
    }

    const buttonWidget = new DialogButton(el, dialogWidget);

    dialogWidget._el.addEventListener("dialog-open", log);
    dialogWidget._el.addEventListener("dialog-close", log);
  });
};
