import * as KeyEmitter from "makeup-key-emitter";
import * as ExitEmitter from "makeup-exit-emitter";

const defaultOptions = {
  axis: "both",
  autoInit: "interactive",
  autoReset: "current",
  ignoreByDelegateSelector: null,
  wrap: false,
};

function isItemNavigable(el) {
  return !el.hidden && el.getAttribute("aria-disabled") !== "true";
}

function isIndexNavigable(items, index) {
  return index >= 0 && index < items.length ? isItemNavigable(items[index]) : false;
}

function findNavigableItems(items) {
  return items.filter(isItemNavigable);
}

function findFirstNavigableIndex(items) {
  return items.findIndex((item) => isItemNavigable(item));
}

function findLastNavigableIndex(items) {
  // todo: at(-1) is more performant than reverse(), but Babel is not transpiling it
  return items.indexOf(findNavigableItems(items).reverse()[0]);
}

function findIndexByAttribute(items, attribute, value) {
  return items.findIndex((item) => isItemNavigable(item) && item.getAttribute(attribute) === value);
}

function findFirstNavigableAriaCheckedIndex(items) {
  return findIndexByAttribute(items, "aria-checked", "true");
}

function findFirstNavigableAriaSelectedIndex(items) {
  return findIndexByAttribute(items, "aria-selected", "true");
}

function findIgnoredByDelegateItems(el, options) {
  return options.ignoreByDelegateSelector !== null ? [...el.querySelectorAll(options.ignoreByDelegateSelector)] : [];
}

function findPreviousNavigableIndex(items, index, wrap) {
  let previousNavigableIndex = -1;
  if (index === null || atStart(items, index)) {
    if (wrap === true) {
      previousNavigableIndex = findLastNavigableIndex(items);
    }
  } else {
    let i = index;

    while (--i >= 0) {
      if (isItemNavigable(items[i])) {
        previousNavigableIndex = i;
        break;
      }
    }
  }

  return previousNavigableIndex;
}

function findNextNavigableIndex(items, index, wrap) {
  let nextNavigableIndex = -1;

  if (index === null) {
    nextNavigableIndex = findFirstNavigableIndex(items);
  } else if (atEnd(items, index)) {
    if (wrap === true) {
      nextNavigableIndex = findFirstNavigableIndex(items);
    }
  } else {
    let i = index;

    while (++i < items.length) {
      if (isItemNavigable(items[i])) {
        nextNavigableIndex = i;
        break;
      }
    }
  }

  return nextNavigableIndex;
}

// returning -1 means not found
function findIndexPositionByType(typeOrNum, items, currentIndex) {
  let index = -1; // eslint-disable-line no-useless-assignment

  switch (typeOrNum) {
    case "none":
      index = null;
      break;
    case "current":
      index = currentIndex;
      break;
    case "interactive":
      index = findFirstNavigableIndex(items);
      break;
    case "ariaChecked":
      index = findFirstNavigableAriaCheckedIndex(items);
      break;
    case "ariaSelected":
      index = findFirstNavigableAriaSelectedIndex(items);
      break;
    case "ariaSelectedOrInteractive":
      index = findFirstNavigableAriaSelectedIndex(items);
      index = index === -1 ? findFirstNavigableIndex(items) : index;
      break;
    default:
      index = typeof typeOrNum === "number" || typeOrNum === null ? typeOrNum : -1;
  }

  return index;
}

function atStart(items, index) {
  return index === findFirstNavigableIndex(items);
}

function atEnd(items, index) {
  return index === findLastNavigableIndex(items);
}

function onKeyPrev(e) {
  const ignoredByDelegateItems = findIgnoredByDelegateItems(this._el, this.options);

  // todo: update KeyEmitter to deal with ignored items?
  if (ignoredByDelegateItems.length === 0 || !ignoredByDelegateItems.includes(e.detail.target)) {
    this.index = findPreviousNavigableIndex(this.items, this.index, this.options.wrap);
  }
}

