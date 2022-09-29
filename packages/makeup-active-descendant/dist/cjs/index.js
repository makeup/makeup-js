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

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
  activeDescendantClassName: 'active-descendant',
  autoInit: -1,
  autoReset: -1,
  autoScroll: false,
  axis: 'both',
  ignoreButtons: false,

  /** @type {{[attr: string]: string | boolean}} */
  ignoreByAttrs: {
    hidden: true
  }
};

function onModelMutation() {
  var options = this._options;
  var modelIndex = this._navigationEmitter.model.index;
  this.filteredItems.forEach(function (item, index) {
    (0, _makeupNextId.default)(item);

    if (index !== modelIndex) {
      item.classList.remove(options.activeDescendantClassName);
    } else {
      item.classList.add(options.activeDescendantClassName);
    }
  });
}

function onModelChange(e) {
  var fromItem = this.filteredItems[e.detail.fromIndex];
  var toItem = this.filteredItems[e.detail.toIndex];

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
    detail: {
      fromIndex: e.detail.fromIndex,
      toIndex: e.detail.toIndex
    }
  }));
}

function onModelReset(e) {
  var toIndex = e.detail.toIndex;
  var activeClassName = this._options.activeDescendantClassName;
  this.filteredItems.forEach(function (el) {
    el.classList.remove(activeClassName);
  });

  if (toIndex > -1) {
    var itemEl = this.filteredItems[toIndex];
    itemEl.classList.add(activeClassName);

    this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
  } else {
    this._focusEl.removeAttribute('aria-activedescendant');
  }
}

var ActiveDescendant = /*#__PURE__*/function () {
  function ActiveDescendant(el) {
    _classCallCheck(this, ActiveDescendant);

    this._el = el;
    this._onMutationListener = onModelMutation.bind(this);
    this._onChangeListener = onModelChange.bind(this);
    this._onResetListener = onModelReset.bind(this);

    this._el.addEventListener('navigationModelMutation', this._onMutationListener);

    this._el.addEventListener('navigationModelChange', this._onChangeListener);

    this._el.addEventListener('navigationModelReset', this._onResetListener);
  }

  _createClass(ActiveDescendant, [{
    key: "destroy",
    value: function destroy() {
      this._el.removeEventListener('navigationModelMutation', this._onMutationListener);

      this._el.removeEventListener('navigationModelChange', this._onChangeListener);

      this._el.removeEventListener('navigationModelReset', this._onResetListener);
    }
  }]);

  return ActiveDescendant;
}();

var LinearActiveDescendant = /*#__PURE__*/function (_ActiveDescendant) {
  _inherits(LinearActiveDescendant, _ActiveDescendant);

  var _super = _createSuper(LinearActiveDescendant);

  function LinearActiveDescendant(el, focusEl, containerEl, itemSelector, selectedOptions) {
    var _this;

    _classCallCheck(this, LinearActiveDescendant);

    _this = _super.call(this, el);
    _this._options = Object.assign({}, defaultOptions, selectedOptions);
    _this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
      autoInit: _this._options.autoInit,
      autoReset: _this._options.autoReset,
      axis: _this._options.axis,
      ignoreButtons: _this._options.ignoreButtons,
      ignoreByAttrs: _this._options.ignoreByAttrs
    });
    _this._focusEl = focusEl;
    _this._containerEl = containerEl;
    _this._itemSelector = itemSelector; // ensure container has an id

    (0, _makeupNextId.default)(containerEl); // if DOM hierarchy cannot be determined,
    // focus element must programatically 'own' the container of descendant items

    if (containerEl !== focusEl) {
      focusEl.setAttribute('aria-owns', containerEl.id);
    } // ensure each item has an id


    _this.items.forEach(function (itemEl) {
      (0, _makeupNextId.default)(itemEl);
    });

    if (_this._options.autoInit > -1) {
      var itemEl = _this.filteredItems[_this._options.autoInit];
      itemEl.classList.add(_this._options.activeDescendantClassName);

      _this._focusEl.setAttribute('aria-activedescendant', itemEl.id);
    }

    return _this;
  }

  _createClass(LinearActiveDescendant, [{
    key: "index",
    get: function get() {
      return this._navigationEmitter.model.index;
    },
    set: function set(newIndex) {
      this._navigationEmitter.model.index = newIndex;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._navigationEmitter.model.reset();
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
    key: "wrap",
    set: function set(newWrap) {
      this._navigationEmitter.model.options.wrap = newWrap;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(LinearActiveDescendant.prototype), "destroy", this).call(this);

      this._navigationEmitter.destroy();
    }
  }]);

  return LinearActiveDescendant;
}(ActiveDescendant);
/*
class GridActiveDescendant extends ActiveDescendant {
    constructor(el, focusEl, containerEl, rowSelector, cellSelector) {
        super(el);
    }
}
*/


function createLinear(el, focusEl, containerEl, itemSelector, selectedOptions) {
  return new LinearActiveDescendant(el, focusEl, containerEl, itemSelector, selectedOptions);
}
