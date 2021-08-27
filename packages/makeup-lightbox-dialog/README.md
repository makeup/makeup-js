# makeup-lightbox-dialog

JavaScript class representing a generic [lightbox dialog](https://ebay.gitbook.io/mindpatterns/disclosure/lightbox-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-lightbox-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div class="lightbox-dialog lightbox-dialog--mask-fade" id="dialog-lightbox" role="dialog" aria-labelledby="lightbox-dialog-title" aria-modal="true" hidden>
    <div class="lightbox-dialog__window lightbox-dialog__window--fade">
        <div class="lightbox-dialog__header">
            <h2 id="lightbox-dialog-title">Lightbox Dialog</h2>
            <button aria-label="Close dialog" class="icon-btn lightbox-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="../icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="lightbox-dialog__main">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p><a href="http://www.ebay.com">www.ebay.com</a></p>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#lightbox-dialog).

## JavaScript

```js
const LightboxDialog = require('makeup-lightbox-dialog');

document.querySelectorAll('.lightbox-dialog').forEach(function(el, i) {
    const widget = new LightboxDialog(el, config);
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-dialog-open

Fired when the dialog is opened.

### makeup-dialog-close

Fired when the dialog is closed.
