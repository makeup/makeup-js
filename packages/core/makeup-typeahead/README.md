# makeup-typeahead

This module produces a function generator. The generated function produces the index of the suggested menu item to highlight / focus. It keeps track of the characters entered, adding them onto a string.

Its parameters are a list of DOM nodes, a char, and the length of a timeout. Each character starts a new timeout. These timeouts are stacked, not debounced — when a timeout fires it resets the accumulated string regardless of subsequent keypresses.

When the timeout executes the callback, it will re-start the suggestions with an empty string.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

### Example

```js
import typeahead from "makeup-typeahead";

const list = document.querySelector("ul");
const selected = document.querySelector(".selected");
const TIMEOUT_LENGTH = 2000;

const { getIndex, destroy } = typeahead();

function handleKeyDown(e) {
  if (e.key.length === 1) {
    const listIndex = getIndex(list.children, e.key, TIMEOUT_LENGTH);
    if (listIndex !== -1) {
      selected.innerHTML = list.children[listIndex].innerHTML;
    }
  }
}
```
