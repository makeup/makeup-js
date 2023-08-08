"use strict";

// requires NodeList.forEach polyfill for IE
require("nodelist-foreach-polyfill");

var RovingTabindex = require("../../index.js");

var rovers = [];
var appender = document.getElementById("appender");
var incrementer = document.getElementById("incrementer");
var decrementer = document.getElementById("decrementer");
var widgetEls = document.querySelectorAll(".widget");
var wrapCheckbox = document.getElementById("wrap");
appender.addEventListener("click", function () {
  widgetEls.forEach(function (el) {
    var listItem = document.createElement("li");
    listItem.innerText = "Item ".concat(parseInt(el.querySelectorAll("li").length, 10));
    el.children[0].appendChild(listItem);
  });
});
incrementer.addEventListener("click", function () {
  widgetEls.forEach(function (el, i) {
    rovers[i].index++;
  });
});
decrementer.addEventListener("click", function () {
  widgetEls.forEach(function (el, i) {
    rovers[i].index--;
  });
});
widgetEls.forEach(function (el) {
  rovers.push(
    RovingTabindex.createLinear(el, "li", {
      index: 0,
    }),
  );
  el.addEventListener("rovingTabindexChange", function (e) {
    console.log(e);
  });
});
wrapCheckbox.addEventListener("change", function (e) {
  rovers.forEach(function (rover) {
    rover.wrap = e.target.checked;
  });
});
