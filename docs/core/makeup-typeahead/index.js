// REQUIRE
//const typeahead = require('makeup-typeahead').default;

// IMPORT
import typeahead from "makeup-typeahead";

const list = document.querySelector("ul");
const selected = document.querySelector(".selected");
const TIMEOUT_LENGTH = 2000;

const { getIndex } = typeahead();

function handleKeyDown(e) {
  if (e.key.length === 1) {
    const listIndex = getIndex(list.children, e.key, TIMEOUT_LENGTH);
    if (listIndex !== -1) {
      selected.innerHTML = list.children[listIndex].innerHTML;
    }
  }
}

document.addEventListener("keydown", (e) => handleKeyDown(e));
