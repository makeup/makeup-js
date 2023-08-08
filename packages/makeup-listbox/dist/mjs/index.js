import * as ActiveDescendant from "makeup-active-descendant";
import * as PreventScrollKeys from "makeup-prevent-scroll-keys";
const defaultOptions = {
  activeDescendantClassName: "listbox__option--active",
  // the classname applied to the current active desdcendant
  autoInit: "ariaSelectedOrInteractive",
  autoReset: "ariaSelectedOrInteractive",
  autoSelect: true,
  // when true, aria-checked state matches active-descendant
  customElementMode: false,
  focusableElement: null,
  // used in a combobox/datepicker scenario
  listboxOwnerElement: null,
  // used in a combobox/datepicker scenario
  multiSelect: false,
  // todo
  useAriaChecked: true
  // doubles up on support for aria-selected to announce visible selected/checked state
};
function isSpacebarOrEnter(keyCode) {
  return keyCode === 13 || keyCode === 32;
}
class src_default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._activeDescendantRootEl = this._options.listboxOwnerElement || this.el;
    if (widgetEl.getAttribute("role") === "listbox") {
      this._listboxEl = widgetEl;
    } else {
      this._listboxEl = this.el.querySelector("[role=listbox]");
    }
    if (!this._options.focusableElement && this._listboxEl.getAttribute("tabindex") === null) {
      this._listboxEl.setAttribute("tabindex", "0");
    }
    PreventScrollKeys.add(this.el);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onClickListener = _onClick.bind(this);
    this._onActiveDescendantChangeListener = _onActiveDescendantChange.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add("listbox--js");
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
    this._activeDescendant = ActiveDescendant.createLinear(
      this._activeDescendantRootEl,
      this._options.focusableElement || this._listboxEl,
      this._listboxEl,
      "[role=option]",
      {
        activeDescendantClassName: this._options.activeDescendantClassName,
        autoInit: this._options.autoInit,
        autoReset: this._options.autoReset,
        axis: "y"
      }
    );
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this._listboxEl, {
        attributeFilter: ["aria-selected"],
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
      this._activeDescendantRootEl.addEventListener("activeDescendantChange", this._onActiveDescendantChangeListener);
      this._listboxEl.addEventListener("keydown", this._onKeyDownListener);
      this._listboxEl.addEventListener("click", this._onClickListener);
    }
  }
  _unobserveEvents() {
    this._listboxEl.removeEventListener("keydown", this._onKeyDownListener);
    this._listboxEl.removeEventListener("click", this._onClickListener);
    this._activeDescendantRootEl.removeEventListener("activeDescendantChange", this._onActiveDescendantChangeListener);
  }
  get index() {
    return this.items.findIndex((el) => el.getAttribute("aria-selected") === "true");
  }
  get items() {
    return this._activeDescendant.items;
  }
  select(index) {
    this._unobserveMutations();
    const itemEl = this.items[index];
    if (itemEl && itemEl.getAttribute("aria-disabled") !== "true") {
      const matchingItem = this.items[index];
      matchingItem.setAttribute("aria-selected", "true");
      if (this._options.useAriaChecked === true) {
        matchingItem.setAttribute("aria-checked", "true");
      }
      this.el.dispatchEvent(
        new CustomEvent("makeup-listbox-change", {
          detail: {
            optionIndex: index,
            optionValue: matchingItem.innerText
          }
        })
      );
    }
    this._observeMutations();
  }
  unselect(index) {
    this._unobserveMutations();
    const itemEl = this.items[index];
    if (itemEl && itemEl.getAttribute("aria-disabled") !== "true") {
      const matchingItem = this.items[index];
      matchingItem.setAttribute("aria-selected", "false");
      if (this._options.useAriaChecked === true) {
        matchingItem.setAttribute("aria-checked", "false");
      }
    }
    this._observeMutations();
  }
  destroy() {
    this._destroyed = true;
    this._unobserveMutations();
    this._unobserveEvents();
    this._onKeyDownListener = null;
    this._onClickListener = null;
    this._onActiveDescendantChangeListener = null;
    this._onMutationListener = null;
  }
}
function _onKeyDown(e) {
  const activeDescendantEl = this._activeDescendant.currentItem;
  if (isSpacebarOrEnter(e.keyCode) && activeDescendantEl?.getAttribute("aria-selected") !== "true") {
    this.unselect(this.index);
    this.select(this._activeDescendant.index);
  }
}
function _onClick(e) {
  const toEl = e.target.closest("[role=option]");
  const toElIndex = this.items.indexOf(toEl);
  const isTolElSelected = toEl.getAttribute("aria-selected") === "true";
  const isTolElDisabled = toEl.getAttribute("aria-disabled") === "true";
  if (!isTolElDisabled && this._options.autoSelect === false && isTolElSelected === false) {
    this.unselect(this.index);
    this.select(toElIndex);
  }
}
function _onActiveDescendantChange(e) {
  const { fromIndex, toIndex } = e.detail;
  if (this._options.autoSelect === true) {
    const fromEl = this.items[fromIndex];
    const toEl = this.items[toIndex];
    if (fromEl) {
      this.unselect(fromIndex);
    }
    if (toEl) {
      this.select(toIndex);
    }
  }
}
function _onMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      this.el.dispatchEvent(
        new CustomEvent("makeup-listbox-mutation", {
          detail: {
            attributeName: mutation.attributeName
          }
        })
      );
    }
  }
}
export {
  src_default as default
};
