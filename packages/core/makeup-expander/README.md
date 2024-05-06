# makeup-expander

Creates the basic interactivity for an element that expands and collapses another element.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Example 1: Requires aria-expanded only

In the first example, our expanded content is adjacent to the host element.

```html
<div class="expander">
  <button class="expander__host">Click for Flyout</button>
  <div class="expander__content">
    <p>Any kind of HTML control can go inside...</p>
    <p>A link: <a id="foo" href="http://www.ebay.com">www.ebay.com</a></p>
    <p>A button: <button>Click Me</button></p>
    <p>An input: <input type="text" aria-label="Dummy textbox" /></p>
    <p>A checkbox: <input type="checkbox" aria-label="Dummy checkbox" /></p>
  </div>
</div>
```

```js
import Expander from "makeup-expander";

// get an element reference
const widgetEl = document.querySelector(".expander");

// options
const options = {
  expandOnClick: true,
};

// get widget instance
const widget = new Expander(widgetEl, options);
```

Clicking the button will now toggle its aria-expanded state. CSS can be used to display the content accordingly, for example:

```css
.expander__content {
  display: none;
}

.expander__host[aria-expanded="true"] ~ .expander__content {
  display: block;
}
```

## Example 2: Requires aria-expanded and a class

In this second example, our expanded content is not adjacent to the host element.

```html
<div class="expander">
  <span>
    <input class="expander__host" type="text" />
  </span>
  <div class="expander__content">
    <p>Any kind of HTML control can go inside...</p>
    <p>A link: <a id="foo" href="http://www.ebay.com">www.ebay.com</a></p>
    <p>A button: <button>Click Me</button></p>
    <p>An input: <input type="text" aria-label="Dummy textbox" /></p>
    <p>A checkbox: <input type="checkbox" aria-label="Dummy checkbox" /></p>
  </div>
</div>
```

A CSS classname is required as our styling hook. This can be passed in via the options.

```js
// options
const options = {
  expandedClass: "expander--expanded",
  expandOnFocus: true,
};
```

Setting focus on the host (a text input) sets it's aria-expanded state _and_ add adds the chosen class to the root. CSS can be used to display the content accordingly, for example:

```css
.expander--expanded .expander__content {
  display: block;
}
```

## Params

- `el`: the root widget el
- `options.alwaysDoFocusManagement`: whether `focusManagement` option (see below) should apply for mouse click
- `options.ariaControls`: specify whether `aria-controls` relationship should be created between host and overlay (default: true)
- `options.autoCollapse`: applies a collapse behavior (`collapseOnClick`, `collapseOnFocusOut`, `collapseOnMouseOut`) based on expand behaviour (default: false)
- `options.collapseOnClickOut`: whether the content should collapse when clicking outside of content (default: false)
- `options.collapseOnFocusOut`: whether the content should collapse when focus leaves the content (default: false)
- `options.collapseOnMouseOut`: whether the content should collapse when mouse leaves the content (default: false)
- `options.contentSelector`: the query selector for the expandee element in relation to the widget (default: '.expander\_\_content')
- `options.expandOnClick`: whether the host should be click activated (default: false)
- `options.expandOnFocus`: whether the host should be focus activated (default: false)
- `options.expandOnHover`: whether the host should be hover activated (default: false)
- `options.focusManagement`: where keyboard focus should go (null, 'content', 'focusable', 'interactive', or ID reference) when expanded via `ENTER` or `SPACEBAR` (default: null)
- `options.hostSelector`: the query selector for the host element in relation to the widget (default: '.expander\_\_host')
- `options.expandedClass`: the class which will be used on the root element to signify expanded state. **Example:** `foo--expanded`; this mirrors the `aria-expanded="true"` setting on the host element

## Properties

Set the following properties to true or false to enable or disable the behaviour.

- `collapseOnClickOut`
- `collapseOnFocusOut`
- `collapseOnMouseOut`
- `expanded`
- `expandOnClick`
- `expandOnFocus`
- `expandOnHover`

## Methods

- `collapse()`: set state to collapsed (DEPRECATED)
- `expand()`: set state to expanded (DEPRECATED)
- `isExpanded()`: returns expanded state (DEPRECATED)
- `toggle()`: toggle expanded/collapsed state (DEPRECATED)

## Events

- `expander-collapse`
- `expander-expand`

## Dependencies

- [makeup-exit-emitter](https://github.com/makeup/makeup-js/tree/master/packages/core/makeup-exit-emitter)
- [makeup-focusables](https://github.com/makeup/makeup-js/tree/master/packages/core/makeup-focusables)
- [makeup-next-id](https://github.com/makeup/makeup-js/tree/master/packages/core/makeup-next-id)
