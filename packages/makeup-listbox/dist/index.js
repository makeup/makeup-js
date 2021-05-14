"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* A listbox can be a standalone focusable widget, or controlled by a separate, focusable widget
* (a textbox for example, in the case of a combobox or datepicker)
*
* This listbox code currently supports single-selct only!
* This code has been copied from Skin & MIND Patterns and has not yet been cleaned up.
*/
// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
var CustomEvent = require('custom-event');

var findIndex = require('core-js-pure/features/array/find-index');

var ActiveDescendant = require('makeup-active-descendant');

var PreventScrollKeys = require('makeup-prevent-scroll-keys');

var defaultOptions = {
  activeDescendantClassName: 'listbox__option--active',
  // the classname applied to the current active desdcendant
  autoReset: null,
  // passed to makeup-active-descendant
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

module.exports = /*#__PURE__*/function () {
  function _class(widgetEl, selectedOptions) {
    _classCallCheck(this, _class);

    this._options = _extends({}, defaultOptions, selectedOptions);
    this.el = widgetEl; // in cases such as combobox, the active-descendant logic is controlled by a parent widget

    this._activeDescendantRootEl = this._options.listboxOwnerElement || this.el; // todo: not sure this check is needed any more

    if (widgetEl.getAttribute('role') === 'listbox') {
      this._listboxEl = widgetEl;
    } else {
      this._listboxEl = this.el.querySelector('[role=listbox]');
    }

    if (!this._options.focusableElement && this._listboxEl.getAttribute('tabindex') === null) {
      this._listboxEl.setAttribute('tabindex', '0');
    }

    this._activeDescendant = ActiveDescendant.createLinear(this._activeDescendantRootEl, this._options.focusableElement || this._listboxEl, this._listboxEl, '[role=option]', {
      activeDescendantClassName: this._options.activeDescendantClassName,
      autoInit: this.index,
      autoReset: this._options.autoReset,
      axis: 'y',
      ignoreButtons: true
    });
    PreventScrollKeys.add(this.el);
    this._onFocusListener = _onFocus.bind(this);
    this._onMouseDownListener = _onMouseDown.bind(this);
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
  }

  _createClass(_class, [{
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this._listboxEl, {
          attributeFilter: ['aria-selected'],
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    }
  }, {
    key: "_unobserveMutations",
    value: function _unobserveMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.disconnect();
      }
    }
  }, {
    key: "_observeEvents",
    value: function _observeEvents() {
      if (this._destroyed !== true) {
        this._listboxEl.addEventListener('focus', this._onFocusListener);

        this._listboxEl.addEventListener('mousedown', this._onMouseDownListener);

        this._activeDescendantRootEl.addEventListener('activeDescendantChange', this._onActiveDescendantChangeListener);

        this._listboxEl.addEventListener('keydown', this._onKeyDownListener);

        this._listboxEl.addEventListener('click', this._onClickListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._listboxEl.removeEventListener('focus', this._onFocusListener);

      this._listboxEl.removeEventListener('mousedown', this._onMouseDownListener);

      this._listboxEl.removeEventListener('keydown', this._onKeyDownListener);

      this._listboxEl.removeEventListener('click', this._onClickListener);

      this._activeDescendantRootEl.removeEventListener('activeDescendantChange', this._onActiveDescendantChangeListener);
    }
  }, {
    key: "index",
    get: function get() {
      return findIndex(Array.prototype.slice.call(this.items), function (el) {
        return el.getAttribute('aria-selected') === 'true';
      });
    }
  }, {
    key: "items",
    get: function get() {
      return this._listboxEl.querySelectorAll('[role=option]');
    }
  }, {
    key: "select",
    value: function select(index) {
      this._unobserveMutations();

      if (_indexInBounds(index, this.items.length)) {
        this.items[index].setAttribute('aria-selected', 'true');

        if (this._options.useAriaChecked === true) {
          this.items[index].setAttribute('aria-checked', 'true');
        }

        this.el.dispatchEvent(new CustomEvent('makeup-listbox-change', {
          detail: {
            optionIndex: index,
            optionValue: this.items[index].innerText
          }
        }));
      }

      this._observeMutations();
    }
  }, {
    key: "unselect",
    value: function unselect(index) {
      this._unobserveMutations();

      if (_indexInBounds(index, this.items.length)) {
        this.items[index].setAttribute('aria-selected', 'false');

        if (this._options.useAriaChecked === true) {
          this.items[index].setAttribute('aria-checked', 'false');
        }
      }

      this._observeMutations();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveMutations();

      this._unobserveEvents();

      this._onFocusListener = null;
      this._onMouseDownListener = null;
      this._onKeyDownListener = null;
      this._onClickListener = null;
      this._onActiveDescendantChangeListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _class;
}();
/*
*   For listbox with auto select, the first keyboard focus should set selection to first option
*/


function _onFocus() {
  this._unobserveMutations();

  if (this._mouseDownFlag !== true && this._options.autoSelect === true && this.index === -1) {
    this._activeDescendant.index = 0;
    this.items[0].setAttribute('aria-selected', 'true');

    if (this._options.useAriaChecked === true) {
      this.items[0].setAttribute('aria-checked', 'true');
    }
  }

  this._mouseDownFlag = false;

  this._observeMutations();
}
/*
*   This flag is used to help us detect if first focus comes from keyboard or as a result of mouse _onClick
*/


function _onMouseDown() {
  this._mouseDownFlag = true;
}

function _onKeyDown(e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    // enter key or spacebar key
    var toElIndex = this._activeDescendant.index;
    var toEl = this.items[toElIndex];
    var isTolElSelected = toEl.getAttribute('aria-selected') === 'true';

    if (this._options.autoSelect === false && isTolElSelected === false) {
      this.unselect(this.index);
      this.select(toElIndex);
    }
  }
}

function _onClick(e) {
  var toEl = e.target.closest('[role=option]');
  var toElIndex = toEl.dataset.makeupIndex;
  var isTolElSelected = toEl.getAttribute('aria-selected') === 'true';

  if (this._options.autoSelect === false && isTolElSelected === false) {
    this.unselect(this.index);
    this.select(toElIndex);
  }
}

function _onActiveDescendantChange(e) {
  this.el.dispatchEvent(new CustomEvent('makeup-listbox-active-descendant-change', {
    detail: e.detail
  }));

  if (this._options.autoSelect === true) {
    var fromEl = this.items[e.detail.fromIndex];
    var toEl = this.items[e.detail.toIndex];

    if (fromEl) {
      this.unselect(e.detail.fromIndex);
    }

    if (toEl) {
      this.select(e.detail.toIndex);
    }
  }
}

function _onMutation(mutationsList) {
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this.el.dispatchEvent(new CustomEvent('makeup-listbox-mutation', {
          detail: {
            attributeName: mutation.attributeName
          }
        }));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function _indexInBounds(index, size) {
  return index > -1 && index < size;
}
