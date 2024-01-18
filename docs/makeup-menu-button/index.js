import "../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/menu-button";

// REQUIRE
// const MenuButton = require('../../packages/makeup-menu-button').default;

// IMPORT
import MenuButton from "../../packages/makeup-menu-button";

window.onload = function () {
  document.querySelectorAll(".menu-button:not(.menu-button-with-icon)").forEach(function (el, i) {
    const widget = new MenuButton(el);

    widget.menu.el.addEventListener("makeup-menu-select", (e) => console.log(e.type, e.detail));
    widget.menu.el.addEventListener("makeup-menu-change", (e) => console.log(e.type, e.detail));
    widget.menu.el.addEventListener("makeup-menu-button-mutation", (e) => console.log(e.type, e.detail));
  });

  document.querySelectorAll(".menu-button-with-icon").forEach(function (el, i) {
    const widget = new MenuButton(el, {valueTypeHTML: true});

    widget.menu.el.addEventListener("makeup-menu-select", (e) => console.log(e.type, e.detail));
    widget.menu.el.addEventListener("makeup-menu-change", (e) => console.log(e.type, e.detail));
    widget.menu.el.addEventListener("makeup-menu-button-mutation", (e) => console.log(e.type, e.detail));
  });
};
