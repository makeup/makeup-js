'use strict'; // requires NodeList.forEach polyfill for IE
// conditional check due to https://github.com/imagitama/nodelist-foreach-polyfill/issues/7

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof Element !== 'undefined') {
  require('nodelist-foreach-polyfill');
} // requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent


var CustomEvent = require('custom-event');

var KeyEmitter = require('makeup-key-emitter');

var ExitEmitter = require('makeup-exit-emitter');

var dataSetKey = 'data-makeup-index';
var defaultOptions = {
  axis: 'both',
  autoInit: 0,
  autoReset: null,
  ignoreButtons: false,
  wrap: false
};

var itemFilter = function itemFilter(el) {
  return !el.hidden;
};

function clearData(els) {
  els.forEach(function (el) {
    return el.removeAttribute(dataSetKey);
  });
}

function setData(els) {
  els.forEach(function (el, index) {
    return el.setAttribute(dataSetKey, index);
  });
}

function isButton(el) {
  return el.tagName.toLowerCase() === 'button' || el.type === 'button';
}

function onKeyPrev(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    if (!this.atStart()) {
      this.index--;
    } else if (this.options.wrap) {
      this.index = this.filteredItems.length - 1;
    }
  }
}

function onKeyNext(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    if (!this.atEnd()) {
      this.index++;
    } else if (this.options.wrap) {
      this.index = 0;
    }
  }
}

function onClick(e) {
  var element = e.target;
  var indexData = element.dataset.makeupIndex; // traverse widget ancestors until interactive element is found

  while (element !== this._el && !indexData) {
    element = element.parentNode;
    indexData = element.dataset.makeupIndex;
  }

  if (indexData !== undefined) {
    this.index = indexData;
  }
}

function onKeyHome(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    this.index = 0;
  }
}

function onKeyEnd(e) {
  if (isButton(e.detail.target) === false || this.options.ignoreButtons === false) {
    this.index = this.filteredItems.length;
  }
}

function onFocusExit() {
  if (this.options.autoReset !== null) {
    this.reset();
  }
}

function onMutation() {
  // clear data-makeup-index on ALL items
  clearData(this.items); // set data-makeup-index only on filtered items (e.g. non-hidden ones)

  setData(this.filteredItems);

  this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

var NavigationModel = function NavigationModel(el, itemSelector, selectedOptions) {
  _classCallCheck(this, NavigationModel);

  this.options = _extends({}, defaultOptions, selectedOptions);
  this._el = el;
  this._itemSelector = itemSelector;
};

var LinearNavigationModel = /*#__PURE__*/function (_NavigationModel) {
  _inherits(LinearNavigationModel, _NavigationModel);

  var _super = _createSuper(LinearNavigationModel);

  function LinearNavigationModel(el, itemSelector, selectedOptions) {
    var _this;

    _classCallCheck(this, LinearNavigationModel);

    _this = _super.call(this, el, itemSelector, selectedOptions);

    if (_this.options.autoInit !== null) {
      _this._index = _this.options.autoInit;

      _this._el.dispatchEvent(new CustomEvent('navigationModelInit', {
        detail: {
          items: _this.filteredItems,
          toIndex: _this.options.autoInit
        },
        bubbles: false
      }));
    }

    return _this;
  }

  _createClass(LinearNavigationModel, [{
    key: "items",
    get: function get() {
      return this._el.querySelectorAll(this._itemSelector);
    }
  }, {
    key: "filteredItems",
    get: function get() {
      return Array.prototype.slice.call(this.items).filter(itemFilter);
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    },
    set: function set(newIndex) {
      if (newIndex > -1 && newIndex < this.filteredItems.length && newIndex !== this.index) {
        this._el.dispatchEvent(new CustomEvent('navigationModelChange', {
          detail: {
            fromIndex: this.index,
            toIndex: newIndex
          },
          bubbles: false
        }));

        this._index = newIndex;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options.autoReset !== null) {
        this._index = this.options.autoReset; // do not use index setter, it will trigger change event

        this._el.dispatchEvent(new CustomEvent('navigationModelReset', {
          detail: {
            toIndex: this.options.autoReset
          },
          bubbles: false
        }));
      }
    }
  }, {
    key: "atEnd",
    value: function atEnd() {
      return this.index === this.filteredItems.length - 1;
    }
  }, {
    key: "atStart",
    value: function atStart() {
      return this.index <= 0;
    }
  }]);

  return LinearNavigationModel;
}(NavigationModel); // 2D Grid Model will go here

/*
class GridModel extends NavigationModel {
    constructor(el, rowSelector, colSelector) {
        super();
        this._coords = null;
    }
}
*/


var NavigationEmitter = /*#__PURE__*/function () {
  function NavigationEmitter(el, model) {
    _classCallCheck(this, NavigationEmitter);

    this.model = model;
    this.el = el;
    this._keyPrevListener = onKeyPrev.bind(model);
    this._keyNextListener = onKeyNext.bind(model);
    this._keyHomeListener = onKeyHome.bind(model);
    this._keyEndListener = onKeyEnd.bind(model);
    this._clickListener = onClick.bind(model);
    this._focusExitListener = onFocusExit.bind(model);
    this._observer = new MutationObserver(onMutation.bind(model));
    setData(model.filteredItems);
    KeyEmitter.addKeyDown(this.el);
    ExitEmitter.addFocusExit(this.el);
    var axis = model.options.axis;

    if (axis === 'both' || axis === 'x') {
      this.el.addEventListener('arrowLeftKeyDown', this._keyPrevListener);
      this.el.addEventListener('arrowRightKeyDown', this._keyNextListener);
    }

    if (axis === 'both' || axis === 'y') {
      this.el.addEventListener('arrowUpKeyDown', this._keyPrevListener);
      this.el.addEventListener('arrowDownKeyDown', this._keyNextListener);
    }

    this.el.addEventListener('homeKeyDown', this._keyHomeListener);
    this.el.addEventListener('endKeyDown', this._keyEndListener);
    this.el.addEventListener('click', this._clickListener);
    this.el.addEventListener('focusExit', this._focusExitListener);

    this._observer.observe(this.el, {
      childList: true,
      subtree: true,
      attributeFilter: ['hidden'],
      attributes: true
    });
  }

  _createClass(NavigationEmitter, [{
    key: "destroy",
    value: function destroy() {
      KeyEmitter.removeKeyDown(this.el);
      ExitEmitter.removeFocusExit(this.el);
      this.el.removeEventListener('arrowLeftKeyDown', this._keyPrevListener);
      this.el.removeEventListener('arrowRightKeyDown', this._keyNextListener);
      this.el.removeEventListener('arrowUpKeyDown', this._keyPrevListener);
      this.el.removeEventListener('arrowDownKeyDown', this._keyNextListener);
      this.el.removeEventListener('homeKeyDown', this._keyHomeListener);
      this.el.removeEventListener('endKeyDown', this._keyEndListener);
      this.el.removeEventListener('click', this._clickListener);
      this.el.removeEventListener('focusExit', this._focusExitListener);

      this._observer.disconnect();
    }
  }], [{
    key: "createLinear",
    value: function createLinear(el, itemSelector, selectedOptions) {
      var model = new LinearNavigationModel(el, itemSelector, selectedOptions);
      return new NavigationEmitter(el, model);
    }
    /*
    static createGrid(el, rowSelector, colSelector, selectedOptions) {
        return null;
    }
    */

  }]);

  return NavigationEmitter;
}();

module.exports = NavigationEmitter;
