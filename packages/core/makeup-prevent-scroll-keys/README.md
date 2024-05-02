# makeup-prevent-scroll-keys

This module prevents the default scroll event when pressing down arrow, page down, spacebar, etc. This behaviour is required for ARIA widgets such as menu, tabs and comboboxes. See [eBay MIND Patterns](https://ebay.gitbooks.io/mindpatterns/content/) for further information.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Example

```js
import * as scrollKeyPreventer from "makeup-prevent-scroll-keys";

// get element reference
const widgetEl = document.querySelector(".widget");

// execute
scrollKeyPreventer.add(el);

// to remove
scrollKeyPreventer.remove(el);
```
