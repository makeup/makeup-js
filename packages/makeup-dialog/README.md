# makeup-dialog

A collection of JavaScript classes representing various forms of an ARIA [dialog](https://ebay.github.io/mindpatterns/disclosure/dialog/index.html). No CSS provided.

The dialog class is consumed by the following modules: [dialog-button](../makeup-dialog-button).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

### Lightbox

```html
<div class="lightbox-dialog" role="dialog" aria-labelledby="dialog-title" aria-modal="true">
    <div class="lightbox-dialog__window">
        <div class="lightbox-dialog__header">
            <h2 id="dialog-title">
                <!-- dialog title -->
            </h2>
            <button aria-label="Close dialog" class="icon-btn lightbox-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="lightbox-dialog__main">
            <!-- dialog content -->
        </div>
    </div>
</div>
```

### Alert

```html
<div class="lightbox-dialog lightbox-dialog--alert lightbox-dialog--mask-fade" role="alertdialog" aria-labelledby="dialog-title" aria-modal="true">
    <div class="lightbox-dialog__compact-window lightbox-dialog__compact-window--fade">
        <div class="lightbox-dialog__header">
            <h2 id="dialog-title">
                <!-- dialog title -->
            </h2>
        </div>
        <div class="lightbox-dialog__main">
            <!-- dialog content -->
        </div>
        <div class="lightbox-dialog__footer">
            <button class="btn btn--primary lightbox-dialog__acknowledge" aria-describedby="alert-description">OK</button>
        </div>
    </div>
</div>
```

### Confirm

```html
<div class="lightbox-dialog lightbox-dialog--confirm lightbox-dialog--mask-fade" role="dialog" aria-labelledby="dialog-confirm-title" aria-modal="true">
    <div class="lightbox-dialog__compact-window lightbox-dialog__compact-window--fade">
        <div class="lightbox-dialog__header">
            <h2 id="dialog-confirm-title">
                <!-- dialog title -->
            </h2>
        </div>
        <div class="lightbox-dialog__main">
            <!-- dialog content -->
        </div>
        <div class="lightbox-dialog__footer">
            <button class="btn lightbox-dialog__reject">No</button>
            <button class="btn btn--primary lightbox-dialog__confirm" aria-describedby="dialog-description-0">Yes</button>
        </div>
    </div>
</div>
```

### Panel

```html
<div class="panel-dialog panel-dialog--mask-fade-slow" role="dialog" aria-labelledby="dialog-title" aria-modal="true">
    <div class="panel-dialog__window panel-dialog__window--slide">
        <div class="panel-dialog__header">
            <h2 id="dialog-title">
                <!-- dialog title -->
            </h2>
            <button aria-label="Close dialog" class="icon-btn panel-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="panel-dialog__main">
            <!-- dialog content -->
        </div>
    </div>
</div>
```

### Toast

```html
<aside class="toast-dialog toast-dialog--transition" role="dialog" aria-label="Notification" aria-live="polite" aria-modal="false">
    <div class="toast-dialog__window">
        <div class="toast-dialog__header">
            <h2 class="toast-dialog__title">
                <!-- dialog title -->
            </h2>
            <button class="icon-btn toast-dialog__close" type="button" aria-label="Close notification dialog">
                <svg class="icon icon--close" focusable="false" height="24" width="24">
                    <use xlink:href="../style/icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="toast-dialog__main">
            <!-- dialog content -->
        </div>
        <div class="toast-dialog__footer">
            <button accesskey="a" class="btn btn--primary toast-dialog__cta">Action</button>
        </div>
    </div>
</aside>
```

### Snackbar

```html
<aside class="snackbar-dialog snackbar-dialog--transition" role="dialog" aria-label="Notification" aria-live="polite" aria-modal="false">
    <div class="snackbar-dialog__window">
        <div class="snackbar-dialog__main">
            <!-- dialog content -->
        </div>
        <div class="snackbar-dialog__actions">
            <button accesskey="u" class="fake-link snackbar-dialog__cta">Action<span class="clipped"> - Access Key: A</span></button>
        </div>
    </div>
</aside>
```

### Drawer

```html
<div class="drawer-dialog drawer-dialog--mask-fade-slow" id="drawer-dialog" role="dialog" aria-labelledby="drawer-dialog-title" aria-modal="true">
    <div class="drawer-dialog__window drawer-dialog__window--slide">
        <button class="drawer-dialog__handle" type="button"></button>
        <div class="drawer-dialog__header">
            <h2 id="drawer-dialog-title">Heading</h2>
            <button aria-label="Close dialog" class="icon-btn drawer-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="drawer-dialog__main">
            <!-- dialog content -->
        </div>
    </div>
</div>
```

### Fullscreen

```html
<div class="fullscreen-dialog fullscreen-dialog--mask-fade" id="dialog-fullscreen" role="dialog" aria-labelledby="fullscreen-dialog-title" aria-modal="true">
    <div class="fullscreen-dialog__window fullscreen-dialog__window--fade">
        <div class="fullscreen-dialog__header">
            <button aria-label="Close dialog" class="icon-btn fullscreen-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="icon.svg#icon-close"></use>
                </svg>
            </button>
            <h2 id="fullscreen-dialog-title">Fullscreen Dialog</h2>
        </div>
        <div class="fullscreen-dialog__main">
            <!-- dialog content -->
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#dialog).

## JavaScript

```js
const Lightbox = require('makeup-dialog').Lightbox;

document.querySelectorAll('.lightbox-dialog').forEach(function(el, i) {
    const widget = new Lightbox(el, config);
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

### makeup-dialog-acknowledge

Fired when the alert dialog is acknowledged.

### makeup-dialog-confirm

Fired when the confirm dialog is confirmed.

### makeup-dialog-reject

Fired when the confirm dialog is rejected.

### makeup-dialog-done

Fired when the sort dialog is done.

### makeup-dialog-reset

Fired when the filter dialog is reset.

### makeup-dialog-cta

Fired when the snackbar or toast cta is clicked.
