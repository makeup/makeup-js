"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dialog = require('makeup-dialog');

var defaultOptions = {
  customElementMode: false,
  selectors: {
    alert: 'lightbox-dialog--alert',
    confirm: 'lightbox-dialog--confirm',
    filter: 'panel-dialog--filter',
    input: 'lightbox-dialog--input',
    lightbox: 'lightbox-dialog',
    panel: 'panel-dialog',
    snackbar: 'snackbar-dialog',
    sort: 'panel-dialog--sort',
    toast: 'toast-dialog'
  }
};

module.exports = /*#__PURE__*/function () {
  function _class(widgetEl, selectedOptions) {
    _classCallCheck(this, _class);

    this._options = _extends({}, defaultOptions, selectedOptions);
    this._el = widgetEl;
    var dialogId = this._el.dataset.makeupFor;
    var dialogEl = document.getElementById(dialogId);
    var dialogClassList = dialogEl.classList;

    this._el.setAttribute('aria-haspopup', 'dialog'); // todo: refactor this block


    if (dialogClassList.contains(this._options.selectors.confirm)) {
      this._dialog = new Dialog.Confirm(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.alert)) {
      this._dialog = new Dialog.Alert(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.input)) {
      this._dialog = new Dialog.Input(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.sort)) {
      this._dialog = new Dialog.Sort(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.filter)) {
      this._dialog = new Dialog.Filter(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.snackbar)) {
      this._dialog = new Dialog.Snackbar(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.toast)) {
      this._dialog = new Dialog.Toast(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.panel)) {
      this._dialog = new Dialog.Panel(dialogEl);
    } else if (dialogClassList.contains(this._options.selectors.lightbox)) {
      this._dialog = new Dialog.Lightbox(dialogEl);
    }

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

  _createClass(_class, [{
    key: "dialog",
    get: function get() {
      return this._dialog;
    }
  }, {
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

        this.dialog._el.addEventListener('dialog-close', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-done', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-submit', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-cancel', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-confirm', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-reject', this._onDialogCloseListener);

        this.dialog._el.addEventListener('dialog-acknowledge', this._onDialogCloseListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._el.removeEventListener('click');

      this.dialog._el.removeEventListener('dialog-close', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-done', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-submit', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-cancel', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-confirm', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-reject', this._onDialogCloseListener);

      this.dialog._el.removeEventListener('dialog-acknowledge', this._onDialogCloseListener);
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

  return _class;
}();

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
  this.dialog.open();
}

function _onDialogClose() {
  if (this.dialog.modal) {
    this._el.focus();
  }
}
