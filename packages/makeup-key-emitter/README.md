# makeup-key-emitter

Emits custom events for common accessibility keys (arrowRightKeyDown, escKeyDown, etc).

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-key-emitter

// via yarn
yarn add makeup-key-emitter
```

## Example

```js
const KeyEmitter = require('makeup-key-emitter');

let el = document.getElementById('#widget1');

KeyEmitter.addKeyDown(el);

el.addEventListener('arrowRightKeyDown', function(e) {
    console.log(this, e.type); // outputs (el1, 'arrowRightKeyDown')
});
```

## Methods

* addKeyDown(el)
* addKeyUp(el)
* removeKeyDown(el)
* removeKeyUp(el)
* add(el)
* remove(el)
