"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupExpander = _interopRequireDefault(require("makeup-expander"));
var _makeupMenu = _interopRequireDefault(require("makeup-menu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = {
  customElementMode: false,
  expandedClass: "menu-button--expanded",
  menuSelector: ".menu-button__menu",
  buttonTextSelector: `.btn__text`,
  buttonValueType: "text",
  // ["text", "icon", "both"],
  menuItemIconSelector: ".icon",
  menuItemButtonAriaLabelSelector: null
};
class _default {
  constructor(widgetEl, selectedOptions) {
    var _this$_buttonEl$datas;
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._buttonEl = widgetEl.querySelector("button");
    this._buttonEl.setAttribute("aria-haspopup", "true");
    this.menu = new _makeupMenu.default(widgetEl.querySelector(this._options.menuSelector), {
      autoReset: "interactive"
    });
    this._buttonPrefix = (_this$_buttonEl$datas = this._buttonEl.dataset) === null || _this$_buttonEl$datas === void 0 ? void 0 : _this$_buttonEl$datas.makeupMenuButtonPrefix;
    this._buttonTextEl = this._buttonEl.querySelector(this._options.buttonTextSelector);
    this._expander = new _makeupExpander.default(widgetEl, {
      alwaysDoFocusManagement: true,
      collapseOnClick: true,
      collapseOnClickOut: true,
      collapseOnFocusOut: true,
      contentSelector: this._options.menuSelector,
      expandedClass: this._options.expandedClass,
      expandOnClick: true,
      focusManagement: "focusable",
      hostSelector: "button"
    });
    this._onButtonFirstClickListener = _onButtonFirstClick.bind(this);
    this._onMenuKeyDownListener = _onMenuKeyDown.bind(this);
    this._onMenuItemSelectListener = _onMenuItemSelect.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add("menu-button--js");
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this.el, {
        attributeFilter: ["aria-expanded", "disabled"],
        attributes: true,
        childList: false,
        subtree: false
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
      this._buttonEl.addEventListener("click", this._onButtonFirstClickListener, {
        once: true
      });
      this.menu.el.addEventListener("keydown", this._onMenuKeyDownListener);
      this.menu.el.addEventListener("makeup-menu-select", this._onMenuItemSelectListener);
      this.menu.el.addEventListener("makeup-menu-change", this._onMenuItemSelectListener);
    }
  }
  _unobserveEvents() {
    this._buttonEl.removeEventListener("click", this._onButtonFirstClickListener);
    this.menu.el.removeEventListener("keydown", this._onMenuKeyDownListener);
    this.menu.el.removeEventListener("makeup-menu-select", this._onMenuItemSelectListener);
    this.menu.el.removeEventListener("makeup-menu-change", this._onMenuItemSelectListener);
  }
  destroy() {
    this._destroyed = true;
    this._unobserveMutations();
    this._unobserveEvents();
    this._onButtonFirstClickListener = null;
    this._onMenuKeyDownListener = null;
    this._onMenuItemSelectListener = null;
    this._onMutationListener = null;
  }
}
exports.default = _default;
function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this.el.dispatchEvent(new CustomEvent("makeup-menu-button-mutation", {
        detail: {
          attributeName: mutation.attributeName
        }
      }));
    }
  }
}
function _onButtonFirstClick() {
  this.menu.el.hidden = false;
}
function _onMenuKeyDown(e) {
  if (e.keyCode === 27) {
    this._expander.expanded = false;
    this._buttonEl.focus();
  }
}
function _onMenuItemSelect(e) {
  const widget = this;
  const {
    el
  } = e.detail;
  setTimeout(function () {
    widget._expander.expanded = false;
    widget._buttonEl.focus();
  }, 150);
  if (el.getAttribute("role") !== "menuitemradio") {
    return;
  }
  const {
    menuItemIconSelector,
    menuItemButtonAriaLabelSelector,
    buttonValueType
  } = this._options;
  const icon = el.querySelector(menuItemIconSelector).cloneNode(true);
  const text = el.innerText.trim();
  let btnContent = this._buttonPrefix ? `${this._buttonPrefix} ${text}` : text;
  if (icon) {
    switch (buttonValueType) {
      case "both":
        btnContent = `${icon.outerHTML} <span>${btnContent}</span>`;
        break;
      case "icon":
        this._buttonEl.setAttribute("aria-label", btnContent);
        btnContent = icon.outerHTML;
        break;
      default:
        break;
    }
  }
  if (menuItemButtonAriaLabelSelector) {
    var _el$querySelector;
    const selectorText = (_el$querySelector = el.querySelector(menuItemButtonAriaLabelSelector)) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.innerText.trim();
    this._buttonEl.setAttribute("aria-label", this._buttonPrefix ? `${this._buttonPrefix} ${selectorText}` : selectorText);
  }
  this._buttonTextEl.innerHTML = btnContent;
}
