# makeup-modal

Sets an element to a modal state using [makeup-keyboard-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-keyboard-trap) and [makeup-screenreader-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-screenreader-trap). All other elements become "inert".

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

```js
import * as modal from 'makeup-modal';

// set an element to modal
modal.modal(document.querySelector('el'));

// reset the element to non-modal
modal.unmodal();
```

## Install

```js
npm install makeup-modal
```

## Options

* `useHiddenProperty`: use `hidden` property for inert content instead of `aria-hidden` (useful for fullscreen modals) (default: false)
* `hoist`: moves the element to the document root (default: false)
* `wrap`: if element is at document root, wraps all "inert" sibling elements into a single container (default: false)

## Events

* makeup-modal
* makeup-unmodal
