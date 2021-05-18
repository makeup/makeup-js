# makeup-listbox

A JavaScript class that represents an ARIA [listbox](https://ebay.github.io/mindpatterns/input/listbox/index.html). No CSS provided.

The listbox class is consumed by the following modules: [listbox-button](../makeup-listbox-button)</a>, [combobox](../makeup-combobox).</p>

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div class="listbox" data-auto-select="true">
    <div class="listbox__options" role="listbox" tabindex="0">
        <div class="listbox__option" role="option" aria-selected="false">
            <span class="listbox__value">Option 1</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </svg>
        </div>
        <div class="listbox__option" role="option" aria-selected="false">
            <span class="listbox__value">Option 2</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </svg>
        </div>
        <div class="listbox__option" role="option" aria-selected="false">
            <span class="listbox__value">Option 3</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </svg>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#listbox).

## JavaScript

```js
const Listbox = require('makeup-listbox');

document.querySelectorAll('.listbox').forEach(function(el, i) {
    const widget = new Listbox(el, config);

    el.addEventListener('makeup-listbox-change', function(e) {
        console.log(e.type, e.detail);
    });
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-listbox-change

Fired when the selected option changes.

* `optionIndex`: the index position of the selected option
* `optionValue`: the value of the selected option
