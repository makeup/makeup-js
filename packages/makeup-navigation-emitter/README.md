# makeup-navigation-emitter

Emits custom events based on keyboard navigation of one or two dimensional model.

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking
changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-navigation-emitter

// via yarn
yarn add makeup-navigation-emitter
```

## Example 1

Example support for a roving tabindex model of keyboard navigation.

Note that this module will not change focus, that is the job of an observer such as makeup-roving-tabindex.

```html
<div class="widget">
    <ul>
        <li tabindex="0">Item 0</li>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>
```

```js
const NavigationEmitter = require('makeup-navigation-emitter');

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li'));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Example 2

Example support for an active descendant model of navigation with focus on ancestor of items.

Note that this module will not highlight the active item, that is the job of an observer such as makeup-active-descendant.

```html
<div class="widget" tabindex="0">
    <ul>
        <li>Item 0</li>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>
```

```js
const NavigationEmitter = require('makeup-navigation-emitter');

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li', { autoInit: -1, autoReset: -1 }));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Example 3

Example support for an active descendant model of navigation with focus on non-ancestor of items.

Note that this module will not highlight the active item, that is the job of an observer such as makeup-active-descendant.

```html
<div class="widget">
    <input type="text" />
    <ul>
        <li>Item 0</li>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>
```

```js
const NavigationEmitter = require('makeup-navigation-emitter');

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li', { autoInit: -1, autoReset: -1 }));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Options

* `autoInit`: specify an integer or -1 for initial index (default: 0)
* `autoReset`: specify an integer or -1 for index position when focus exits widget (default: null)
* `axis` : specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')
* `ignoreButtons`: if set to true, nested button elements will not trigger navigationModelChange events. This is useful in a combobox + button scenario, where only the textbox should trigger navigationModelChange events (default: false)
* `wrap` : specify whether arrow keys should wrap/loop (default: false)

## Methods

* `destroy`: destroys all event listeners
* `reset`: will force a reset to the value specified by `autoReset`

## Properties

* `items`: returns all items that match item selector
* `filteredItems`: returns filtered items (e.g. non-hidden items)

## Events

* `navigationModelInit` - fired when the model is auto initialised
* `navigationModelChange` - fired when the index is set by any means other than auto init or auto reset
* `navigationModelReset` - fired when the model is auto reset

For all 3 events, the event detail object contains the `fromIndex` and `toIndex`.

## Dependencies

* [makeup-exit-emitter](https://github.com/makeup/makeup-js/tree/master/packages/makeup-exit-emitter)
* [makeup-key-emitter](https://github.com/makeup/makeup-js/tree/master/packages/makeup-key-emitter)
* [custom-event](https://github.com/webmodules/custom-event) (for IE11)
* [nodelist-foreach-polyfill](https://github.com/imagitama/nodelist-foreach-polyfill) (for IE11)
