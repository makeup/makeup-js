"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var defaultOptions = {
  customElementMode: false
};

var _default = /*#__PURE__*/function () {
  function _default(widgetEl, dialog, selectedOptions) {
    _classCallCheck(this, _default);

    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this._el = widgetEl;

    this._el.setAttribute('aria-haspopup', 'dialog');

    this._dialog = dialog;
    this._onClickListener = _onClick.bind(this);
    this._onDialogCloseListener = _onDialogClose.bind(this);
    this._onMutationListener = _onMutation.bind(this);

    this._el.classList.add('dialog-button--js');

    if (!this._options.customElementMode) {
      this._mutationObserver = new MutationObserver(this._onMutationListener);

      this._observeMutations();

      this._observeEvents();
    }
  }

  _createClass(_default, [{
    key: "_observeMutations",
    value: function _observeMutations() {
      if (!this._options.customElementMode) {
        this._mutationObserver.observe(this._el, {
          attributes: true,
          childList: false,
          subtree: false
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
        this._el.addEventListener('click', this._onClickListener);

        this._dialog._el.addEventListener('dialog-close', this._onDialogCloseListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._el.removeEventListener('click');

      this._dialog._el.removeEventListener('dialog-close', this._onDialogCloseListener);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveMutations();

      this._unobserveEvents();

      this._onClickListener = null;
      this._onDialogCloseListener = null;
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
        this._el.dispatchEvent(new CustomEvent('makeup-dialog-button-mutation', {
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

function _onClick() {
  this._dialog.open();
}

function _onDialogClose() {
  if (this._dialog.modal === true) {
    this._el.focus();
  }
}
