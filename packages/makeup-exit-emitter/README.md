# makeup-exit-emitter

Emits custom 'focusExit' event when focus has exited an element and all of it's descendants.

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-exit-emitter

// via yarn
yarn add makeup-exit-emitter
```

## Example

```js
    const ExitEmitter = require('makeup-exit-emitter');

    const el = document.getElementById('#widget1');

    ExitEmitter.addFocusExit(el);

    el.addEventListener('focusExit', function(e){
        console.log(this, e); // outputs (el1, 'focusExit')
    });
```

## Methods

* addFocusExit(el)
* removeFocusExit(el)

## Events

* 'focusExit'
    * event.detail
        * fromElement
        * toElement

## Dependencies

* [makeup-next-id](https://github.com/makeup/makeup-js/packages/makeup-next-id)
* [custom-event](https://github.com/webmodules/custom-event) (for IE)
