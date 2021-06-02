# makeup-listbox-button

A JavaScript class that represents an ARIA [listbox button](https://ebay.github.io/mindpatterns/input/listbox-button/index.html). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-listbox-button/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<span class="listbox-button">
    <button class="expand-btn" style="min-width: 150px" aria-expanded="false" aria-haspopup="listbox">
        <span class="expand-btn__cell">
            <span class="expand-btn__text">Option 1</span>
            <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-dropdown"></use>
            </svg>
        </span>
    </button>
    <div class="listbox-button__listbox">
        <div class="listbox-button__options" role="listbox" tabindex="0">
            <div class="listbox-button__option" role="option">
                <span class="listbox-button__value">Option 1</span>
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </div>
            <div class="listbox-button__option" role="option">
                <span class="listbox-button__value">Option 2</span>
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </div>
            <div class="listbox-button__option" role="option">
                <span class="listbox-button__value">Option 3</span>
                <svg class="icon icon--tick-small" focusable="false" height="8" width="8">
                    <use xlink:href="icon.svg#icon-tick-small"></use>
                </svg>
            </div>
        </div>
    </div>
</span>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#listbox-button).

## JavaScript

```js
const ListboxButton = require('makeup-listbox-button');

document.querySelectorAll('.listbox-button').forEach(function(el, i) {
    const widget = new ListboxButton(el, config);

    el.addEventListener('makeup-listbox-button-change', function(e) {
        console.log(e.type, e.detail);
    });
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-listbox-button-change

Fired when the listbox selection is changed.

* `fromValue`: the old value
* `toValue`: the new value
