"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupExpander = _interopRequireDefault(require("makeup-expander"));
var _makeupListbox = _interopRequireDefault(require("makeup-listbox"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = {
  autoSelect: true,
  buttonLabelSelector: ".btn__text",
  collapseTimeout: 150,
  customElementMode: false,
  listboxSelector: ".listbox-button__listbox",
  floatingLabelSelector: ".btn__floating-label",
  floatingLabelInline: "btn__floating-label--inline",
  floatingLabelAnimate: "btn__floating-label--animate",
  valueSelector: ".listbox-button__value",
  buttonValueType: "text",
  // ["text", "icon", "both"],
  listboxOptionIconSelector: ".icon",
  listboxOptionAriaLabelSelector: null
};
class _default {
  constructor(widgetEl, selectedOptions) {
    var _this$_buttonEl$datas;
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._buttonEl = this.el.querySelector("button");
    this._buttonLabelEl = widgetEl.querySelector(this._options.buttonLabelSelector);
    this._buttonFloatingLabelEl = widgetEl.querySelector(this._options.floatingLabelSelector);
    this._buttonPrefix = (_this$_buttonEl$datas = this._buttonEl.dataset) === null || _this$_buttonEl$datas === void 0 ? void 0 : _this$_buttonEl$datas.listboxButtonPrefix;
    this._listboxEl = this.el.querySelector(this._options.listboxSelector);
    this._onButtonFirstClickListener = _onButtonFirstClick.bind(this);
    this._onListboxClickListener = _onListboxClick.bind(this);
    this._onListboxKeyDownListener = _onListboxKeyDown.bind(this);
    this._onListboxInitListener = _onListboxInit.bind(this);
    this._onListboxChangeListener = _onListboxChange.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
    this.listbox = new _makeupListbox.default(this._listboxEl, {
      activeDescendantClassName: "listbox-button__option--active",
      autoReset: "ariaSelectedOrInteractive",
      autoSelect: this._options.autoSelect,
      valueSelector: this._options.valueSelector
    });
    this._expander = new _makeupExpander.default(this.el, {
      alwaysDoFocusManagement: true,
      autoCollapse: true,
      collapseOnHostReFocus: true,
      contentSelector: this._options.listboxSelector,
      expandedClass: "listbox-button--expanded",
      expandOnClick: true,
      focusManagement: "focusable",
      hostSelector: "button"
    });
    this.el.classList.add("listbox-button--js");
    if (this._buttonFloatingLabelEl) {
      if (!this._buttonLabelEl.innerText) {
        this._buttonFloatingLabelEl.classList.add(this._options.floatingLabelInline);
      }
    }
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this._buttonEl, {
        attributeFilter: ["aria-expanded"],
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
  _unobserveEvents() {
    this._buttonEl.removeEventListener("click", this._onButtonFirstClickListener);
    this._listboxEl.removeEventListener("click", this._onListboxClickListener);
    this._listboxEl.removeEventListener("keydown", this._onListboxKeyDownListener);
    this._listboxEl.removeEventListener("makeup-listbox-init", this._onListboxInitListener);
    this._listboxEl.removeEventListener("makeup-listbox-change", this._onListboxChangeListener);
  }
  _observeEvents() {
    if (this._destroyed !== true) {
      this._buttonEl.addEventListener("click", this._onButtonFirstClickListener, {
        once: true
      });
      this._listboxEl.addEventListener("click", this._onListboxClickListener);
      this._listboxEl.addEventListener("keydown", this._onListboxKeyDownListener);
      this._listboxEl.addEventListener("makeup-listbox-init", this._onListboxInitListener);
      this._listboxEl.addEventListener("makeup-listbox-change", this._onListboxChangeListener);
    }
  }
  collapse() {
    const widget = this;
    setTimeout(function () {
      widget._unobserveMutations();
      widget._expander.expanded = false;
      widget._observeMutations();
      widget._buttonEl.focus();
    }, this._options.collapseTimeout);
  }
  destroy() {
    this._destroyed = true;
    this._unobserveEvents();
    this._unobserveMutations();
    this._onButtonFirstClickListener = null;
    this._onListboxClickListener = null;
    this._onListboxKeyDownListener = null;
    this._onListboxInitListener = null;
    this._onListboxChangeListener = null;
    this._onMutationListener = null;
  }
}

// listbox element should be hidden in initial SSR markup (for progressive enhancement)
exports.default = _default;
function _onButtonFirstClick() {
  this.listbox.el.hidden = false;
}
function _onListboxKeyDown(e) {
  if (e.keyCode === 13 || e.keyCode === 27 || e.keyCode === 32) {
    this.collapse();
  }
}
function _onListboxClick() {
  this.collapse();
}
function _onListboxInit(e) {
  this.el.dispatchEvent(new CustomEvent("makeup-listbox-button-init", {
    detail: e.detail
  }));
}
function _onListboxChange(e) {
  const toValue = e.detail.optionValue;
  const {
    listboxOptionIconSelector,
    listboxOptionAriaLabelSelector,
    buttonValueType,
    floatingLabelAnimate,
    floatingLabelInline
  } = this._options;
  const icon = e.detail.el.querySelector(listboxOptionIconSelector).cloneNode(true);
  let btnContent = this._buttonPrefix ? "".concat(this._buttonPrefix).concat(toValue) : toValue;
  if (icon) {
    switch (buttonValueType) {
      case "both":
        btnContent = "".concat(icon.outerHTML, " <span>").concat(btnContent, "</span>");
        break;
      case "icon":
        this._buttonEl.setAttribute("aria-label", btnContent);
        btnContent = icon.outerHTML;
        break;
      default:
        break;
    }
  }
  if (listboxOptionAriaLabelSelector) {
    var _e$detail$el$querySel;
    const selectorText = (_e$detail$el$querySel = e.detail.el.querySelector(listboxOptionAriaLabelSelector)) === null || _e$detail$el$querySel === void 0 ? void 0 : _e$detail$el$querySel.innerText.trim();
    this._buttonEl.setAttribute("aria-label", this._buttonPrefix ? "".concat(this._buttonPrefix, " ").concat(selectorText) : selectorText);
  }
  this._buttonLabelEl.innerHTML = btnContent;
  if (this._buttonFloatingLabelEl) {
    if (toValue) {
      this._buttonFloatingLabelEl.classList.add(floatingLabelAnimate);
      this._buttonFloatingLabelEl.classList.remove(floatingLabelInline);
    } else {
      this._buttonFloatingLabelEl.classList.add(floatingLabelInline);
    }
  }
  this.el.dispatchEvent(new CustomEvent("makeup-listbox-button-change", {
    detail: e.detail
  }));
}
function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this.el.dispatchEvent(new CustomEvent("makeup-listbox-button-mutation", {
        detail: {
          attributeName: mutation.attributeName
        }
      }));
    }
  }
}
