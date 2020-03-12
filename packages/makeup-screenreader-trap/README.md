# makeup-screenreader-trap

This module restricts screen reader virtual cursor to a single subtree in the DOM. This behaviour is useful when implementing a modal interface (e.g. a modal dialog).

```js
const screenreaderTrap = require('makeup-screenreader-trap');

// trap an element
screenreaderTrap.trap(document.querySelector('el'));

// untrap the current trapped element
screenreaderTrap.untrap();
```

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-screenreader-trap

// via yarn
yarn add makeup-screenreader-trap
```

## Events

* screenreaderTrap : fired by trapped element when screenreader trap is activated
* screenreaderUntrap : fired by trapped element when screenreader trap is deactivated

## Dependencies

* [custom-event](https://github.com/webmodules/custom-event) (for IE)
