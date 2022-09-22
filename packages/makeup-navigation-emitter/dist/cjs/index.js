"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinear = createLinear;

var KeyEmitter = _interopRequireWildcard(require("makeup-key-emitter"));

var ExitEmitter = _interopRequireWildcard(require("makeup-exit-emitter"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataSetKey = 'data-makeup-index'; // todo: autoInit: -1, autoReset: -1 are used for activeDescendant behaviour. These values can be abstracted away with
// a new "type" option (roving or active)

var defaultOptions = {
  axis: 'both',
  autoInit: 0,
  autoReset: null,
  ignoreButtons: false,
  wrap: false,

  /** @type {{[attr: string]: unknown}} */
  ignoreByAttrs: {
    hidden: true
  }
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

  if (this.index >= this.items.length) {
    // do not use index setter, it will trigger change event
    this._index = this.options.autoReset || this.options.autoInit;
  }

  this._el.dispatchEvent(new CustomEvent('navigationModelMutation'));
}

var NavigationModel = /*#__PURE__*/_createClass(
/**
 * @param {HTMLElement} el
 * @param {string} itemSelector
 * @param {typeof defaultOptions} selectedOptions
 */
function NavigationModel(el, itemSelector, selectedOptions) {
  _classCallCheck(this, NavigationModel);

  /** @member {typeof defaultOptions} */
  this.options = Object.assign({}, defaultOptions, selectedOptions);
  /** @member {HTMLElement} */

  this._el = el;
  /** @member {string} */

  this._itemSelector = itemSelector;
});

var LinearNavigationModel = /*#__PURE__*/function (_NavigationModel) {
  _inherits(LinearNavigationModel, _NavigationModel);

  var _super = _createSuper(LinearNavigationModel);

  /**
   * @param {HTMLElement} el
   * @param {string} itemSelector
   * @param {typeof defaultOptions} selectedOptions
   */
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
    key: "shouldIgnore",
    value: function shouldIgnore(el) {
      return !Object.entries(this.options.ignoreByAttrs).some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            attr = _ref2[0],
            value = _ref2[1];

        return el.getAttribute(attr) === value;
      });
    }
  }, {
    key: "items",
    get: function get() {
      return this._el.querySelectorAll(this._itemSelector);
    }
  }, {
    key: "filteredItems",
    get: function get() {
      var _this2 = this;

      return _toConsumableArray(this.items).filter(function (el) {
        return _this2.shouldIgnore(el);
      });
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
  /**
   * @param {HTMLElement} el
   * @param {LinearNavigationModel} model
   */
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
      attributeFilter: Object.keys(model.options.ignoreByAttrs),
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
  }]);

  return NavigationEmitter;
}();

function createLinear(el, itemSelector, selectedOptions) {
  var model = new LinearNavigationModel(el, itemSelector, selectedOptions);
  return new NavigationEmitter(el, model);
}
/*
static createGrid(el, rowSelector, colSelector, selectedOptions) {
    return null;
}
*/