function onKeyNext(e) {
  const ignoredByDelegateItems = findIgnoredByDelegateItems(this._el, this.options);

  // todo: update KeyEmitter to deal with ignored items?
  if (ignoredByDelegateItems.length === 0 || !ignoredByDelegateItems.includes(e.detail.target)) {
    this.index = findNextNavigableIndex(this.items, this.index, this.options.wrap);
  }
}

function onClick(e) {
  const itemIndex = this.indexOf(e.target.closest(this._itemSelector));

  if (isIndexNavigable(this.items, itemIndex)) {
    this.index = itemIndex;
  }
}

function onKeyHome(e) {
  const ignoredByDelegateItems = findIgnoredByDelegateItems(this._el, this.options);

  // todo: update KeyEmitter to deal with ignored items?
  if (ignoredByDelegateItems.length === 0 || !ignoredByDelegateItems.includes(e.detail.target)) {
    this.index = findFirstNavigableIndex(this.items);
  }
}

function onKeyEnd(e) {
  const ignoredByDelegateItems = findIgnoredByDelegateItems(this._el, this.options);

  // todo: update KeyEmitter to deal with ignored items?
  if (ignoredByDelegateItems.length === 0 || !ignoredByDelegateItems.includes(e.detail.target)) {
    this.index = findLastNavigableIndex(this.items);
  }
}

function onFocusExit() {
  if (this.options.autoReset !== null) {
    this.reset();
  }
}

function onMutation(e) {
  const fromIndex = this.index;
  let toIndex = this.index;
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
  const { addedNodes, attributeName, removedNodes, target, type } = e[0];

  if (type === "attributes") {
    if (target === this.currentItem) {
      if (attributeName === "aria-disabled") {
        // current item was disabled - keep it as current index (until a keyboard navigation happens)
        toIndex = this.index;
      } else if (attributeName === "hidden") {
        // current item was hidden and focus is lost - reset index to first interactive element
        toIndex = findFirstNavigableIndex(this.items);
      }
    } else {
      toIndex = this.index;
    }
  } else if (type === "childList") {
    if (removedNodes.length > 0 && [...removedNodes].includes(this._cachedElement)) {
      // current item was removed and focus is lost - reset index to first interactive element
      toIndex = findFirstNavigableIndex(this.items);
    } else if (removedNodes.length > 0 || addedNodes.length > 0) {
      // nodes were added and/or removed - keep current item and resync its index
      toIndex = this.indexOf(this._cachedElement);
    }
  }

  this._index = toIndex;

  this._el.dispatchEvent(
    new CustomEvent("navigationModelMutation", {
      bubbles: false,
      detail: { fromIndex, toIndex },
    }),
  );
}

class NavigationModel {
  /**
   * @param {HTMLElement} el
   * @param {string} itemSelector
   * @param {typeof defaultOptions} selectedOptions
   */
  constructor(el, itemSelector, selectedOptions) {
    /** @member {typeof defaultOptions} */
    this.options = Object.assign({}, defaultOptions, selectedOptions);

    /** @member {HTMLElement} */
    this._el = el;

    /** @member {string} */
    this._itemSelector = itemSelector;
  }
}

class LinearNavigationModel extends NavigationModel {
  /**
   * @param {HTMLElement} el
   * @param {string} itemSelector
   * @param {typeof defaultOptions} selectedOptions
   */
  constructor(el, itemSelector, selectedOptions) {
    super(el, itemSelector, selectedOptions);

    const fromIndex = this._index;
    const toIndex = findIndexPositionByType(this.options.autoInit, this.items, this.index);

    // do not use setter as it will trigger a change event
    this._index = toIndex;

    // always keep an element reference to the last item (for use in mutation observer)
    // todo: convert index to Tuple to store last/current values instead?
    this._cachedElement = this.items[toIndex];

    this._el.dispatchEvent(
      new CustomEvent("navigationModelInit", {
        bubbles: false,
        detail: {
          firstInteractiveIndex: this.firstNavigableIndex,
          fromIndex,
          items: this.items,
          toIndex,
        },
      }),
    );
  }

  get currentItem() {
    return this.items[this.index];
  }

