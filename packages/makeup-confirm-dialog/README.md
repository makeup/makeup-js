# makeup-confirm-dialog

JavaScript class representing a [confirm dialog](https://ebay.gitbook.io/mindpatterns/messaging/confirm-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-confirm-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div class="confirm-dialog confirm-dialog--mask-fade" role="dialog" aria-labelledby="dialog-confirm-title" aria-modal="true">
    <div class="confirm-dialog__window lightbox-dialog__window--fade">
        <div class="confirm-dialog__header">
            <h2 id="dialog-confirm-title">
                <!-- dialog title -->
            </h2>
        </div>
        <div class="confirm-dialog__main">
            <p id="confirm-dialog-description">Dialog description</p>
        </div>
        <div class="confirm-dialog__footer">
            <button class="btn confirm-dialog__reject">No</button>
            <button class="btn btn--primary confirm-dialog__confirm" aria-describedby="confirm-dialog-description">Yes</button>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#confirm-dialog).

## JavaScript

```js
const ConfirmDialog = require('makeup-confirm-dialog');

document.querySelectorAll('.confirm-dialog').forEach(function(el, i) {
    const widget = new ConfirmDialog(el, config);
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-dialog-open

Fired when any dialog is opened.

### makeup-dialog-close

Fired when any dialog is closed.

### makeup-dialog-confirm

Fired when the confirm dialog is confirmed.

### makeup-dialog-reject

Fired when the confirm dialog is rejected.
