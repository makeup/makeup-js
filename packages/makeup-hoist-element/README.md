# makeup-hoist-element

The makeup-hoist-element `hoist` function Takes an element in the DOM and hoists it as a direct child under the `document.body`.

The `unhoist` function puts the element back to its previous location. 

This helps with things like screenreader traps and accessibility. 

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Demo

See this in use with the makeup-modal demo.

```js 
const hoist = require('makeup-hoist-element')

// hoist element
hoist.hoist(document.querySelector('el'));

// unhoist element
hoist.unHoist();
```

## Install

```js
// via npm
npm install makeup-hoist-element

// via yarn
yarn add makeup-hoist-element
```

## Dependencies 

None! :D