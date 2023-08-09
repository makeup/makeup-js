// REQUIRE
//const focusables = require('../../packages/makeup-focusables').default;

// IMPORT
import focusables from "../../packages/makeup-focusables";

const listEl = document.getElementById("list");
const appender1 = document.getElementById("appender1");
const appender2 = document.getElementById("appender2");
const appender3 = document.getElementById("appender3");
const output = document.getElementById("output");

function onButtonClick(e) {
  e.preventDefault();

  const listItem = document.createElement("li");

  if (e.target.id === "appender1") {
    listItem.setAttribute("tabindex", "0");
  } else if (e.target.id === "appender2") {
    listItem.setAttribute("tabindex", "-1");
  } else {
    listItem.setAttribute("tabindex", "0");
    listItem.setAttribute("hidden", "hidden");
  }

  listItem.innerText = `Item ${listEl.childNodes.length}`;
  listEl.appendChild(listItem);

  const focusableEls = focusables(listEl);
  output.innerText = focusableEls.length;
}

appender1.addEventListener("click", onButtonClick);
appender2.addEventListener("click", onButtonClick);
appender3.addEventListener("click", onButtonClick);
