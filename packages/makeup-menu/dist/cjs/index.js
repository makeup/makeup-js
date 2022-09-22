"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var RovingTabIndex = _interopRequireWildcard(require("makeup-roving-tabindex"));

var PreventScrollKeys = _interopRequireWildcard(require("makeup-prevent-scroll-keys"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var defaultOptions = {
  customElementMode: false
};

var _default = /*#__PURE__*/function () {
  function _default(widgetEl, selectedOptions) {
    _classCallCheck(this, _default);

    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = widgetEl;
    this._rovingTabIndex = RovingTabIndex.createLinear(this.el, '[role^=menuitem]', {
      autoReset: 0,
      ignoreByAttrs: {
        hidden: true,
        'aria-disabled': 'true',
        disabled: true
      }
    });
    PreventScrollKeys.add(this.el);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onClickListener = _onClick.bind(this);
    this._onMutationListener = _onMutation.bind(this);
    this.el.classList.add('menu--js');

    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);

      this._observeMutations();

      this._observeEvents();
    }
  }

  _createClass(_default, [{
    key: "select",
    value: function select(index) {
      if (index !== undefined) {
        this._unobserveMutations();

        var el = this.filteredItems[index];

        switch (el.getAttribute('role')) {
          case 'menuitemcheckbox':
            _selectMenuItemCheckbox(this.el, el);

            break;

          case 'menuitemradio':
            _selectMenuItemRadio(this.el, el);

            break;

          default:
            _selectMenuItem(this.el, el);

            break;
        }

        this._observeMutations();
      }
    }
  }, {
    key: "filteredItems",
    get: function get() {
      return this._rovingTabIndex.filteredItems;
    }
  }, {
    key: "radioGroupNames",
    get: function get() {
      var els = _toConsumableArray(this.el.querySelectorAll('[role=menuitemradio][data-makeup-group]'));

      var groupNames = _toConsumableArray(new Set(els.map(function (el) {
        return el.dataset.makeupGroup;
      })));

      return groupNames;
    }
  }, {
    key: "checkboxGroupNames",
    get: function get() {
      var els = _toConsumableArray(this.el.querySelectorAll('[role=menuitemcheckbox][data-makeup-group]'));

      var groupNames = _toConsumableArray(new Set(els.map(function (el) {
        return el.dataset.makeupGroup;
      })));

      return groupNames;
    }
  }, {
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this.el, {
          attributeFilter: ['aria-checked', 'aria-disabled'],
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
        this.el.addEventListener('keydown', this._onKeyDownListener);
        this.el.addEventListener('click', this._onClickListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this.el.removeEventListener('keydown', this._onKeyDownListener);
      this.el.removeEventListener('click', this._onClickListener);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveMutations();

      this._unobserveEvents();

      this._onKeyDownListener = null;
      this._onClickListener = null;
      this._onMutationListener = null;
    }
  }]);

  return _default;
}();

exports.default = _default;

function _onMutation(mutationsList) {
  var _iterator = _createForOfIteratorHelper(mutationsList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mutation = _step.value;

      if (mutation.type === 'attributes') {
        this.el.dispatchEvent(new CustomEvent('makeup-menu-mutation', {
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

function _onKeyDown(e) {
  this._unobserveMutations();

  if (e.keyCode === 13) {
    e.preventDefault();
  }

  if (e.keyCode === 13 || e.keyCode === 32) {
    this.select(_getElementIndex(e.target));
  }

  this._observeMutations();
}

function _onClick(e) {
  this.select(_getElementIndex(e.target));
}

function _getElementIndex(el) {
  return el.closest('[role^=menuitem]').dataset.makeupIndex;
}

function _selectMenuItem(widgetEl, menuItemEl) {
  widgetEl.dispatchEvent(new CustomEvent('makeup-menu-select', {
    detail: {
      el: menuItemEl,
      value: menuItemEl.innerText
    }
  }));
}

function _selectMenuItemCheckbox(widgetEl, menuItemEl) {
  var groupName = menuItemEl.dataset.makeupGroup;
  menuItemEl.setAttribute('aria-checked', menuItemEl.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
  widgetEl.dispatchEvent(new CustomEvent('makeup-menu-change', {
    detail: {
      el: menuItemEl,
      checked: menuItemEl.getAttribute('aria-checked'),
      group: groupName,
      value: menuItemEl.innerText
    }
  }));
}

function _selectMenuItemRadio(widgetEl, menuItemEl) {
  var groupName = menuItemEl.dataset.makeupGroup;
  var checkedEl = widgetEl.querySelector("[data-makeup-group=".concat(groupName, "][aria-checked=true]"));

  if (checkedEl) {
    checkedEl.setAttribute('aria-checked', 'false');
  }

  if (checkedEl !== menuItemEl) {
    menuItemEl.setAttribute('aria-checked', 'true');
    widgetEl.dispatchEvent(new CustomEvent('makeup-menu-change', {
      detail: {
        el: menuItemEl,
        group: groupName,
        value: menuItemEl.innerText
      }
    }));
  }
}
