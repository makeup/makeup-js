# makeup-drawer-dialog

JavaScript class representing a [drawer dialog](https://ebay.gitbook.io/mindpatterns/disclosure/drawer-dialog). No CSS provided.

[View Demo](https://makeup.github.io/makeup-js/makeup-drawer-dialog/index.html).

## HTML

The following markup structure and classnames are required. Any SVG icons can be used.

```html
<div class="drawer-dialog drawer-dialog--mask-fade-slow" id="drawer-dialog" role="dialog" aria-labelledby="drawer-dialog-title" aria-modal="true" hidden>
    <div class="drawer-dialog__window drawer-dialog__window--slide">
        <button class="drawer-dialog__handle" type="button"></button>
        <div class="drawer-dialog__header">
            <h2 id="drawer-dialog-title">Heading</h2>
            <button aria-label="Close dialog" class="icon-btn drawer-dialog__close" type="button">
                <svg aria-hidden="true" class="icon icon--close" focusable="false" height="16" width="16">
                    <use xlink:href="../icon.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="drawer-dialog__main">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p><a href="http://www.ebay.com">www.ebay.com</a></p>
        </div>
    </div>
</div>
```

## CSS

No CSS is provided. However, the class is fully compatible with [eBay Skin](https://ebay.github.io/skin/#drawer-dialog).

## JavaScript

```js
import DrawerDialog from 'makeup-drawer-dialog';

document.querySelectorAll('.drawer-dialog').forEach(function(el, i) {
    const widget = new DrawerDialog(el, config);
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
