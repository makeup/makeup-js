// REQUIRE
//const focusables = require('makeup-focusables').default;

// IMPORT
import focusables from "makeup-focusables";

const listEl = document.getElementById("list");
const appender1 = document.getElementById("appender1");
const appender2 = document.getElementById("appender2");
const appender3 = document.getElementById("appender3");
const appender4 = document.getElementById("appender4");
const output = document.getElementById("output");

function onButtonClick(e) {
  e.preventDefault();

  const listItem = document.createElement("li");
  listItem.innerText = `Item ${listEl.childNodes.length}`;

  if (e.target.id === "appender1") {
    listItem.setAttribute("tabindex", "0");
  } else if (e.target.id === "appender2") {
    listItem.setAttribute("tabindex", "-1");
  } else if (e.target.id === "appender3") {
    listItem.setAttribute("tabindex", "0");
    listItem.setAttribute("hidden", "hidden");
  } else {
    const listItemChild = document.createElement("button");
    listItem.setAttribute("hidden", "hidden");
    listItem.appendChild(listItemChild);
  }

  listEl.appendChild(listItem);

  const focusableEls = focusables(listEl);
  output.innerText = focusableEls.length;
}

appender1.addEventListener("click", onButtonClick);
appender2.addEventListener("click", onButtonClick);
appender3.addEventListener("click", onButtonClick);
appender4.addEventListener("click", onButtonClick);
