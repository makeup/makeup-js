// REQUIRE
//const NavigationEmitter = require('../../packages/core/makeup-navigation-emitter');

// IMPORT
import * as NavigationEmitter from "../../packages/core/makeup-navigation-emitter";

const emitters = [];
const appender = document.getElementById("appender");
const widgetEls = document.querySelectorAll(".widget");
const wrapCheckbox = document.getElementById("wrap");
const log = (e) => console.log(e.type, e.detail);

const options = [{}, { autoInit: "none", autoReset: "none" }, { autoInit: "none", autoReset: "none" }];

appender.addEventListener("click", function () {
  widgetEls.forEach(function (el) {
    const listEl = el.querySelector("ul");
    const listItem = document.createElement("li");
    listItem.innerText = `Item ${parseInt(listEl.querySelectorAll("li").length, 10)}`;
    listEl.appendChild(listItem);
  });
});

widgetEls.forEach(function (el, index) {
  el.addEventListener("navigationModelInit", log);
  el.addEventListener("navigationModelChange", log);
  el.addEventListener("navigationModelReset", log);
  el.addEventListener("navigationModelMutation", log);
  emitters.push(NavigationEmitter.createLinear(el, "li", options[index]));
});

wrapCheckbox.addEventListener("change", function (e) {
  emitters.forEach(function (emitter) {
    emitter.model.options.wrap = e.target.checked;
  });
});

// emitters[0].model.index = 1;
// emitters[1].model.index = 1;
