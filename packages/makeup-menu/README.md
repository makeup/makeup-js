# makeup-menu

A JavaScript class that represents an ARIA [menu](https://ebay.github.io/mindpatterns/input/menu/index.html). No CSS provided.

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

### Stateless Menu

```html
<div class="menu">
    <div class="menu__items" role="menu">
        <div class="menu__item" role="menuitem">
            <span>Item 1</span>
        </div>
        <div class="menu__item" role="menuitem">
            <span>Item 2</span>
        </div>
        <div class="menu__item" role="menuitem">
            <span>Item 3</span>
        </div>
    </div>
</div>
```

### Single-Select Menu

```html
<div class="menu">
    <div class="menu__items" role="menu">
        <div class="menu__item" role="menuitemradio" aria-checked="true" data-menuitemradio-name="sort">
            <span>Item 1</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemradio" aria-checked="false" data-menuitemradio-name="sort">
            <span>Item 2</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemradio" aria-checked="false" data-menuitemradio-name="sort">
            <span>Item 3</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
    </div>
</div>
```

### Multi-Select Menu

```html
<div class="menu">
    <div class="menu__items" role="menu">
        <div class="menu__item" role="menuitemcheckbox" aria-checked="true" data-menuitemcheckbox-name="filter">
            <span>Item 1</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemcheckbox" aria-checked="false" data-menuitemcheckbox-name="sort">
            <span>Item 2</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemcheckbox" aria-checked="false" data-menuitemcheckbox-name="sort">
            <span>Item 3</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
    </div>
</div>
```

### Grouped Menu

```html
<div class="menu">
    <div class="menu__items" role="menu">
        <div class="menu__item" role="menuitem">
            <span>Item A1</span>
        </div>

        <hr class="menu__separator" role="separator" />

        <div class="menu__item" role="menuitemradio" aria-checked="true" data-makeup-group="sort">
            <span>Item B1</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
            <span>Item B2</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
            <span>Item B3</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>

        <hr class="menu__separator" role="separator" />

        <div class="menu__item" role="menuitemcheckbox" aria-checked="true" data-makeup-group="filter">
            <span>Item C1</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
        <div class="menu__item" role="menuitemcheckbox" aria-checked="true" data-makeup-group="filter">
            <span>Item C2</span>
            <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
                <use xlink:href="icon.svg#icon-tick-small"></use>
            </svg>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#menu).

## JavaScript

```js
const Menu = require('makeup-menu');

document.querySelectorAll('.menu').forEach(function(el, i) {
    const widget = new Menu(el, config);

    el.addEventListener('makeup-menu-select', function(e) {
        console.log(e.type, e.detail);
    });

    el.addEventListener('makeup-menu-change', function(e) {
        console.log(e.type, e.detail);
    });
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-menu-select

Fired when a stateless menu item is activated.

### makeup-menu-change

Fired when a radio or checkbox item is toggled.
