import * as KeyEmitter from "makeup-key-emitter";
import * as ExitEmitter from "makeup-exit-emitter";
const dataSetKey = "data-makeup-index";
const defaultOptions = {
  axis: "both",
  autoInit: 0,
  autoReset: null,
  ignoreButtons: false,
  wrap: false,
  ignoreByAttrs: { hidden: true }
};
function clearData(els) {
  els.forEach((el) => el.removeAttribute(dataSetKey));
}
function setData(els) {
  els.forEach((el, index) => el.setAttribute(dataSetKey, index));
}
function isButton(el) {
  return el.tagName.toLowerCase() === "button" || el.type === "button";
}
function onKeyPrev(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    if (!this.atStart()) {
      this.index--;
    } else if (this.options.wrap) {
      this.index = this.filteredItems.length - 1;
    }
  }
}
function onKeyNext(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    if (!this.atEnd()) {
      this.index++;
    } else if (this.options.wrap) {
      this.index = 0;
    }
  }
}
function onClick(e) {
  let element = e.target;
  let indexData = element.dataset.makeupIndex;
  while (element !== this._el && !indexData) {
    element = element.parentNode;
    indexData = element.dataset.makeupIndex;
  }
  if (indexData !== void 0) {
    this.index = indexData;
  }
}
function onKeyHome(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    this.index = 0;
  }
}
function onKeyEnd(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    this.index = this.filteredItems.length;
  }
}
function onFocusExit() {
  if (this.options.autoReset !== null) {
    this.reset();
  }
}
function onMutation() {
  clearData(this.items);
  setData(this.filteredItems);
  if (this.index >= this.items.length) {
    this._index = this.options.autoReset || this.options.autoInit;
  }
  this._el.dispatchEvent(new CustomEvent("navigationModelMutation"));
}
class NavigationModel {
  constructor(el, itemSelector, selectedOptions) {
    this.options = Object.assign({}, defaultOptions, selectedOptions);
    this._el = el;
    this._itemSelector = itemSelector;
  }
}
class LinearNavigationModel extends NavigationModel {
  constructor(el, itemSelector, selectedOptions) {
    super(el, itemSelector, selectedOptions);
    if (this.options.autoInit !== null) {
      this._index = this.options.autoInit;
      this._el.dispatchEvent(new CustomEvent("navigationModelInit", {
        detail: {
          items: this.filteredItems,
          toIndex: this.options.autoInit
        },
        bubbles: false
      }));
    }
  }
  shouldIgnore(el) {
    return !Object.entries(this.options.ignoreByAttrs).some(([attr, value]) => el[typeof value === "boolean" ? "hasAttribute" : "getAttribute"](attr) === value);
  }
  get items() {
    return this._el.querySelectorAll(this._itemSelector);
  }
  get filteredItems() {
    return [...this.items].filter((el) => this.shouldIgnore(el));
  }
  get index() {
    return this._index;
  }
  set index(newIndex) {
    if (newIndex > -1 && newIndex < this.filteredItems.length && newIndex !== this.index) {
      this._el.dispatchEvent(new CustomEvent("navigationModelChange", {
        detail: {
          fromIndex: this.index,
          toIndex: newIndex
        },
        bubbles: false
      }));
      this._index = newIndex;
    }
  }
  reset() {
    if (this.options.autoReset !== null) {
      this._index = this.options.autoReset;
      this._el.dispatchEvent(new CustomEvent("navigationModelReset", {
        detail: {
          toIndex: this.options.autoReset
        },
        bubbles: false
      }));
    }
  }
  atEnd() {
    return this.index === this.filteredItems.length - 1;
  }
  atStart() {
    return this.index <= 0;
  }
}
class NavigationEmitter {
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
    setData(model.filteredItems);
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
      attributeFilter: Object.keys(model.options.ignoreByAttrs),
      attributes: true
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
export {
  createLinear
};
