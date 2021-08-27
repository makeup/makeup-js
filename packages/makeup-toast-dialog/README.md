# makeup-toast-dialog

JavaScript class representing a [toast dialog](https://ebay.gitbook.io/mindpatterns/messaging/toast-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-toast-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<aside id="dialog-toast" class="toast-dialog toast-dialog--transition" role="dialog" aria-label="Notification" aria-live="polite" aria-modal="false" hidden>
    <div class="toast-dialog__window">
        <div class="toast-dialog__header">
            <h2 class="toast-dialog__title">User Privacy Preferences</h2>
            <button class="icon-btn toast-dialog__close" type="button" aria-label="Close notification dialog">
                <svg class="icon icon--close" focusable="false" height="24" width="24">
                    <use xlink:href="../icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="toast-dialog__main">
            <p>We detected something unusual about a recent sign-in to your eBay account. To help keep you safe, we recommend you change the password.</p>
        </div>
        <div class="toast-dialog__footer">
            <button accesskey="v" class="btn btn--primary toast-dialog__cta">View Account</button>
        </div>
    </div>
</aside>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#toast-dialog).

## JavaScript

```js
const ToastDialog = require('makeup-toast-dialog');

document.querySelectorAll('.toast-dialog').forEach(function(el, i) {
    const widget = new ToastDialog(el, config);
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
