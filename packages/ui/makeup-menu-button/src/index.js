import Expander from "makeup-expander";
import Menu from "makeup-menu";

const defaultOptions = {
  customElementMode: false,
  expandedClass: "menu-button--expanded",
  menuSelector: ".menu-button__menu",
  buttonTextSelector: `.btn__text`,
  buttonValueType: "text", // ["text", "icon", "both"],
  menuItemIconSelector: ".icon",
  menuItemButtonAriaLabelSelector: null,
};

export default class {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._buttonEl = widgetEl.querySelector("button");
    this._buttonEl.setAttribute("aria-haspopup", "true");
    this.menu = new Menu(widgetEl.querySelector(this._options.menuSelector), {
      autoReset: "interactive",
    });
    this._buttonPrefix = this._buttonEl.dataset?.makeupMenuButtonPrefix;
    this._buttonTextEl = this._buttonEl.querySelector(this._options.buttonTextSelector);

    this._expander = new Expander(widgetEl, {
      alwaysDoFocusManagement: true,
      autoCollapse: true,
      collapseOnHostReFocus: true,
      contentSelector: this._options.menuSelector,
      expandedClass: this._options.expandedClass,
      expandOnClick: true,
      focusManagement: "focusable",
      hostSelector: "button",
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
        subtree: false,
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
      this._buttonEl.addEventListener("click", this._onButtonFirstClickListener, { once: true });
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

function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this.el.dispatchEvent(
        new CustomEvent("makeup-menu-button-mutation", {
          detail: {
            attributeName: mutation.attributeName,
          },
        }),
      );
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
  const { el } = e.detail;

  // Re-dispatch the menu event as a menu-button event
  let eventName;
  if (e.type === "makeup-menu-select") {
    eventName = "makeup-menu-button-select";
  } else if (e.type === "makeup-menu-change") {
    eventName = "makeup-menu-button-change";
  }
  
  if (eventName) {
    this.el.dispatchEvent(
      new CustomEvent(eventName, {
        detail: e.detail,
      }),
    );
  }

  setTimeout(function () {
    widget._expander.expanded = false;
    widget._buttonEl.focus();
  }, 150);

  if (el.getAttribute("role") !== "menuitemradio") {
    return;
  }

  const { menuItemIconSelector, menuItemButtonAriaLabelSelector, buttonValueType } = this._options;
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
    const selectorText = el.querySelector(menuItemButtonAriaLabelSelector)?.innerText.trim();
    this._buttonEl.setAttribute(
      "aria-label",
      this._buttonPrefix ? `${this._buttonPrefix} ${selectorText}` : selectorText,
    );
  }

  this._buttonTextEl.innerHTML = btnContent;
}
