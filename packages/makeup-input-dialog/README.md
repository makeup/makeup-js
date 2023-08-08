# makeup-input-dialog

JavaScript class representing an [input dialog](https://ebay.gitbook.io/mindpatterns/messaging/input-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-input-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div class="lightbox-dialog lightbox-dialog--input lightbox-dialog--mask-fade" id="dialog-input" role="dialog" aria-labelledby="input-dialog-title" aria-modal="true" hidden>
    <div class="lightbox-dialog__window lightbox-dialog__window--fade">
        <div class="lightbox-dialog__header">
            <h2 class="lightbox-dialog__title" id="input-dialog-title">Enter Your Bid</h2>
        </div>
        <form action="index.html" method="get">
            <div class="lightbox-dialog__main">
                <p>
                    <label>Bid Amount:<label>
                    <input autofocus class="lightbox-dialog__input" type="text" name="bid" />
                </p>
            </div>
            <div class="lightbox-dialog__footer">
                <button class="button lightbox-dialog__cancel" type="button">Cancel</button>
                <button class="button lightbox-dialog__submit" type="submit">Submit</button>
            </div>
        </form>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#input-dialog).

## JavaScript

```js
import InputDialog from "makeup-input-dialog";

document.querySelectorAll(".input-dialog").forEach(function (el, i) {
  const widget = new InputDialog(el, config);
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

### makeup-dialog-submit

Fired when the input dialog is submitted.

### makeup-dialog-cancel

Fired when the input dialog is cancelled.