  // todo: code smell as getter abstracts that the query selector re-runs every time getter is accessed
  get items() {
    return [...this._el.querySelectorAll(`${this._itemSelector}`)];
  }

  get index() {
    return this._index;
  }

  /**
   * @param {number} toIndex - update index position in this.items (non-interactive indexes fail silently)
   */
  set index(toIndex) {
    if (toIndex === this.index) {
      return;
    } else if (!isIndexNavigable(this.items, toIndex)) {
      // no-op. throw exception?
    } else {
      const fromIndex = this.index;
      // update cached element reference (for use in mutation observer if DOM node gets removed)
      this._cachedElement = this.items[toIndex];
      this._index = toIndex;

      this._el.dispatchEvent(
        new CustomEvent("navigationModelChange", {
          bubbles: false,
          detail: { fromIndex, toIndex },
        }),
      );
    }
  }

  indexOf(element) {
    return this.items.indexOf(element);
  }

  reset() {
    const fromIndex = this.index;
    const toIndex = findIndexPositionByType(this.options.autoReset, this.items, this.index);

    if (toIndex !== fromIndex) {
      // do not use setter as it will trigger a navigationModelChange event
      this._index = toIndex;

      this._el.dispatchEvent(
        new CustomEvent("navigationModelReset", {
          bubbles: false,
          detail: { fromIndex, toIndex },
        }),
      );
    }
  }
}

// 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/

class NavigationEmitter {
  /**
   * @param {HTMLElement} el
   * @param {LinearNavigationModel} model
   */
  constructor(el, model) {
    this.model = model;
    this.el = el;

    this._keyPrevListener = onKeyPrev.bind(model);
    this._keyNextListener = onKeyNext.bind(model);
    this._keyHomeListener = onKeyHome.bind(model);
    this._keyEndListener = onKeyEnd.bind(model);
    this._clickListener = onClick.bind(model);
    this._focusExitListener = onFocusExit.bind(model);
    this._observer = new MutationObserver(onMutation.bind(model));

    KeyEmitter.addKeyDown(this.el);
    ExitEmitter.addFocusExit(this.el);

    const axis = model.options.axis;

    if (axis === "both" || axis === "x") {
      this.el.addEventListener("arrowLeftKeyDown", this._keyPrevListener);
      this.el.addEventListener("arrowRightKeyDown", this._keyNextListener);
    }
    if (axis === "both" || axis === "y") {
      this.el.addEventListener("arrowUpKeyDown", this._keyPrevListener);
      this.el.addEventListener("arrowDownKeyDown", this._keyNextListener);
    }
    this.el.addEventListener("homeKeyDown", this._keyHomeListener);
    this.el.addEventListener("endKeyDown", this._keyEndListener);
    this.el.addEventListener("click", this._clickListener);
    this.el.addEventListener("focusExit", this._focusExitListener);

    this._observer.observe(this.el, {
      childList: true,
      subtree: true,
      attributeFilter: ["aria-disabled", "hidden"],
      attributes: true,
      attributeOldValue: true,
    });
  }

  destroy() {
    KeyEmitter.removeKeyDown(this.el);
    ExitEmitter.removeFocusExit(this.el);

    this.el.removeEventListener("arrowLeftKeyDown", this._keyPrevListener);
    this.el.removeEventListener("arrowRightKeyDown", this._keyNextListener);
    this.el.removeEventListener("arrowUpKeyDown", this._keyPrevListener);
    this.el.removeEventListener("arrowDownKeyDown", this._keyNextListener);
    this.el.removeEventListener("homeKeyDown", this._keyHomeListener);
    this.el.removeEventListener("endKeyDown", this._keyEndListener);
    this.el.removeEventListener("click", this._clickListener);
    this.el.removeEventListener("focusExit", this._focusExitListener);

    this._observer.disconnect();
  }
}

function createLinear(el, itemSelector, selectedOptions) {
  const model = new LinearNavigationModel(el, itemSelector, selectedOptions);

  return new NavigationEmitter(el, model);
}

/*
static createGrid(el, rowSelector, colSelector, selectedOptions) {
    return null;
}
*/

export { createLinear };
