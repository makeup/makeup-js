# makeup-alert-dialog

JavaScript class representing an [alert dialog](https://ebay.gitbook.io/mindpatterns/messaging/alert-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-alert-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div
  class="alert-dialog alert-dialog--mask-fade"
  role="alertdialog"
  aria-labelledby="alert-dialog-title"
  aria-modal="true"
>
  <div class="alert-dialog__window alert-dialog__window--fade">
    <div class="alert-dialog__header">
      <h2 id="alert-dialog-title">
        <!-- dialog title -->
      </h2>
    </div>
    <div class="alert-dialog__main">
      <p id="alert-dialog-description">Dialog description</p>
    </div>
    <div class="alert-dialog__footer">
      <button class="btn btn--primary alert-dialog__acknowledge" aria-describedby="alert-dialog-description">
        Yes
      </button>
    </div>
  </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#alert-dialog).

## JavaScript

```js
import AlertDialog from "makeup-alert-dialog";

document.querySelectorAll(".alert-dialog").forEach(function (el, i) {
  const widget = new AlertDialog(el, config);
});
```

## Config

The constructor takes a configuration object as its second parameter.

todo

## Events

### makeup-dialog-open

Fired when the alert dialog is opened.

### makeup-dialog-close

Fired when the alert dialog is closed.

### makeup-dialog-acknowledge

Fired when the alert dialog is acknowledged.
