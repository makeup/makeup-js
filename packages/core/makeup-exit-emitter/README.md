# makeup-exit-emitter

Emits custom 'focusExit' event when keyboard focus has exited an element and all of its descendants.

## Experimental

This module is still in an experimental state; until it reaches v1, all minor releases must be considered as breaking changes.

## Example

```js
import * as ExitEmitter from "makeup-exit-emitter";

const el = document.getElementById("widget1");

ExitEmitter.addFocusExit(el);

el.addEventListener("focusExit", function (e) {
  console.log(this, e); // outputs (el, 'focusExit')
});
```

## Methods

- addFocusExit(el)
- removeFocusExit(el)

## Events

- 'focusExit'
  - event.detail
    - fromElement
    - toElement
