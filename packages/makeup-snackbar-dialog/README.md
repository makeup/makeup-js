# makeup-snackbar-dialog

JavaScript class representing a [snackbar dialog](https://ebay.gitbook.io/mindpatterns/messaging/snackbar-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-snackbar-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<aside
  class="snackbar-dialog snackbar-dialog--transition"
  role="dialog"
  aria-label="Notification"
  aria-live="polite"
  aria-modal="false"
  hidden
>
  <div class="snackbar-dialog__window">
    <div class="snackbar-dialog__main">
      <p>1 item deleted from watch list.</p>
    </div>
    <div class="snackbar-dialog__actions">
      <button accesskey="u" class="fake-link snackbar-dialog__cta">
        Undo<span class="clipped"> - Access Key: U</span>
      </button>
    </div>
  </div>
</aside>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#snackbar-dialog).

## JavaScript

```js
import SnackbarDialog from "makeup-snackbar-dialog";

document.querySelectorAll(".snackbar-dialog").forEach(function (el, i) {
  const widget = new SnackbarDialog(el, config);
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
