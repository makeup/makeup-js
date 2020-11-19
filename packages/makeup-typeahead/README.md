# makeup-typeahead

This module produces a function generator. The generated function produces the index of the suggested menu item to highlight / focus. It keeps track of the characters entered, adding them onto a string. 

Its parameters are a list of dom nodes, a char, and the length of a timeout. The timeout is restarted when a new char is given the function. 

When the timeout executes the callback, it will re-start the suggestions with an empty string.

### Example
```js
const typeahead = require('makeup-typeahead');

const list = document.querySelector('ul');
const selected = document.querySelector('.selected');
const TIMEOUT_LENGTH = 2000;

const getIndex = typeahead();

function handleKeyDown(e) {
    if (e.key.length === 1) {
        const listIndex = getIndex(list.children, e.key, TIMEOUT_LENGTH);
        if (listIndex !== - 1) {
            selected.innerHTML = list.children[listIndex].innerHTML;
        }
    }
}
```

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-typeahead

// via yarn
yarn add makeup-typeahead
```

## Dependencies

* [core-js-pure](https://github.com/zloirock/core-js)