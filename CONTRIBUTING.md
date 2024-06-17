# Contributing Guide

## Pull Requests

Before writing any code, please submit a new issue to GitHub. Or, if you want to work on an existing issue, please request to do so on the relevant ticket. We strongly advise you to only begin working on issues that are assigned specifically to you, otherwise your work may end up being in vain.

Here is a rough overview of steps required when contributing code:

- GitHub team members must create a new branch in this repo. Non-team members can create their own fork.
- Add or update the corresponding README files
- Add or update the corresponding docs files
- Add or update the corresponding unit tests
- After making your local changes, ensure that:
  - `npm test` runs without errors
  - `npm start` runs without introducing new ESlint warnings or errors
- Squash any non-atomic local commits (e.g. any "work in progress" type commits) before pushing up your PR

## Getting started for local development

1. Clone the repo: `git clone git@github.com:makeup/makeup-js.git`
2. Change into the project directory: `cd makeup-js`
3. Run `npm i`
4. Run `npm start` to start the development server

This should perform a full build and launch your default browser and navigate to http://localhost:3000/, pointing to the
documentation root. Any changes you make to the source files should trigger a rebuild and refresh the browser.

## Project Organisation

The project is a mono-repo organised into 3 distinct groups of packages, in the following hierarchy:

1. Core Modules
2. UI Modules
3. Custom Elements (a.k.a. Web Components) - coming soon

UI inherits from Core, and Custom Elements inherit from UI.

A top level `/docs` folder contains the src files for the static website (served via GitHub Pages).

### Compilation & Bundling

Babel is used to compile all src files under `/packages` and `/docs`. For packages, src files are compiled as both commonjs and esm under the `/dist` subdirectory. For docs, the compiled output file is called `index.compiled.js`.

For documentation only, Webpack is used to bundle and minify all compiled files. For core modules, webpack outputs `index.min.js` and `index.min.map` files. For UI modules, webpack outputs additional `index.css` and `index.css.map` files (this CSS is extracted from the imports found in `index.js`).

### Code Formatting

We use Prettier with all out of the box defaults except one override for printWidth (we find the default of 80 too small).

### Code Linting

We use ESLint with most out of the box defaults (we will be reviewing the existing overrides soon to see if they are still necessary).

### Commit Message Format

We use [commitlint conventional configuration](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) format for commit messages.

## Publishing

