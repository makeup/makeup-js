"use strict";

import * as NavigationEmitter from "makeup-navigation-emitter";
import nextID from "makeup-next-id";

const defaultOptions = {
  activeDescendantClassName: "active-descendant",
  autoInit: "none",
  autoReset: "none",
  autoScroll: false,
  axis: "both",
  wrap: false,
};

function isElementInView(el) {
  const bounding = el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onModelInit(e) {
  const { items, toIndex } = e.detail;
  const itemEl = items[toIndex];

  if (itemEl) {
    itemEl.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute("aria-activedescendant", itemEl.id);
  }

  this._el.dispatchEvent(new CustomEvent("activeDescendantInit", { detail: e.detail }));
}

function onModelChange(e) {
  const { fromIndex, toIndex } = e.detail;
  const fromItem = this.items[fromIndex];
  const toItem = this.items[toIndex];

  if (fromItem) {
    fromItem.classList.remove(this._options.activeDescendantClassName);
  }

  if (toItem) {
    toItem.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute("aria-activedescendant", toItem.id);

    if (this._options.autoScroll && this._itemContainerEl && !isElementInView(toItem)) {
      toItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  this._el.dispatchEvent(new CustomEvent("activeDescendantChange", { detail: e.detail }));
}

function onModelReset(e) {
  const toIndex = e.detail.toIndex;
  const activeClassName = this._options.activeDescendantClassName;

  this.items.forEach(function (el) {
    el.classList.remove(activeClassName);
  });

  if (toIndex !== null && toIndex !== -1) {
    const itemEl = this.items[toIndex];
    itemEl.classList.add(activeClassName);
    this._focusEl.setAttribute("aria-activedescendant", itemEl.id);
  } else {
    this._focusEl.removeAttribute("aria-activedescendant");
  }

  this._el.dispatchEvent(new CustomEvent("activeDescendantReset", { detail: e.detail }));
}

function onModelMutation(e) {
  const { toIndex } = e.detail;
  const activeDescendantClassName = this._options.activeDescendantClassName;

  this.items.forEach(function (item, index) {
    nextID(item);
    if (index !== toIndex) {
      item.classList.remove(activeDescendantClassName);
    } else {
      item.classList.add(activeDescendantClassName);
    }
  });

  this._el.dispatchEvent(new CustomEvent("activeDescendantMutation", { detail: e.detail }));
}

class ActiveDescendant {
  constructor(el) {
    this._el = el;
    this._onMutationListener = onModelMutation.bind(this);
    this._onChangeListener = onModelChange.bind(this);
    this._onResetListener = onModelReset.bind(this);
    this._onInitListener = onModelInit.bind(this);

    this._el.addEventListener("navigationModelMutation", this._onMutationListener);
    this._el.addEventListener("navigationModelChange", this._onChangeListener);
    this._el.addEventListener("navigationModelReset", this._onResetListener);
    this._el.addEventListener("navigationModelInit", this._onInitListener);
  }

  destroy() {
    this._el.removeEventListener("navigationModelMutation", this._onMutationListener);
    this._el.removeEventListener("navigationModelChange", this._onChangeListener);
    this._el.removeEventListener("navigationModelReset", this._onResetListener);
    this._el.removeEventListener("navigationModelInit", this._onInitListener);
  }
}

class LinearActiveDescendant extends ActiveDescendant {
  constructor(el, focusEl, itemContainerEl, itemSelector, selectedOptions) {
    super(el);

    this._options = Object.assign({}, defaultOptions, selectedOptions);

    this._focusEl = focusEl;
    this._itemContainerEl = itemContainerEl;
    this._itemSelector = itemSelector;

    // ensure container has an id
    nextID(this._itemContainerEl);

    // if programmatic relationship set aria-owns
    if (this._itemContainerEl !== this._focusEl) {
      focusEl.setAttribute("aria-owns", this._itemContainerEl.id);
    }

    this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
      autoInit: this._options.autoInit,
      autoReset: this._options.autoReset,
      axis: this._options.axis,
      ignoreByDelegateSelector: this._options.ignoreByDelegateSelector,
      wrap: this._options.wrap,
    });

    // ensure each item has an id
    this.items.forEach(function (itemEl) {
      nextID(itemEl);
    });
  }

  get index() {
    return this._navigationEmitter.model.index;
  }

  set index(newIndex) {
    this._navigationEmitter.model.index = newIndex;
  }

  reset() {
    this._navigationEmitter.model.reset();
  }

  get currentItem() {
    return this._navigationEmitter.model.currentItem;
  }

  get items() {
    return this._navigationEmitter.model.items;
  }

  set wrap(newWrap) {
    this._navigationEmitter.model.options.wrap = newWrap;
  }

  destroy() {
    super.destroy();
    this._navigationEmitter.destroy();
  }
}

/*
class GridActiveDescendant extends ActiveDescendant {
    constructor(el, focusEl, containerEl, rowSelector, cellSelector) {
        super(el);
    }
}
*/

function createLinear(el, focusEl, itemContainerEl, itemSelector, selectedOptions) {
  return new LinearActiveDescendant(el, focusEl, itemContainerEl, itemSelector, selectedOptions);
}

export { createLinear };
