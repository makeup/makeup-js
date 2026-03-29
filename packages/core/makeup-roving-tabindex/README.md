# makeup-roving-tabindex

Implements a roving tab index on given collection of elements

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Example

```js
import * as RovingTabindex from "makeup-roving-tabindex";

const widgetEl = document.querySelector(".widget");

const rovingTabindex = RovingTabindex.createLinear(widgetEl, "li");

widgetEl.addEventListener("rovingTabindexChange", (e) => {
  console.log(e.detail);
});
```

Markup before:

```html
<div class="widget">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

Markup after:

```html
<div class="widget">
  <ul>
    <li tabindex="0">Item 1</li>
    <li tabindex="-1">Item 2</li>
    <li tabindex="-1">Item 3</li>
  </ul>
</div>
```

## Options

- `autoInit`: declares the initial roving tabindex item (default: "interactive"). Possible values are:
  - "none": no index position is set (useful in programmatic active-descendant)
  - "interactive": first non aria-disabled or hidden element (default)
  - "ariaChecked": first element with aria-checked=true (useful in ARIA menu)
  - "ariaSelected": first element with aria-selected=true (useful in ARIA tabs)
  - "ariaSelectedOrInteractive": first element with aria-selected=true, falling back to "interactive" if not found (useful in ARIA listbox)
  - _number_: specific index position of items (throws error if non-interactive)
- `autoReset`: declares the roving tabindex item after a reset and/or when keyboard focus exits the widget (default: "current"). Possible values are:
  - "none": no index position is set (useful in programmatic active-descendant)
  - "current": index remains current (radio button like behaviour)
  - "interactive": index moves to first non aria-disabled or hidden element
  - "ariaChecked": index moves to first element with aria-checked=true
  - "ariaSelected": index moves to first element with aria-selected=true
  - _number_: specific index position of items (throws error if non-interactive)
- `wrap` : specify whether arrow keys should wrap/loop (default: false)
- `axis` : specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')

## Properties

- `items`: returns all items matching the item selector (live DOM query, includes hidden and disabled items)
- `index`: gets or sets the current index position (setting triggers `rovingTabindexChange` if the index changes and the target is navigable)
- `currentItem`: returns the item element at the current index

## Methods

- `reset`: will force a reset to the value specified by `autoReset`
- `destroy`: destroys all event listeners

## Custom Events

- `rovingTabindexInit`
  - detail
    - items
    - fromIndex
    - toIndex
- `rovingTabindexChange`
  - detail
    - fromIndex
    - toIndex
- `rovingTabindexReset`
  - detail
    - fromIndex
    - toIndex
- `rovingTabindexMutation`
  - detail
    - fromIndex
    - toIndex
