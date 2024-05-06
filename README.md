# makeup-js

<a href="https://travis-ci.com/makeup/makeup-js.svg?branch=master"><img src="https://travis-ci.com/makeup/makeup-js.svg?branch=master" /></a> <a href='https://coveralls.io/github/makeup/makeup-js?branch=master'><img src='https://coveralls.io/repos/github/makeup/makeup-js/badge.svg?branch=master' alt='Coverage Status' /></a>

A suite of vanilla JavaScript modules for building accessible user interfaces.

All modules support import (i.e. ES Modules) and require (i.e. CommonJS) syntax. When using require on a default export, be sure to include `.default`. For example, `const Switch = require('makeup-switch').default;`.

## Core Modules

The following modules assist with common accessibility logic (e.g. maintaining a roving tabindex).

- [makeup-active-descendant](packages/core/makeup-active-descendant)
- [makeup-exit-emitter](packages/core/makeup-exit-emitter)
- [makeup-expander](packages/core/makeup-expander)
- [makeup-focusables](packages/core/makeup-focusables)
- [makeup-key-emitter](packages/core/makeup-key-emitter)
- [makeup-keyboard-trap](packages/core/makeup-keyboard-trap)
- [makeup-modal](packages/core/makeup-modal)
- [makeup-navigation-emitter](packages/core/makeup-navigation-emitter)
- [makeup-next-id](packages/core/makeup-next-id)
- [makeup-prevent-scroll-keys](packages/core/makeup-prevent-scroll-keys)
- [makeup-roving-tabindex](packages/core/makeup-roving-tabindex)
- [makeup-screenreader-trap](packages/core/makeup-screenreader-trap)
- [makeup-typeahead](packages/core/makeup-typeahead)

## UI Modules

The following modules create the model and behaviour for "headless" user interface components (i.e. they come with no styles or branding out of the box). They are fully compatible with [Skin CSS](https://github.com/eBay/skin).

We are currently in the process of converting all [eBay MIND Patterns](https://ebay.github.io/mindpatterns/index.html) "example quality" code to "reference level" vanilla JavaScript.

- [makeup-alert-dialog](packages/ui/makeup-alert-dialog)
- [makeup-combobox](packages/ui/makeup-combobox)
- [makeup-confirm-dialog](packages/ui/makeup-confirm-dialog)
- [makeup-dialog](packages/ui/makeup-dialog) (abstract class)
- [makeup-dialog-button](packages/ui/makeup-dialog-button)
- [makeup-floating-label](packages/ui/makeup-floating-label)
- [makeup-fullscreen-dialog](packages/ui/makeup-fullscreen-dialog)
- [makeup-input-dialog](packages/ui/makeup-input-dialog)
- [makeup-lightbox-dialog](packages/ui/makeup-lightbox-dialog)
- [makeup-listbox](packages/ui/makeup-listbox)
- [makeup-listbox-button](packages/ui/makeup-listbox-button)
- [makeup-menu](packages/ui/makeup-menu)
- [makeup-menu-button](packages/ui/makeup-menu-button)
- [makeup-panel-dialog](packages/ui/makeup-panel-dialog)
- [makeup-snackbar-dialog](packages/ui/makeup-snackbar-dialog)
- [makeup-switch](packages/ui/makeup-switch)
- [makeup-toast-dialog](packages/ui/makeup-toast-dialog)
