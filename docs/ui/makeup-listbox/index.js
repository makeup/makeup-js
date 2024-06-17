import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/listbox";

// REQUIRE
// const Listbox = require('makeup-listbox').default;

// IMPORT
import Listbox from "makeup-listbox";

const log = (e) => console.log(e.type, e.detail);
const widgets = [];

window.onload = function () {
  document.querySelectorAll(".listbox").forEach(function (el, i) {
    el.addEventListener("activeDescendantInit", log);
    el.addEventListener("activeDescendantChange", log);
    el.addEventListener("makeup-listbox-init", log);
    el.addEventListener("makeup-listbox-change", log);
    el.addEventListener("makeup-listbox-mutation", log);

    widgets.push(new Listbox(el, { autoSelect: el.dataset.makeupAutoSelect === "false" ? false : true }));
  });
};
