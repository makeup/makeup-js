# makeup-panel-dialog

JavaScript class representing a [panel dialog](https://ebay.gitbook.io/mindpatterns/disclosure/panel-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-panel-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div
    class="panel-dialog panel-dialog--mask-fade-slow"
    id="dialog-panel"
    role="dialog"
    aria-labelledby="panel-dialog-title"
    aria-modal="true"
    hidden
>
    <div class="panel-dialog__window panel-dialog__window--slide">
        <div class="panel-dialog__header">
            <h2 id="panel-dialog-title">Heading</h2>
            <button aria-label="Close dialog" class="icon-btn panel-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="../icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="panel-dialog__main">
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

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#panel-dialog).

## JavaScript

```js
import PanelDialog from "makeup-panel-dialog";

document.querySelectorAll(".panel-dialog").forEach(function (el, i) {
    const widget = new PanelDialog(el, config);
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-dialog-open

Fired when dialog is opened.

### makeup-dialog-close

Fired when dialog is closed.
