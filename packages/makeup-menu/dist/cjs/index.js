"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var RovingTabIndex = _interopRequireWildcard(require("makeup-roving-tabindex"));
var PreventScrollKeys = _interopRequireWildcard(require("makeup-prevent-scroll-keys"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const defaultOptions = {
  customElementMode: false,
  autoInit: "interactive",
  autoReset: "interactive",
  valueSelector: ".menu__item-value",
  // Selector to get value from
  valueTypeHTML: false // If true, will get innerHTML of valueSelector, otherwise will get innerText
};

class _default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._rovingTabIndex = RovingTabIndex.createLinear(this.el, "[role^=menuitem]", {
      autoInit: this._options.autoInit,
      autoReset: this._options.autoReset
    });
    PreventScrollKeys.add(this.el);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onClickListener = _onClick.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add("menu--js");
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
  }
  select(index) {
    this._unobserveMutations();
    const el = this.items[index];
    switch (el.getAttribute("role")) {
      case "menuitemcheckbox":
        _selectMenuItemCheckbox(this.el, el);
        break;
      case "menuitemradio":
        _selectMenuItemRadio(this.el, el, this._options);
        break;
      default:
        _selectMenuItem(this.el, el);
        break;
    }
    this._observeMutations();
  }
  get items() {
    return this._rovingTabIndex.items;
  }
  get radioGroupNames() {
    const els = [...this.el.querySelectorAll("[role=menuitemradio][data-makeup-group]")];
    const groupNames = [...new Set(els.map(el => el.dataset.makeupGroup))];
    return groupNames;
  }
  get checkboxGroupNames() {
    const els = [...this.el.querySelectorAll("[role=menuitemcheckbox][data-makeup-group]")];
    const groupNames = [...new Set(els.map(el => el.dataset.makeupGroup))];
    return groupNames;
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this.el, {
        attributeFilter: ["aria-checked", "aria-disabled"],
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  }
  _unobserveMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.disconnect();
    }
  }
  _observeEvents() {
    if (this._destroyed !== true) {
      this.el.addEventListener("keydown", this._onKeyDownListener);
      this.el.addEventListener("click", this._onClickListener);
    }
  }
  _unobserveEvents() {
    this.el.removeEventListener("keydown", this._onKeyDownListener);
    this.el.removeEventListener("click", this._onClickListener);
  }
  destroy() {
    this._destroyed = true;
    this._unobserveMutations();
    this._unobserveEvents();
    this._onKeyDownListener = null;
    this._onClickListener = null;
    this._onMutationListener = null;
  }
}
exports.default = _default;
function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this.el.dispatchEvent(new CustomEvent("makeup-menu-mutation", {
        detail: {
          attributeName: mutation.attributeName
        }
      }));
    }
  }
}
function _onKeyDown(e) {
  this._unobserveMutations();
  if (e.keyCode === 13) {
    e.preventDefault();
  }
  if (e.keyCode === 13 || e.keyCode === 32) {
    this.select(Array.from(this.items).indexOf(e.target));
  }
  this._observeMutations();
}
function _onClick(e) {
  // unlike the keyDown event, the click event target can be a child element of the menuitem
  // e.g. <div role="menuitem"><span>Item 1</span></div>
  const menuItemEl = e.target.closest("[role^=menuitem]");
  const index = this.items.indexOf(menuItemEl);
  if (index !== -1) {
    this.select(index);
  }
}
function _selectMenuItem(widgetEl, menuItemEl) {
  widgetEl.dispatchEvent(new CustomEvent("makeup-menu-select", {
    detail: {
      el: menuItemEl,
      value: menuItemEl.innerText
    }
  }));
}
function _selectMenuItemCheckbox(widgetEl, menuItemEl) {
  if (menuItemEl.getAttribute("aria-disabled") !== "true") {
    const groupName = menuItemEl.dataset.makeupGroup;
    menuItemEl.setAttribute("aria-checked", menuItemEl.getAttribute("aria-checked") === "true" ? "false" : "true");
    widgetEl.dispatchEvent(new CustomEvent("makeup-menu-change", {
      detail: {
        el: menuItemEl,
        checked: menuItemEl.getAttribute("aria-checked"),
        group: groupName,
        value: menuItemEl.innerText
      }
    }));
  }
}
function _selectMenuItemRadio(widgetEl, menuItemEl, options) {
  if (menuItemEl.getAttribute("aria-disabled") !== "true") {
    const groupName = menuItemEl.dataset.makeupGroup;
    const checkedEl = widgetEl.querySelector("[data-makeup-group=".concat(groupName, "][aria-checked=true]"));
    if (checkedEl) {
      checkedEl.setAttribute("aria-checked", "false");
    }
    let value = menuItemEl.innerText;

    // Check if value selector is present and use that to get value based on type instead
    // If its not present, will default to innerText of the whole item
    if (options.valueSelector) {
      const valueSelector = menuItemEl.querySelector(options.valueSelector);
      if (valueSelector) {
        value = options.valueTypeHTML ? valueSelector.innerHTML : valueSelector.innerText;
      }
    }
    if (checkedEl !== menuItemEl) {
      menuItemEl.setAttribute("aria-checked", "true");
      widgetEl.dispatchEvent(new CustomEvent("makeup-menu-change", {
        detail: {
          el: menuItemEl,
          group: groupName,
          value
        }
      }));
    }
  }
}
