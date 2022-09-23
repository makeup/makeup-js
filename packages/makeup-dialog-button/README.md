# makeup-dialog-button

A JavaScript class representing a popup button for any kind of [dialog](https://ebay.github.io/mindpatterns/disclosure/dialog/index.html). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-dialog-button/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<button data-makeup-for="dialog-lightbox" class="dialog-button" type="button" aria-haspopup="dialog">Lightbox</button>

<div
    class="lightbox-dialog"
    hidden
    id="dialog-lightbox"
    role="dialog"
    aria-labelledby="dialog-1-title"
    aria-modal="true"
>
    <!-- dialog internals -->
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#button).

## JavaScript

```js
import DialogButton from "makeup-dialog-button";
import LightboxDialog from "makeup-lightbox-dialog";

document.querySelectorAll(".dialog-button").forEach(function (el, i) {
    const dialogEl = document.getElementById(el.dataset.makeupFor);
    const dialogWidget = new LightboxDialog(dialogEl);
    const widget = new DialogButton(el, dialogWidget, config);

    dialogWidget._el.addEventListener("dialog-open", log);
    dialogWidget._el.addEventListener("dialog-close", log);
});
```

## Config

The constructor takes a configuration object as its third parameter.

## Events

None
