'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinear = createLinear;
var NavigationEmitter = _interopRequireWildcard(require("makeup-navigation-emitter"));
var _makeupNextId = _interopRequireDefault(require("makeup-next-id"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var defaultOptions = {
  activeDescendantClassName: 'active-descendant',
  autoInit: 'none',
  autoReset: 'none',
  autoScroll: false,
  axis: 'both',
  wrap: false
};
function onModelInit(e) {
  var {
    items,
    toIndex
  } = e.detail;
  var itemEl = items[toIndex];
  if (itemEl) {
    itemEl.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
  }
  this._el.dispatchEvent(new CustomEvent('activeDescendantInit', {
    detail: e.detail
  }));
}
function onModelChange(e) {
  var {
    fromIndex,
    toIndex
  } = e.detail;
  var fromItem = this.items[fromIndex];
  var toItem = this.items[toIndex];
  if (fromItem) {
    fromItem.classList.remove(this._options.activeDescendantClassName);
  }
  if (toItem) {
    toItem.classList.add(this._options.activeDescendantClassName);
    this._focusEl.setAttribute('aria-activedescendant', toItem.id);
    if (this._options.autoScroll && this._containerEl) {
      this._containerEl.scrollTop = toItem.offsetTop - this._containerEl.offsetHeight / 2;
    }
  }
  this._el.dispatchEvent(new CustomEvent('activeDescendantChange', {
    detail: e.detail
  }));
}
function onModelReset(e) {
  var toIndex = e.detail.toIndex;
  var activeClassName = this._options.activeDescendantClassName;
  this.items.forEach(function (el) {
    el.classList.remove(activeClassName);
  });
  if (toIndex !== null && toIndex !== -1) {
    var itemEl = this.items[toIndex];
    itemEl.classList.add(activeClassName);
    this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
  } else {
    this._focusEl.removeAttribute('aria-activedescendant');
  }
  this._el.dispatchEvent(new CustomEvent('activeDescendantReset', {
    detail: e.detail
  }));
}
function onModelMutation(e) {
  var {
    toIndex
  } = e.detail;
  var activeDescendantClassName = this.options.activeDescendantClassName;
  this.items.forEach(function (item, index) {
    (0, _makeupNextId.default)(item);
    if (index !== toIndex) {
      item.classList.remove(activeDescendantClassName);
    } else {
      item.classList.add(activeDescendantClassName);
    }
  });
  this._el.dispatchEvent(new CustomEvent('activeDescendantMutation', {
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
    this._el.addEventListener('navigationModelMutation', this._onMutationListener);
    this._el.addEventListener('navigationModelChange', this._onChangeListener);
    this._el.addEventListener('navigationModelReset', this._onResetListener);
    this._el.addEventListener('navigationModelInit', this._onInitListener);
  }
  destroy() {
    this._el.removeEventListener('navigationModelMutation', this._onMutationListener);
    this._el.removeEventListener('navigationModelChange', this._onChangeListener);
    this._el.removeEventListener('navigationModelReset', this._onResetListener);
    this._el.removeEventListener('navigationModelInit', this._onInitListener);
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
      focusEl.setAttribute('aria-owns', this._itemContainerEl.id);
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
