# makeup-next-id

Assigns the next id in sequence to an element, if an id property does not already exist. The id will consist of a configurable prefix (default: 'nid'), followed by three randomly generated chars, then a number in sequence. For example: `nid-sdv-1`, `nid-sdv-2`, `nid-sdv-3`, etc. If you need a <em>known</em> id, ahead of time, please use a different approach!

A vanilla JavaScript port of <a href="https://github.com/ianmcburnie/jquery-next-id">jquery-next-id</a>.

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-next-id

// via yarn
yarn add makeup-next-id
```

## Example

```js
// require the module
const nextId = require('makeup-next-id');

// get NodeList
const widgets = document.querySelectorAll('.widget');

// assign next id to each element
widgets.forEach(function(el) {
    nextId(el);
});
```

Markup before:

```html
<div class="widget"></div>
<div class="widget"></div>
<div class="widget"></div>
```

Markup after:

```html
<div class="widget" id="nid-tCa-1"></div>
<div class="widget" id="nid-tCa-2"></div>
<div class="widget" id="nid-tCa-3"></div>
```

## Custom Events        

* None

## Dependencies

* [nanoid](https://www.npmjs.com/package/nanoid)

## Polyfills

* None
