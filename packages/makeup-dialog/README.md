# makeup-dialog

Abstract class representing the base behaviour for a modal or non-modal ARIA dialog.

## CSS

No CSS is provided.

## JavaScript

```js
import Dialog from "makeup-dialog";

// non-modal (default)
document.querySelectorAll(".my-non-modal-dialog").forEach(function (el, i) {
    const widget = new Dialog(el);
});

// modal
document.querySelectorAll(".my-modal-dialog").forEach(function (el, i) {
    const widget = new Dialog(el, { modal: true });
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
