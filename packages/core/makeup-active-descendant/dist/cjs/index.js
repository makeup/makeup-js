"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinear = createLinear;
var NavigationEmitter = _interopRequireWildcard(require("makeup-navigation-emitter"));
var _makeupNextId = _interopRequireDefault(require("makeup-next-id"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const defaultOptions = {
  activeDescendantClassName: "active-descendant",
  autoInit: "none",
  autoReset: "none",
  autoScroll: false,
  axis: "both",
  wrap: false
};
function onModelInit(e) {
  const {
    items,
    toIndex
  } = e.detail;
  const itemEl = items[toIndex];
  if (itemEl) {
    itemEl.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute("aria-activedescendant", itemEl.id);
  }
  this._el.dispatchEvent(new CustomEvent("activeDescendantInit", {
    detail: e.detail
  }));
}
function onModelChange(e) {
  const {
    fromIndex,
    toIndex
  } = e.detail;
  const fromItem = this.items[fromIndex];
  const toItem = this.items[toIndex];
  if (fromItem) {
    fromItem.classList.remove(this._options.activeDescendantClassName);
  }
  if (toItem) {
    toItem.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute("aria-activedescendant", toItem.id);
    if (this._options.autoScroll && this._itemContainerEl) {
      this._itemContainerEl.scrollTop = toItem.offsetTop - this._itemContainerEl.offsetHeight / 2;
    }
  }
  this._el.dispatchEvent(new CustomEvent("activeDescendantChange", {
    detail: e.detail
  }));
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
  this._el.dispatchEvent(new CustomEvent("activeDescendantReset", {
    detail: e.detail
  }));
}
function onModelMutation(e) {
  const {
    toIndex
  } = e.detail;
  const activeDescendantClassName = this._options.activeDescendantClassName;
  this.items.forEach(function (item, index) {
    (0, _makeupNextId.default)(item);
    if (index !== toIndex) {
      item.classList.remove(activeDescendantClassName);
    } else {
      item.classList.add(activeDescendantClassName);
    }
  });
  this._el.dispatchEvent(new CustomEvent("activeDescendantMutation", {
    detail: e.detail
  }));
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
    (0, _makeupNextId.default)(this._itemContainerEl);

    // if programmatic relationship set aria-owns
    if (this._itemContainerEl !== this._focusEl) {
      focusEl.setAttribute("aria-owns", this._itemContainerEl.id);
    }
    this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
      autoInit: this._options.autoInit,
      autoReset: this._options.autoReset,
      axis: this._options.axis,
      ignoreByDelegateSelector: this._options.ignoreByDelegateSelector,
      wrap: this._options.wrap
    });

    // ensure each item has an id
    this.items.forEach(function (itemEl) {
      (0, _makeupNextId.default)(itemEl);
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
