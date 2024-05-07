# makeup-next-id

Assigns the next id in sequence to an element, if an id property does not already exist.

The id will consist of a configurable prefix (default: 'nid'), followed by three randomly generated chars, then a number in sequence. For example: `nid-sdv-1`, `nid-sdv-2`, `nid-sdv-3`, etc.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Example

```js
// import the module
import nextId from "makeup-next-id";

// get NodeList
const widgetEls = document.querySelectorAll(".widget");

// assign next id to each element
widgetEls.forEach((el) => nextId(el));
```

Markup before:

```html
<div class="widget"></div>
<div class="widget"></div>
<div class="widget"></div>
```

Markup after:

```html
<div class="widget" id="nid-tCa-1"></div>
<div class="widget" id="nid-tCa-2"></div>
<div class="widget" id="nid-tCa-3"></div>
```

## Custom Events

- None

## Dependencies

- [nanoid](https://www.npmjs.com/package/nanoid)

## Polyfills

- None
