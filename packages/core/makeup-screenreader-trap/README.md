# makeup-screenreader-trap

This module restricts screen reader virtual cursor to a single subtree in the DOM. This behaviour is useful when implementing a modal interface (e.g. a modal dialog).

```js
import * as screenreaderTrap from "makeup-screenreader-trap";

// trap an element
screenreaderTrap.trap(document.querySelector("el"));

// untrap the current trapped element
screenreaderTrap.untrap();
```

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Options

- `useHiddenProperty`: use `hidden` property instead of `aria-hidden` (default: false)

## Events

- screenreaderTrap : fired by trapped element when screenreader trap is activated
- screenreaderUntrap : fired by trapped element when screenreader trap is deactivated
