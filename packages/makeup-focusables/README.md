# makeup-focusables

Returns an array of all focusable descendants of the given element.

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-focusables

// via yarn
yarn add makeup-focusables
```

## Example

Markup:

```html
<div class="widget">
    <h2 tabindex="-1">Widget Title</h2>
    <p>Widget Text</p>
    <button type="button">Widget Button</button>
    <a href="#">Widget Link</a>
</div>
```

```js
// require the module
const focusables = require('makeup-focusables');

// get element reference
const widgetEl = document.querySelector('.widget');

// get array of all focusable elements (keyboard and programmatic)
const allItems = focusables(widgetEl);

console.log(allItems.length) // outputs: 3

// get array of only keyboard focusable elements
const keyboardItems = focusables(widgetEl, true);

console.log(keyboardItems.length) // outputs: 2
```

## Parameters

* `el`: the element to search (default: undefined)
* `keyboardOnly`: return only elements focusable in sequential keyboard navigation (default: false)

## Custom Events        

* None

## Dependencies

* None

## Polyfills

* None
