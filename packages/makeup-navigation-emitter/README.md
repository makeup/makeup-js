# makeup-navigation-emitter

Emits custom `navigationModelChange` event when keyboard navigation keys (e.g ARROW-UP, ARROW-DOWN) occur on given array of elements, their container element or other associated owner.

This module can be used as the underlying logic & state for both roving-tabindex and active-descendant (hierarchical & programmatic) behaviour.

## Experimental

This module is still in an experimental state; until it reaches v1, all minor releases must be considered as breaking changes.

**NOTE**: All examples below show *abstract* markup examples/structures. In an effort to make clear what this module does and does not do, all examples **do not** include ARIA roles, state or properties. 

## Example 1

Example support for a roving tab-index model of keyboard navigation (typical of menu and tabs patterns). The list items form a one-dimensional model of navigation.

With keyboard focus on any list item element, arrow keys will update the underlying index position in relation to the list of items.

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

Example support for an active descendant model of navigation with keyboard focus on ancestor of items (typical of listbox pattern).

With keyboard focus on the widget, arrow keys will update the underlying index position in relation to the list of items.

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
import NavigationEmitter from 'makeup-navigation-emitter';

const widgetEl = document.querySelector('.widget');

var emitter = NavigationEmitter.createLinear(widgetEl, 'li'));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Example 3

Example support for an active descendant model of navigation with keyboard focus on non-ancestor of items (typical of combobox pattern).

With keyboard focus on the textbox, arrow keys will update the underlying index position in relation to the list of items.

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

var emitter = NavigationEmitter.createLinear(widgetEl, 'li', { autoInit: 'none', autoReset: 'none' }));

widgetEl.addEventListener('navigationModelChange', function(e) {
    console.log(e.detail.fromIndex, e.detail.toIndex);
});
```

## Options

* `autoInit`: declares the initial item (default: "interactive"). Possible values are:
    * "none": no index position is set (useful in programmatic active-descendant)
    * "interactive": first non aria-disabled or hidden element (default)
    * "ariaChecked": first element with aria-checked=true (useful in ARIA menu)
    * "ariaSelected": first element with aria-selected=true (useful in ARIA tabs)
    * "ariaSelectedOrInteractive": first element with aria-selected=true, falling back to "interactive" if not found (useful in ARIA listbox)
    * *number*: specific index position of items (throws error if non-interactive)
* `autoReset`: declares the item after a reset and/or when keyboard focus exits the widget (default: "current"). Possible values are:
    * "none": no index position is set (useful in programmatic active-descendant)
    * "current": index remains current (radio button like behaviour)
    * "interactive": index moves to first non aria-disabled or hidden element
    * "ariaChecked": index moves to first element with aria-checked=true
    * "ariaSelected": index moves to first element with aria-selected=true
    * *number*: specific index position of items (throws error if non-interactive)
* `axis` : specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')
* `ignoreByDelegateSelector`: CSS selector of descendant elements that will be ignored by the key event delegation (i.e. these elements will *not* operate the navigation emitter) (default: null)
* `wrap` : specify whether arrow keys should wrap/loop (default: false)

## Methods

* `destroy`: destroys all event listeners
* `reset`: will force a reset to the value specified by `autoReset`

## Properties

* `matchingItems`: returns all items that match item selector
* `navigableItems`: returns navigable subset of matchingItems (e.g. non-hidden & non aria-disabled items)

## Events

* `navigationModelInit` - fired when the model is auto initialised (bubbles: false)
* `navigationModelChange` - fired when the index is set by any means other than auto init or auto reset (bubbles: false)
* `navigationModelReset` - fired when the model is auto reset (bubbles: false)
* `navigationModelMutation` - fired when any changes to the elements DOM (bubbles: false)
