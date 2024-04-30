import "../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/utility";
import "@ebay/skin/tabs";

// REQUIRE
// const Tabs = require('../../packages/makeup-tabs').default;

// IMPORT
import Tabs from "../../packages/makeup-tabs";

const log = (e) => console.log(e.type, e.detail);
const widgets = [];

window.onload = function () {
  document.querySelectorAll(".tabs").forEach(function (el, i) {
    el.addEventListener("makeup-tabs-change", log);

    widgets.push(new Tabs(el, { autoSelect: el.dataset.makeupAutoSelect === "false" ? false : true }));
  });
};