This repo uses [Lerna](https://lerna.js.org) to manage the [versioning](https://github.com/lerna/lerna/tree/main/libs/commands/version/README.md) and [publishing](https://github.com/lerna/lerna/blob/main/libs/commands/publish/README.md) of all packages.

If you need to publish new patch versions of all modules that have changed since the last publish (e.g. after regenerating all modules with a newer version of Babel), run `lerna version patch --no-push --no-commit-hooks`. This creates a local "Publish" commit, containing all of the updated `package.json` and `package.json.lock` files.

If things look good, run `lerna publish from-git`. All packages identified in the commit will be published to NPM.

Don't forget to push your local commit up to the git remote!

## Core Modules Style Guide

(TODO)

## UI Modules Style Guide

This section walks through the [makeup-switch source code](packages/makeup-switch/src/index.js). Use it as a reference when creating a new class-based UI module.

### Default Options

Every class will have a `defaultOptions` object.

```js
const defaultOptions = {
  bem: {
    control: "switch__control",
  },
  customElementMode: false,
};
```

- `bem`: If using different class names than [Skin](https://github.com/eBay/skin), you can specify the main hooks here.
- `customElementMode`: Set this to `true` if using this as the model for the [makeup-web-component](https://github.com/makeup/makeup-web-components).

Plus whatever options are relevant to that user interface module.

### Constructor

Every class will have a constructor, for example:

```js
constructor(el, selectedOptions) {
    this.options = Object.assign({}, defaultOptions, selectedOptions);

    this.el = el;

    this._onClickListener = this._onClick.bind(this);
    this._onKeyDownListener = this._onKeyDown.bind(this);
    this._onMutationListener = this._onMutation.bind(this);

    if (!this.options.customElementMode) {
        this._mutationObserver = new MutationObserver(this._onMutationListener);
        this._observeMutations();
        this._observeEvents();
    }
}
```

First we always merge any given options with the default options and set the element reference.

Next we cache any event listener references and bind/scope the handlers to the class instance.

Next, if **not** being used as the model for a web component, we must initialise our mutation observer and event observers. A web component would initialise the event observers (via `_observeEvents()`) during its `connectedCallback()` routine.

### Mutation Observer

Our mutation observer is essentially going to mimic the `attributeChangedCallback()` life cycle method of a web component. This is a handy way of letting any observers know when important properties of the class have changed.

```js
_observeMutations() {
    if (!this.options.customElementMode) {
        this._mutationObserver.observe(this._focusableElement, {
            attributes: true,
            childList: false,
            subtree: false
        });
    }
}

_unobserveMutations() {
    if (!this.options.customElementMode) {
        this._mutationObserver.disconnect();
    }
}
```

### Mutation Handler

The mutation handler creates an abstraction around the mutation, dispatching a custom event with the detail of the changed attribute(s).

```js
_onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this.el.dispatchEvent(new CustomEvent('makeup-switch-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}
```

### Event Listeners

This section is the setup and tear down for our event listeners (i.e. any interesting device interactions on the ui element itself - click, focus, keydown, etc).

```js
_observeEvents() {
    this._focusableElement.addEventListener('click', this._onClickListener);
    this._focusableElement.addEventListener('keydown', this._onKeyDownListener);
}

_unobserveEvents() {
    this._focusableElement.removeEventListener('click', this._onClickListener);
    this._focusableElement.removeEventListener('keydown', this._onKeyDownListener);
}
```

### Event Handlers

Use private methods (remember, they should be bound/scoped to the class instance) for event handler routines.

```js
_onKeyDown(e) {
    switch (e.keyCode) {
        case 32:
            e.preventDefault();
            this.toggle();
            break;
        case 37:
            this.checked = false;
            break;
        case 39:
            this.checked = true;
            break;
        default:
            break;
    }
}

_onClick() {
    if (!this.disabled) {
        this.toggle();
    }
}
```

### Getters & Setters

Every class will expose its property API via getters and setters.

In order to prevent an issue with any web component that might be using this class, we must unobserve all mutations during any transaction that changes state (i.e. setters).

```js
get _focusableElement() {
    return this.el.querySelector(`.${this.options.bem.control}`);
}

set checked(isChecked) {
    this._unobserveMutations();
    this._focusableElement.setAttribute('aria-checked', isChecked.toString());
    this.el.dispatchEvent(new CustomEvent('makeup-switch-toggle', {
        composed: true,
        detail: {
            on: this.checked
        }
    }));
    this._observeMutations();
}

get checked() {
    return this._focusableElement.getAttribute('aria-checked') === 'true';
}

set disabled(isDisabled) {
    this._unobserveMutations();
    this._focusableElement.setAttribute('aria-disabled', isDisabled.toString());
    this._focusableElement.setAttribute('tabindex', isDisabled ? '-1' : '0');
    this._observeMutations();
}

get disabled() {
    return this._focusableElement.getAttribute('aria-disabled') === 'true';
}

set labelledby(theId) {
    this._unobserveMutations();
    this._focusableElement.setAttribute('aria-labelledby', theId);

    // customElementMode a11y workaround
    // aria-labelledby cannot resolve element id references that live outside of the Shadow DOM
    // as a workaround we can use aria-label
    if (this.options.customElementMode) {
        const labellingEl = document.getElementById(this.labelledby);

        if (labellingEl && labellingEl.innerText !== '') {
            this.label = labellingEl.innerText;
        }
    }

    this._observeMutations();
}

get labelledby() {
    return this._focusableElement.getAttribute('aria-labelledby');
}

get label() {
    return this._focusableElement.getAttribute('aria-label');
}

set label(theLabel) {
    this._unobserveMutations();
    this._focusableElement.setAttribute('aria-label', theLabel);
    this._observeMutations();
}
```

### Methods

Any methods unique to the class go here.

```js
toggle() {
    this.checked = !(this.checked);
}
```

### Destroy

Finally, a destroy method allows the class and all of its references to be cleanly removed from memory.

```js
_destroy() {
    this._unobserveMutations();
    this._unobserveEvents();
    this._onClickListener = null;
    this._onKeyDownListener = null;
    this._onMutationListener = null;
}
```

## HTMLElements Style Guide

(TODO)
