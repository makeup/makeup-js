# makeup-roving-tabindex

Implements a roving tab index on given collection of elements

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-roving-tabindex

// via yarn
yarn add makeup-roving-tabindex
```

## Example

```js
// require the module
const RovingTabindex = require('makeup-roving-tabindex');

// get an element reference
const widgetEl = document.querySelector('.widget');

// create a roving tabindex instance on the element
const rovingTabindex = RovingTabindex.createLinear(widgetEl, 'li');

// listen for events (optional)
widgetEl.addEventListener('rovingTabindexChange', function(e) {
    // console.log(e.detail);
})
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
        <li data-makeup-index="0" tabindex="0">Item 1</li>
        <li data-makeup-index="1" tabindex="-1">Item 2</li>
        <li data-makeup-index="2" tabindex="-1">Item 3</li>
    </ul>
</div>
```

## Options

* `autoReset`: the index position that should receive the roving tabindex when model is reset (default: null)
* `index`: the initial index position of the roving tabindex (default: 0)
* `wrap` : specify whether arrow keys should wrap/loop (default: false)
* `axis` : specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')

## Properties

* `filteredItems`: returns filtered items (e.g. non-hidden items)
* `index`: the index position of the roving tabindex (i.e. the element with tabindex="0")
* `items`: returns all items that match item selector

## Methods

* `reset`: will force a reset to the value specified by `autoReset`
* `destroy`: destroys all event listeners

## Custom Events        

* `rovingTabindexChange`
    * detail
        * fromIndex
        * toIndex

## Dependencies

* [makeup-navigation-emitter](https://github.com/makeup/makeup-js/tree/master/packages/makeup-navigation-emitter)
* [custom-event-polyfill](https://github.com/krambuhl/custom-event-polyfill) (for IE11)
* [nodelist-foreach-polyfill](https://github.com/imagitama/nodelist-foreach-polyfill) (for IE11)
