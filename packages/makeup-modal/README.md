# makeup-modal

Sets an element to a modal state, using [makeup-keyboard-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-keyboard-trap) and [makeup-screenreader-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-screenreader-trap).

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

```js
const modal = require('makeup-modal');

// set an element to modal
modal.modal(document.querySelector('el'));

// reset the element to non-modal
modal.unmodal();
```

## Install

```js
// via npm
npm install makeup-modal

// via yarn
yarn add makeup-modal
```

## Options

* `useHiddenProperty`: screenreader-trap uses `hidden` property instead of `aria-hidden` (default: false)

## Events

* modal
* unmodal

## Dependencies

* [makeup-keyboard-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-keyboard-trap)
* [makeup-screenreader-trap](https://github.com/makeup/makeup-js/tree/master/packages/makeup-screenreader-trap)
