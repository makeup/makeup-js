# makeup-modal

Sets an element to a modal state using [makeup-keyboard-trap](https://github.com/makeup/makeup-js/tree/master/packages/core/makeup-keyboard-trap) and [makeup-screenreader-trap](https://github.com/makeup/makeup-js/tree/master/packages/core/makeup-screenreader-trap). All other elements become "inert".

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

```js
import { modal, unmodal } from "makeup-modal";

// set an element to modal
modal(document.querySelector("el"));

// reset the element to non-modal
unmodal();
```

## Install

```js
npm install makeup-modal
```

## Options

- `useHiddenProperty`: use the `hidden` property instead of `aria-hidden` to hide the surrounding DOM tree from all users, not just screen reader users (default: false)
- `hoist`: moves the element to `document.body` if it is nested deeper in the DOM, reducing the number of siblings and ancestor-siblings the traps need to hide (default: false)
- `wrap`: when the element is a direct body child, collects all other body children into a single inert container so one attribute can hide everything at once; intended to be used together with `hoist` (default: false)

## Events

- makeup-modal
- makeup-unmodal
