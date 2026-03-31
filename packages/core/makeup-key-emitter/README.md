# makeup-key-emitter

Emits custom keyDown and keyUp events for the following accessibility keys:

- `arrowLeft`, `arrowUp`, `arrowRight`, `arrowDown`
- `enter`, `escape`, `spacebar`
- `home`, `end`, `pageUp`, `pageDown`

For example, pressing the right arrow key emits `arrowRightKeyDown` and `arrowRightKeyUp`.

## Experimental

This module is still in an experimental state; until it reaches v1, all minor releases must be considered as breaking changes.

## Example

```js
import { addKeyDown } from "makeup-key-emitter";

const el = document.getElementById("widget1");

addKeyDown(el);

el.addEventListener("arrowRightKeyDown", function (e) {
  console.log(this, e.type); // outputs (el, 'arrowRightKeyDown')
});
```

## Methods

- addKeyDown(el)
- addKeyUp(el)
- removeKeyDown(el)
- removeKeyUp(el)
- add(el)
- remove(el)
