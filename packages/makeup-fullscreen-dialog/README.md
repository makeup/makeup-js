# makeup-fullscreen-dialog

JavaScript class representing a generic [fullscreen dialog](https://ebay.gitbook.io/mindpatterns/disclosure/fullscreen-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-fullscreen-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div
    class="fullscreen-dialog fullscreen-dialog--transition"
    id="dialog-fullscreen"
    role="dialog"
    aria-labelledby="fullscreen-dialog-title"
    aria-modal="true"
    hidden
>
    <div class="fullscreen-dialog__window fullscreen-dialog__window--slide">
        <div class="fullscreen-dialog__header">
            <button aria-label="Close dialog" class="icon-btn fullscreen-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="../icon.svg#icon-close"></use>
                </svg>
            </button>
            <h2 id="fullscreen-dialog-title">Fullscreen Dialog</h2>
        </div>
        <div class="fullscreen-dialog__main">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p><a href="http://www.ebay.com">www.ebay.com</a></p>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#fullscreen-dialog).

## JavaScript

```js
import FullscreenDialog from "makeup-fullscreen-dialog";

document.querySelectorAll(".fullscreen-dialog").forEach(function (el, i) {
    const widget = new FullscreenDialog(el, config);
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
