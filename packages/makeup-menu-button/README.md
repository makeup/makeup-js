# makeup-menu-button

A JavaScript class that represents an ARIA [menu button](https://ebay.github.io/mindpatterns/input/menu-button/index.html). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-menu-button/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

### Stateless Menu Button

```html
<span class="menu-button">
  <button class="expand-btn" aria-haspopup="true" type="button">
    <span class="expand-btn__cell">
      <span class="expand-btn__text">Button</span>
      <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
        <use xlink:href="icon.svg#icon-dropdown"></use>
      </svg>
    </span>
  </button>
  <div class="menu-button__menu">
    <div class="menu-button__items" role="menu">
      <div class="menu-button__item" role="menuitem">
        <span>Menu Item 1</span>
      </div>
      <div class="menu-button__item" role="menuitem">
        <span>Menu Item 2</span>
      </div>
      <div class="menu-button__item" role="menuitem">
        <span>Menu Item 3</span>
      </div>
    </div>
  </div>
</span>
```

### Single-Select Menu Button

```html
<span class="menu-button">
  <button class="expand-btn" aria-expanded="false" aria-haspopup="true" type="button">
    <span class="expand-btn__cell">
      <span class="expand-btn__text">Button</span>
      <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
        <use xlink:href="icon.svg#icon-dropdown"></use>
      </svg>
    </span>
  </button>
  <div class="menu-button__menu">
    <div class="menu-button__items" role="menu">
      <div class="menu-button__item" role="menuitemradio" aria-checked="true" data-makeup-group="sort">
        <span>Menu Item 1</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
        <span>Menu Item 2</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
        <span>Menu Item 3</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
    </div>
  </div>
</span>
```

### Multi-Select Menu Button

```html
<span class="menu-button">
  <button class="expand-btn" aria-expanded="false" aria-haspopup="true" type="button">
    <span class="expand-btn__cell">
      <span class="expand-btn__text">Button</span>
      <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
        <use xlink:href="icon.svg#icon-dropdown"></use>
      </svg>
    </span>
  </button>
  <div class="menu-button__menu">
    <div class="menu-button__items" role="menu">
      <div class="menu-button__item" role="menuitemcheckbox" data-makeup-group="filter" aria-checked="true">
        <span>Menu Item 1</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemcheckbox" data-makeup-group="filter" aria-checked="true">
        <span>Menu Item 2</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemcheckbox" data-makeup-group="filter" aria-checked="false">
        <span>Menu Item 3</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
    </div>
  </div>
</span>
```

### Grouped Menu Button

```html
<span class="menu-button">
  <button class="expand-btn" aria-expanded="false" aria-haspopup="true" type="button">
    <span class="expand-btn__cell">
      <span class="expand-btn__text">Button</span>
      <svg class="icon icon--dropdown" focusable="false" height="8" width="8" aria-hidden="true">
        <use xlink:href="icon.svg#icon-dropdown"></use>
      </svg>
    </span>
  </button>
  <div class="menu-button__menu">
    <div class="menu-button__items" role="menu">
      <div class="menu-button__item" role="menuitem">
        <span>Menu Item A1</span>
      </div>

      <hr class="menu-button__separator" role="separator" />

      <div class="menu-button__item" role="menuitemradio" aria-checked="true" data-makeup-group="sort">
        <span>Menu Item B1</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
        <span>Menu Item B2</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemradio" aria-checked="false" data-makeup-group="sort">
        <span>Menu Item B3</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>

      <hr class="menu-button__separator" role="separator" />

      <div class="menu-button__item" role="menuitemcheckbox" data-makeup-group="filter" aria-checked="true">
        <span>Menu Item C1</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
      <div class="menu-button__item" role="menuitemcheckbox" data-makeup-group="filter" aria-checked="true">
        <span>Menu Item C2</span>
        <svg class="icon icon--tick-small" focusable="false" height="8" width="8" aria-hidden="true">
          <use xlink:href="icon.svg#icon-tick-small"></use>
        </svg>
      </div>
    </div>
  </div>
</span>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#menu-button).

## JavaScript

```js
import MenuButton from "makeup-menu-button";

document.querySelectorAll(".menu-button").forEach(function (el, i) {
  const widget = new MenuButton(el, config);

  el.addEventListener("makeup-menu-button-select", function (e) {
    console.log(e.type, e.detail);
  });

  el.addEventListener("makeup-menu-button-change", function (e) {
    console.log(e.type, e.detail);
  });
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-menu-button-select

Fired when a stateless menu item is activated.

### makeup-menu-button-change

Fired when a radio or checkbox item is toggled.
