// REQUIRE
//const scrollKeyPreventer = require('makeup-prevent-scroll-keys');

// IMPORT
import * as scrollKeyPreventer from "makeup-prevent-scroll-keys";

const widgetEl = document.querySelector(".widget");

scrollKeyPreventer.add(widgetEl);

window.addEventListener("scroll", (e) => console.log(e));

// scrollKeyPreventer.remove(widgetEl);
