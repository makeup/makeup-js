# makeup-combobox

A JavaScript class that represents an ARIA [combobox](https://ebay.github.io/mindpatterns/input/combobox/index.html). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-combobox/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<span class="combobox">
    <span class="combobox__control">
        <input autocomplete="off" name="combobox-default" placeholder="Combobox" role="combobox" type="text" aria-haspopup="listbox" aria-label="Combobox demo" aria-owns="listbox1" />
        <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
            <use xlink:href="../style/icon.svg#icon-dropdown"></use>
        </svg>
    </span>
    <div class="combobox__listbox">
        <div id="listbox1" class="combobox__options" role="listbox">
            <div class="combobox__option" role="option">
                <span>Option 1</span>
            </div>
            <div class="combobox__option" role="option">
                <span>Option 2</span>
            </div>
            <div class="combobox__option" role="option">
                <span>Option 3</span>
            </div>
        </div>
    </div>
</span>
```

For autocomplete, add `aria-autocomplete="list"` to the input element.

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#combobox).

## JavaScript

```js
const Combobox = require('makeup-combobox');

document.querySelectorAll('.combobox').forEach(function(el, i) {
    const widget = new Combobox(el, config);

    el.addEventListener('makeup-combobox-change', function(e) {
        console.log(e.type, e.detail);
    });
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-combobox-change

Fired when a combobox option is chosen either via manual selection or automatic selection.
