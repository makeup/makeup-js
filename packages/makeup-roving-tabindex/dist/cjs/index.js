'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinear = createLinear;

var NavigationEmitter = _interopRequireWildcard(require("makeup-navigation-emitter"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var defaultOptions = {
  autoReset: null,
  index: 0,
  wrap: false,
  axis: 'both'
};

var nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

function onModelMutation() {
  var modelIndex = this._navigationEmitter.model.index;
  this.filteredItems.forEach(function (el, index) {
    return el.setAttribute('tabindex', index !== modelIndex ? '-1' : '0');
  });
}

function onModelInit(e) {
  var items = e.detail.items;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });

  if (items[e.detail.toIndex]) {
    items[e.detail.toIndex].setAttribute('tabindex', '0');
  }
}

function onModelReset(e) {
  this._index = e.detail.toIndex; // seems unused internally. scheduled for deletion.

  var items = this.filteredItems;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
  items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
  var items = this.filteredItems;
  var fromItem = items[e.detail.fromIndex];
  var toItem = items[e.detail.toIndex];

  if (fromItem) {
    fromItem.setAttribute('tabindex', '-1');
  }

  if (toItem) {
    toItem.setAttribute('tabindex', '0');
    toItem.focus();
  }

  this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', {
    detail: {
      fromIndex: e.detail.fromIndex,
      toIndex: e.detail.toIndex
    }
  }));
}

var RovingTabindex = /*#__PURE__*/function () {
  function RovingTabindex(el) {
    _classCallCheck(this, RovingTabindex);

    this._el = el;
    this._onMutationListener = onModelMutation.bind(this);
    this._onChangeListener = onModelChange.bind(this);
    this._onInitListener = onModelInit.bind(this);
    this._onResetListener = onModelReset.bind(this);

    this._el.addEventListener('navigationModelMutation', this._onMutationListener);

    this._el.addEventListener('navigationModelChange', this._onChangeListener);

    this._el.addEventListener('navigationModelInit', this._onInitListener);

    this._el.addEventListener('navigationModelReset', this._onResetListener);
  }

  _createClass(RovingTabindex, [{
    key: "destroy",
    value: function destroy() {
      this._el.removeEventListener('navigationModelMutation', this._onMutationListener);

      this._el.removeEventListener('navigationModelChange', this._onChangeListener);

      this._el.removeEventListener('navigationModelInit', this._onInitListener);

      this._el.removeEventListener('navigationModelReset', this._onResetListener);
    }
  }]);

  return RovingTabindex;
}();

var LinearRovingTabindex = /*#__PURE__*/function (_RovingTabindex) {
  _inherits(LinearRovingTabindex, _RovingTabindex);

  var _super = _createSuper(LinearRovingTabindex);

  function LinearRovingTabindex(el, itemSelector, selectedOptions) {
    var _this;

    _classCallCheck(this, LinearRovingTabindex);

    _this = _super.call(this, el);
    _this._options = Object.assign({}, defaultOptions, selectedOptions);
    _this._itemSelector = itemSelector;
    _this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
      autoInit: _this._options.index,
      autoReset: _this._options.autoReset,
      wrap: _this._options.wrap,
      axis: _this._options.axis
    });
    return _this;
  }

  _createClass(LinearRovingTabindex, [{
    key: "index",
    get: function get() {
      return this._navigationEmitter.model.index;
    },
    set: function set(newIndex) {
      this._navigationEmitter.model.index = newIndex;
    }
  }, {
    key: "wrap",
    set: function set(newWrap) {
      this._navigationEmitter.model.options.wrap = newWrap;
    }
  }, {
    key: "filteredItems",
    get: function get() {
      return this._navigationEmitter.model.filteredItems;
    }
  }, {
    key: "items",
    get: function get() {
      return this._navigationEmitter.model.items;
    } // backwards compat

  }, {
    key: "_items",
    get: function get() {
      return this.items;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._navigationEmitter.model.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._navigationEmitter.destroy();
    }
  }]);

  return LinearRovingTabindex;
}(RovingTabindex);
/*
class GridRovingTabindex extends RovingTabindex {
    constructor(el, rowSelector, cellSelector, selectedOptions) {
        super(el);
    }
}
*/


function createLinear(el, itemSelector, selectedOptions) {
  return new LinearRovingTabindex(el, itemSelector, selectedOptions);
}
