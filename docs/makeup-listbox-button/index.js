import "../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/button";
import "@ebay/skin/listbox-button";

// REQUIRE
// const ListboxButton = require('../../packages/makeup-listbox-button').default;

// IMPORT
import ListboxButton from "../../packages/makeup-listbox-button";

const widgets = [];
const log = (e) => console.log(e.type, e.detail);

window.onload = function () {
  document.querySelectorAll(".listbox-button").forEach(function (el, i) {
    const buttonValueType = el.classList.contains("listbox-button-with-iconText")
      ? "both"
      : el.classList.contains("listbox-button-with-icon")
        ? "icon"
        : "text";
    el.addEventListener("makeup-listbox-button-init", log);
    el.addEventListener("makeup-listbox-button-change", log);
    el.addEventListener("makeup-listbox-button-mutation", log);

    widgets.push(new ListboxButton(el, { autoSelect: el.dataset.makeupAutoSelect === "false" ? false : true, buttonValueType }));
  });
};
