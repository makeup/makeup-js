# makeup-key-emitter

Emits custom events for common accessibility keys (arrowRightKeyDown, escKeyDown, etc).

## Experimental

This module is still in an experimental state; until it reaches v1, all minor releases must be considered as breaking changes.

## Example

```js
import KeyEmitter from "makeup-key-emitter";

let el = document.getElementById("#widget1");

KeyEmitter.addKeyDown(el);

el.addEventListener("arrowRightKeyDown", function (e) {
  console.log(this, e.type); // outputs (el1, 'arrowRightKeyDown')
});
```

## Methods

- addKeyDown(el)
- addKeyUp(el)
- removeKeyDown(el)
- removeKeyUp(el)
- add(el)
- remove(el)
