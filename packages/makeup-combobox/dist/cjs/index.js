"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeupExpander = _interopRequireDefault(require("makeup-expander"));

var _makeupListbox = _interopRequireDefault(require("makeup-listbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

var defaultOptions = {
  autoSelect: true,
  collapseTimeout: 150,
  customElementMode: false
};

var _default = /*#__PURE__*/function () {
  function _default(widgetEl, selectedOptions) {
    _classCallCheck(this, _default);

    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this._el = widgetEl;
    this._inputEl = this._el.querySelector('input');
    this._listboxEl = this._el.querySelector('.combobox__listbox');
    this._autocompleteType = this._inputEl.getAttribute('aria-autocomplete');

    this._inputEl.setAttribute('autocomplete', 'off');

    this._inputEl.setAttribute('role', 'combobox');

    this._listboxEl.hidden = false;
    this._listboxWidget = new _makeupListbox.default(this._listboxEl, {
      activeDescendantClassName: 'combobox__option--active',
      autoReset: -1,
      autoSelect: this._options.autoSelect,
      focusableElement: this._inputEl,
      listboxOwnerElement: this._el
    });
    this._expander = new _makeupExpander.default(this._el, {
      collapseOnClickOut: true,
      collapseOnFocusOut: true,
      contentSelector: '.combobox__listbox',
      expandedClass: 'combobox--expanded',
      expandOnFocus: true,
      hostSelector: 'input'
    });
    this._destroyed = false;
    this._onInputFocusListener = _onInputFocus.bind(this);
    this._onListboxClickListener = _onListboxClick.bind(this);
    this._onListboxActiveDescendantChangeListener = _onListboxActiveDescendantChange.bind(this);
    this._onTextboxKeyDownListener = _onTextboxKeyDown.bind(this);
    this._onTextboxInputListener = _onTextboxInput.bind(this);
    this._onTextboxClickListener = _onTextboxClick.bind(this);
    this._onMutationListener = _onMutation.bind(this);

    this._el.classList.add('combobox--js');

    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);

      this._observeMutations();

      this._observeEvents();
    }
  }

  _createClass(_default, [{
    key: "resetFilter",
    value: function resetFilter() {
      this._listboxWidget._activeDescendant.reset();

      this._listboxWidget.items.forEach(function (el) {
        return el.hidden = false;
      });
    }
  }, {
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this._inputEl, {
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
        this._listboxEl.addEventListener('click', this._onListboxClickListener);

        this._listboxEl.addEventListener('makeup-listbox-active-descendant-change', this._onListboxActiveDescendantChangeListener);

        this._inputEl.addEventListener('focus', this._onInputFocusListener);

        this._inputEl.addEventListener('keydown', this._onTextboxKeyDownListener);

        this._inputEl.addEventListener('input', this._onTextboxInputListener);

        this._inputEl.addEventListener('click', this._onTextboxClickListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._listboxEl.removeEventListener('click', this._onListboxClickListener);

      this._listboxEl.removeEventListener('makeup-listbox-active-descendant-change', this._onListboxActiveDescendantChangeListener);

      this._inputEl.removeEventListener('focus', this._onInputFocusListener);

      this._inputEl.removeEventListener('keydown', this._onTextboxKeyDownListener);

      this._inputEl.removeEventListener('input', this._onTextboxInputListener);

      this._inputEl.removeEventListener('click', this._onTextboxClickListener);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveMutations();

      this._unobserveEvents();

      this._onInputFocusListener = null;
      this._onListboxClickListener = null;
      this._onListboxActiveDesendanctChangeListener = null;
      this._onTextboxKeyDownListener = null;
      this._onTextboxInputListener = null;
      this._onTextboxClickListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _default;
}();

exports.default = _default;

function _onInputFocus() {
  this.resetFilter();
}

function _onTextboxKeyDown(e) {
  // up and down keys should not move caret
  if (e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault();
  } // down arrow key should always expand listbox


  if (e.keyCode === 40) {
    if (this._expander.expanded === false) {
      this._expander.expanded = true;
    }
  } // escape key should always collapse listbox


  if (e.keyCode === 27) {
    if (this._expander.expanded === true) {
      this._expander.expanded = false;

      this._listboxWidget._activeDescendant.reset();
    }
  } // for manual selection, ENTER should not submit form when there is an active descendant


  if (this._options.autoSelect === false && e.keyCode === 13 && this._inputEl.getAttribute('aria-activedescendant')) {
    e.preventDefault();
    var widget = this;
    this._inputEl.value = nodeListToArray(this._listboxWidget.items).filter(function (el) {
      return !el.hidden;
    })[this._listboxWidget._activeDescendant.index].innerText;

    _dispatchChangeEvent(this._el, this._inputEl.value);

    this._listboxWidget._activeDescendant.reset();

    setTimeout(function () {
      widget._expander.expanded = false;

      if (widget._autocompleteType === 'list') {
        if (widget._inputEl.value.length === 0) {
          widget.resetFilter();
        } else {
          _filterSuggestions(widget._inputEl.value, widget._listboxWidget.items);
        }
      }
    }, this._options.collapseTimeout);
  }
}

function _onTextboxClick() {
  if (this._expander.expanded === false) {
    this._expander.expanded = true;
  }
}

function _onTextboxInput() {
  if (this._expander.expanded === false) {
    this._expander.expanded = true;
  }

  if (this._autocompleteType === 'list') {
    this._listboxWidget._activeDescendant.reset();

    if (this._inputEl.value.length === 0) {
      this.resetFilter();
    } else {
      _filterSuggestions(this._inputEl.value, this._listboxWidget.items);
    }
  }
}

function _onListboxClick(e) {
  var widget = this;
  var element = e.target.closest('[data-makeup-index]');
  var indexData = element.dataset.makeupIndex;

  if (indexData !== undefined) {
    this._inputEl.value = nodeListToArray(this._listboxWidget.items).filter(function (el) {
      return !el.hidden;
    })[indexData].innerText;

    if (this._options.autoSelect === false) {
      _dispatchChangeEvent(this._el, this._inputEl.value);
    }

    setTimeout(function () {
      widget._expander.expanded = false;
    }, this._options.collapseTimeout);
  }
}

function _onListboxActiveDescendantChange(e) {
  if (this._options.autoSelect === true) {
    this._inputEl.value = nodeListToArray(this._listboxWidget.items).filter(function (el) {
      return !el.hidden;
    })[e.detail.toIndex].innerText;

    _dispatchChangeEvent(this._el, this._inputEl.value);
  }
}

function _onMutation(mutationsList) {
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this._el.dispatchEvent(new CustomEvent('makeup-combobox-mutation', {
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

function _filterSuggestions(value, items) {
  var numChars = value.length;
  var currentValue = value.toLowerCase();
  var matchedItems = nodeListToArray(items).filter(function (el) {
    return el.innerText.trim().substring(0, numChars).toLowerCase() === currentValue;
  });
  var unmatchedItems = nodeListToArray(items).filter(function (el) {
    return el.innerText.trim().substring(0, numChars).toLowerCase() !== currentValue;
  });
  matchedItems.forEach(function (el) {
    return el.hidden = false;
  });
  unmatchedItems.forEach(function (el) {
    return el.hidden = true;
  });
}

function _dispatchChangeEvent(el, value) {
  el.dispatchEvent(new CustomEvent('makeup-combobox-change', {
    detail: {
      value
    }
  }));
}
