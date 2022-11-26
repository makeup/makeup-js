"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var ActiveDescendant = _interopRequireWildcard(require("makeup-active-descendant"));
var PreventScrollKeys = _interopRequireWildcard(require("makeup-prevent-scroll-keys"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
* A listbox can be a standalone focusable widget, or controlled by a separate, focusable widget
* (a textbox for example, in the case of a combobox or datepicker)
*
* This listbox code currently supports single-selct only!
* This code has been copied from Skin & MIND Patterns and has not yet been cleaned up.
*/

var defaultOptions = {
  activeDescendantClassName: 'listbox__option--active',
  // the classname applied to the current active desdcendant
  autoInit: 'ariaSelectedOrInteractive',
  autoReset: 'ariaSelectedOrInteractive',
  autoSelect: true,
  // when true, aria-checked state matches active-descendant
  customElementMode: false,
  focusableElement: null,
  // used in a combobox/datepicker scenario
  listboxOwnerElement: null,
  // used in a combobox/datepicker scenario
  multiSelect: false,
  // todo
  useAriaChecked: true // doubles up on support for aria-selected to announce visible selected/checked state
};

function isSpacebarOrEnter(keyCode) {
  return keyCode === 13 || keyCode === 32;
}
class _default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;

    // in cases such as combobox, the active-descendant logic is controlled by a parent widget
    this._activeDescendantRootEl = this._options.listboxOwnerElement || this.el;

    // todo: not sure this check is needed any more
    if (widgetEl.getAttribute('role') === 'listbox') {
      this._listboxEl = widgetEl;
    } else {
      this._listboxEl = this.el.querySelector('[role=listbox]');
    }
    if (!this._options.focusableElement && this._listboxEl.getAttribute('tabindex') === null) {
      this._listboxEl.setAttribute('tabindex', '0');
    }
    PreventScrollKeys.add(this.el);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onClickListener = _onClick.bind(this);
    this._onActiveDescendantChangeListener = _onActiveDescendantChange.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add('listbox--js');
    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);
      this._observeMutations();
      this._observeEvents();
    }
    this._activeDescendant = ActiveDescendant.createLinear(this._activeDescendantRootEl, this._options.focusableElement || this._listboxEl, this._listboxEl, '[role=option]', {
      activeDescendantClassName: this._options.activeDescendantClassName,
      autoInit: this._options.autoInit,
      autoReset: this._options.autoReset,
      axis: 'y'
    });
  }
  _observeMutations() {
    if (!this._options.customElementMode) {
      this._mutationObserver.observe(this._listboxEl, {
        attributeFilter: ['aria-selected'],
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
      this._activeDescendantRootEl.addEventListener('activeDescendantChange', this._onActiveDescendantChangeListener);
      this._listboxEl.addEventListener('keydown', this._onKeyDownListener);
      this._listboxEl.addEventListener('click', this._onClickListener);
    }
  }
  _unobserveEvents() {
    this._listboxEl.removeEventListener('keydown', this._onKeyDownListener);
    this._listboxEl.removeEventListener('click', this._onClickListener);
    this._activeDescendantRootEl.removeEventListener('activeDescendantChange', this._onActiveDescendantChangeListener);
  }
  get index() {
    return this.items.findIndex(el => el.getAttribute('aria-selected') === 'true');
  }
  get items() {
    return this._activeDescendant.items;
  }
  select(index) {
    this._unobserveMutations();
    if (_indexInBounds(index, this.items.length)) {
      var matchingItem = this.items[index];
      matchingItem.setAttribute('aria-selected', 'true');
      if (this._options.useAriaChecked === true) {
        matchingItem.setAttribute('aria-checked', 'true');
      }
      this.el.dispatchEvent(new CustomEvent('makeup-listbox-change', {
        detail: {
          optionIndex: index,
          optionValue: matchingItem.innerText
        }
      }));
    }
    this._observeMutations();
  }
  unselect(index) {
    this._unobserveMutations();
    if (_indexInBounds(index, this.items.length)) {
      var matchingItem = this.items[index];
      matchingItem.setAttribute('aria-selected', 'false');
      if (this._options.useAriaChecked === true) {
        matchingItem.setAttribute('aria-checked', 'false');
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
exports.default = _default;
function _onKeyDown(e) {
  var activeDescendantEl = this._activeDescendant.currentItem;
  if (isSpacebarOrEnter(e.keyCode) && (activeDescendantEl === null || activeDescendantEl === void 0 ? void 0 : activeDescendantEl.getAttribute('aria-selected')) !== 'true') {
    // todo: this.select() should take care of unselecting any existing selections
    this.unselect(this.index);
    this.select(this._activeDescendant.index);
  }
}
function _onClick(e) {
  // unlike the keyDown event, the click event target can be a child element of the option
  // e.g. <div role="option"><span>Item 1</span></div>
  var toEl = e.target.closest('[role=option]');
  var toElIndex = this.items.indexOf(toEl);
  var isTolElSelected = toEl.getAttribute('aria-selected') === 'true';
  if (this._options.autoSelect === false && isTolElSelected === false) {
    // todo: this.select() should take care of unselecting any existing selections
    this.unselect(this.index);
    this.select(toElIndex);
  }
}
function _onActiveDescendantChange(e) {
  var {
    fromIndex,
    toIndex
  } = e.detail;
  if (this._options.autoSelect === true) {
    var fromEl = this.items[fromIndex];
    var toEl = this.items[toIndex];
    if (fromEl) {
      // todo: this.select() should take care of unselecting any existing selections
      this.unselect(fromIndex);
    }
    if (toEl) {
      this.select(toIndex);
    }
  }
}
function _onMutation(mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      this.el.dispatchEvent(new CustomEvent('makeup-listbox-mutation', {
        detail: {
          attributeName: mutation.attributeName
        }
      }));
    }
  }
}
function _indexInBounds(index, size) {
  return index > -1 && index < size;
}
