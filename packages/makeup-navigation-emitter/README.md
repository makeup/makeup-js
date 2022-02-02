# makeup-navigation-emitter

Emits custom `navigationModelChange` event when keyboard navigation keys (e.g ARROW-UP, ARROW-DOWN) occur on given array of elements, their container element or other associated owner.

This module can be used as the underlying logic & state for both roving-tabindex and active-descendant behaviour.

## Experimental

This module is still in an experimental state; until it reaches v1, all minor releases must be considered as breaking changes.

## Example 1

Example support for a roving tab-index model of keyboard navigation (typical of menu and tabs patterns). The list items form a one-dimensional model of navigation.

With keyboard focus on any list item element, arrow keys will update the underlying model.

**NOTE:** this module will not actually modify the DOM or change any keyboard focus, that is the job of an observer such as makeup-roving-tabindex (which consumes this module).

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
import NavigationEmitter from 'makeup-navigation-emitter';

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li'));

// the navigationModelChange event will trigger when using UP/DOWN arrow keys on any element in model
widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Example 2

Example support for an active descendant model of navigation with keyboard focus on ancestor of items (typical of listbox pattern). Again, the list items form a one-dimensional model of navigation.

With keyboard focus on the widget, arrow keys will update the underlying model.

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
import NavigationEmitter from 'makeup-navigation-emitter';

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li', { autoInit: -1, autoReset: -1 }));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Example 3

Example support for an active descendant model of navigation with focus on non-ancestor of items (typical of combobox pattern). Once more, the list elements form the one-dimensional model.

With keyboard focus on the textbox, arrow keys will update the underlying model.

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
import NavigationEmitter from 'makeup-navigation-emitter';

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
