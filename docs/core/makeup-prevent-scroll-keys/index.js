// REQUIRE
//const scrollKeyPreventer = require('../../../packages/core/makeup-prevent-scroll-keys');

// IMPORT
import * as scrollKeyPreventer from "../../../packages/core/makeup-prevent-scroll-keys";

const widgetEl = document.querySelector(".widget");

scrollKeyPreventer.add(widgetEl);

window.addEventListener("scroll", (e) => console.log(e));

// scrollKeyPreventer.remove(widgetEl);
