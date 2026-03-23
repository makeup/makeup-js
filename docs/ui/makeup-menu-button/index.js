import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/menu-button";

// REQUIRE
// const MenuButton = require('makeup-menu-button').default;

// IMPORT
import MenuButton from "makeup-menu-button";

window.onload = function () {
  document.querySelectorAll(".menu-button").forEach(function (el, i) {
    const hasCustomLabel = el.classList.contains("menu-button-with-icon-customText");
    const hasIconText = el.classList.contains("menu-button-with-iconText");
    const hasIcon = el.classList.contains("menu-button-with-icon");

    let buttonValueType;
    if (hasIconText) {
      buttonValueType = "both";
    } else if (hasIcon || hasCustomLabel) {
      buttonValueType = "icon";
    } else {
      buttonValueType = "text";
    }

    const menuItemButtonAriaLabelSelector = hasCustomLabel ? ".menu-button__item-value span" : null;

    const widget = new MenuButton(el, {
      buttonValueType,
      menuItemButtonAriaLabelSelector,
    });

    widget.el.addEventListener("makeup-menu-button-select", (e) => console.log(e.type, e.detail));
    widget.el.addEventListener("makeup-menu-button-change", (e) => console.log(e.type, e.detail));
    widget.el.addEventListener("makeup-menu-button-mutation", (e) => console.log(e.type, e.detail));
  });
};
