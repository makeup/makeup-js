# makeup-tabs

A JavaScript class that represents ARIA [tabs](https://ebay.github.io/mindpatterns/disclosure/tabs/index.html). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-tabs/index.html).

## HTML

The following markup structure and classnames are required.

```html
<div class="tabs">
  <div class="tabs__items" role="tablist">
    <div aria-controls="tabpanel-1" aria-selected="true" class="tabs__item" id="tab-1" role="tab">
      <span>Tab 1</span>
    </div>
    <div aria-controls="tabpanel-2" aria-selected="false" class="tabs__item" id="tab-2" role="tab">
      <span>Tab 2</span>
    </div>
    <div aria-controls="tabpanel-3" aria-selected="false" class="tabs__item" id="tab-3" role="tab">
      <span>Tab 3</span>
    </div>
  </div>
  <div class="tabs__content">
    <div aria-labelledby="tab-1" class="tabs__panel" id="tabpanel-1" role="tabpanel">
      <div class="tabs__cell">
        <h3>Panel 1 Title</h3>
        <p>Panel 1 Content</p>
      </div>
    </div>
    <div aria-labelledby="tab-2" class="tabs__panel" hidden id="tabpanel-2" role="tabpanel">
      <div class="tabs__cell">
        <h3>Panel 2 Title</h3>
        <p>Panel 2 Content</p>
      </div>
    </div>
    <div aria-labelledby="tab-3" class="tabs__panel" hidden id="tabpanel-3" role="tabpanel">
      <div class="tabs__cell">
        <h3>Panel 3 Title</h3>
        <p>Panel 3 Content</p>
      </div>
    </div>
  </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#tabs).

## JavaScript

```js
import Tabs from "makeup-tabs";

document.querySelectorAll(".tabs").forEach(function (el, i) {
  const widget = new Tabs(el, config);

  el.addEventListener("makeup-tabs-change", function (e) {
    console.log(e.type, e.detail);
  });
});
```

## Config

The constructor takes a configuration object as its second parameter.

## Events

### makeup-tabs-change

Fired when the selected option changes.

- `fromIndex`: the index position of previously selected tab
- `toIndex`: the index position of the newly selected tab
