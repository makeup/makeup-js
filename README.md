# makeup-js

<a href="https://travis-ci.com/makeup/makeup-js.svg?branch=master"><img src="https://travis-ci.com/makeup/makeup-js.svg?branch=master" /></a> <a href='https://coveralls.io/github/makeup/makeup-js?branch=master'><img src='https://coveralls.io/repos/github/makeup/makeup-js/badge.svg?branch=master' alt='Coverage Status' /></a>

A suite of vanilla JavaScript modules for building accessible user interfaces.

All modules support import (i.e. ES Modules) and require (i.e. CommonJS) syntax. When using require on a default export, be sure to include `.default`. For example, `const Switch = require('makeup-switch').default;`.

## Core Modules

The following modules assist with common accessibility logic (e.g. maintaining a roving tabindex).

* [makeup-active-descendant](packages/makeup-active-descendant)
* [makeup-exit-emitter](packages/makeup-exit-emitter)
* [makeup-expander](packages/makeup-expander)
* [makeup-floating-label](packages/makeup-floating-label)
* [makeup-focusables](packages/makeup-focusables)
* [makeup-key-emitter](packages/makeup-key-emitter)
* [makeup-keyboard-trap](packages/makeup-keyboard-trap)
* [makeup-modal](packages/makeup-modal)
* [makeup-navigation-emitter](packages/makeup-navigation-emitter)
* [makeup-next-id](packages/makeup-next-id)
* [makeup-prevent-scroll-keys](packages/makeup-prevent-scroll-keys)
* [makeup-roving-tabindex](packages/makeup-roving-tabindex)
* [makeup-screenreader-trap](packages/makeup-screenreader-trap)
* [makeup-typeahead](packages/makeup-typeahead)

## UI Modules

The following modules create the model and behaviour for "headless" user interface components (i.e. they come with no styles or branding out of the box). They are fully compatible with [Skin CSS](https://github.com/eBay/skin).

We are currently in the process of converting all [eBay MIND Patterns](https://ebay.github.io/mindpatterns/index.html) "example quality" code to "reference level" vanilla JavaScript.

* [makeup-alert-dialog](packages/makeup-alert-dialog)
* [makeup-combobox](packages/makeup-combobox)
* [makeup-confirm-dialog](packages/makeup-confirm-dialog)
* [makeup-dialog](packages/makeup-dialog) (abstract class)
* [makeup-dialog-button](packages/makeup-dialog-button)
* [makeup-fullscreen-dialog](packages/makeup-fullscreen-dialog)
* [makeup-input-dialog](packages/makeup-input-dialog)
* [makeup-lightbox-dialog](packages/makeup-lightbox-dialog)
* [makeup-listbox](packages/makeup-listbox)
* [makeup-listbox-button](packages/makeup-listbox-button)
* [makeup-menu](packages/makeup-menu)
* [makeup-menu-button](packages/makeup-menu-button)
* [makeup-panel-dialog](packages/makeup-panel-dialog)
* [makeup-snackbar-dialog](packages/makeup-snackbar-dialog)
* [makeup-switch](packages/makeup-switch)
* [makeup-toast-dialog](packages/makeup-toast-dialog)
* More to come...
