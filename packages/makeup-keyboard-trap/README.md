# makeup-keyboard-trap

This module restricts keyboard tabindex to a single subtree in the DOM. This behaviour is useful when implementing a modal interface (e.g. a modal dialog).

It will ignore <em>programmatically</em> focusable items with a tabindex of `-1`.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

```js
import * as keyboardTrap from "makeup-keyboard-trap";

// trap an element
keyboardTrap.trap(document.querySelector("el"));

// untrap the current trapped element
keyboardTrap.untrap();
```

## Install

```js
// via npm
npm install makeup-keyboard-trap

// via yarn
yarn add makeup-keyboard-trap
```

## Events

- keyboardTrap : fired by trapped element when keyboard trap is activated
- keyboardUntrap : fired by trapped element when keyboard trap is deactivated
