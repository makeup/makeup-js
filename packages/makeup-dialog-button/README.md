# makeup-dialog-button

A JavaScript class representing a popup button for any kind of [dialog](https://ebay.github.io/mindpatterns/disclosure/dialog/index.html). No CSS provided.

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<button data-makeup-for="dialog-lightbox" class="dialog-button" type="button" aria-haspopup="dialog">Lightbox</button>

<div class="lightbox-dialog" hidden id="dialog-lightbox" role="dialog" aria-labelledby="dialog-1-title" aria-modal="true" >
    <!-- dialog internals -->
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#button).

## JavaScript

```js
const DialogButton = require('makeup-dialog-button');

document.querySelectorAll('.dialog-button').forEach(function(el, i) {
    const widget = new DialogButton(el, config);
});
```

## Config

The constructor takes a configuration object as its second parameter.

## Events

None
