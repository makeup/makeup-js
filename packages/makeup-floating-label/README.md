# makeup-floating-label

Module for creating an accessible, unobtrusive, progressively enhanced floating label.

In a non-javascript state the label will **not** obscure the textbox; the label will remain in its default floated position above the textbox.

## Experimental

This module is still in an experimental state, until it reaches v1 you must consider all minor releases as breaking changes.

## Example

```js
import FloatingLabel from "makeup-floating-label";

// get NodeList
const widgetEls = document.querySelectorAll(".floating-label");

// assign next id to each element
widgetEls.forEach(function (el) {
    var widget = new FloatingLabel(el);
});
```

Markup:

```html
<div class="floating-label">
    <label class="floating-label__label" for="input-1">Input 1</label>
    <input class="floating-label__textbox" id="input-1" name="input-1" />
</div>
```

## Params

-   `el`: the root widget el
-   `options.labelElementAnimateModifier`: the classname to add when the label begins its CSS animation (default: 'floating-label\_\_label--animate')
-   `options.labelElementInlineModifier`: the classname to add when the label is in its non-floating state (default: 'floating-label\_\_label--inline')
-   `options.labelElementFocusModifier`: the classname to add to the label when the textbox has keyboard focus
-   `options.labelElementInvalidModifier`: the classname to add to the label when the textbox has an an aria-invalid state
-   `options.labelElementDisabledModifier`: the classname to add to the label when the textbox has an a disabled state
-   `options.textboxElementBackgroundRGB`: for the purposes of a Chrome autofill bug, if your textbox background colour is not white, specify its RGB value (default: 'rgb(255, 255, 255)'). An array of RGB values is also supported in the case your textbox background has different colours on focus, invalid, disabled, etc.

## Methods

-   `refresh()`: call this after form autofill or reset to refresh the label state

## Custom Events

None
