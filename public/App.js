"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
var productCategories = [{
  id: 1,
  name: 'Shirts'
}, {
  id: 2,
  name: 'Jeans'
}, {
  id: 3,
  name: 'Jackets'
}, {
  id: 4,
  name: 'Sweaters'
}, {
  id: 5,
  name: 'Accessories'
}];
var NO_DATA = 'No Data Available';

var ProductTableRow = function ProductTableRow(_ref) {
  var product = _ref.product;
  var name = product.name,
      price = product.price,
      category = product.category,
      imageUrl = product.imageUrl;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, name || NO_DATA), /*#__PURE__*/React.createElement("td", null, price ? "".concat(price) : NO_DATA), /*#__PURE__*/React.createElement("td", null, category), /*#__PURE__*/React.createElement("td", null, imageUrl ? /*#__PURE__*/React.createElement("a", {
    href: imageUrl,
    target: "_blank"
  }, "View") : NO_DATA));
};

var ProductTable = function ProductTable(_ref2) {
  var headings = _ref2.headings,
      products = _ref2.products;
  return /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headings.map(function (heading, index) {
    return /*#__PURE__*/React.createElement("th", {
      key: index
    }, heading);
  }))), /*#__PURE__*/React.createElement("tbody", null, products.length > 0 ? products.map(function (product) {
    return /*#__PURE__*/React.createElement(ProductTableRow, {
      key: product.id,
      product: product
    });
  }) : /*#__PURE__*/React.createElement("tr", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, "No Products added yet"))));
};

var ProductAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductAdd, _React$Component);

  var _super = _createSuper(ProductAdd);

  function ProductAdd() {
    var _this;

    _classCallCheck(this, ProductAdd);

    _this = _super.call(this);
    _this.state = {
      price: '$'
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handlePriceChange = _this.handlePriceChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ProductAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var _document$forms$addPr = document.forms.addProduct,
          name = _document$forms$addPr.name,
          price = _document$forms$addPr.price,
          category = _document$forms$addPr.category,
          imageUrl = _document$forms$addPr.imageUrl;
      var priceWithoutDollar = price.value.substring(1); // Getting value without '$'

      var product = {
        name: name.value,
        price: parseFloat(priceWithoutDollar),
        category: category.value,
        imageUrl: imageUrl.value
      };
      this.props.addProduct(product);
      name.value = '';
      category.value = 'Shirts';
      imageUrl.value = '';
      this.setState({
        price: '$'
      });
    }
  }, {
    key: "handlePriceChange",
    value: function handlePriceChange(event) {
      var priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'

      this.setState({
        price: "$".concat(priceWithoutDollar)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "addProduct",
        onSubmit: this.handleSubmit,
        className: "add-product-form"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "category"
      }, "Category"), /*#__PURE__*/React.createElement("select", {
        name: "category"
      }, productCategories.map(function (_ref3) {
        var id = _ref3.id,
            name = _ref3.name;
        return /*#__PURE__*/React.createElement("option", {
          id: id,
          value: name
        }, name);
      }))), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "price"
      }, "Price Per Unit"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "price",
        value: this.state.price,
        onChange: this.handlePriceChange
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "name"
      }, "Product Name"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name"
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-element-container"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "imageUrl"
      }, "Image URL"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "imageUrl"
      })), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "submit-button submit-button-dark"
      }, "Add Product"));
    }
  }]);

  return ProductAdd;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}
/**
 * Entry Point of our Application. Renders the whole page from here.
 */


function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        response,
        result,
        error,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _context3.prev = 1;
            _context3.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return response.json();

          case 7:
            result = _context3.sent;

            if (result.errors) {
              error = result.errors[0];
              alert('Error while quering for data - ', error);
            }

            return _context3.abrupt("return", result.data);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            alert("Error in sending data to server: ".concat(_context3.t0.message));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var ProductList = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProductList, _React$Component2);

  var _super2 = _createSuper(ProductList);

  function ProductList() {
    var _this2;

    _classCallCheck(this, ProductList);

    _this2 = _super2.call(this);
    _this2.state = {
      products: []
    };
    _this2.addProduct = _this2.addProduct.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(ProductList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            query {\n                productList {\n                    id\n                    name\n                    category\n                    price\n                    imageUrl\n                }\n            }\n        ";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    products: data.productList
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n            mutation addProduct($product: ProductInputs!) {\n                addProduct(product: $product) {\n                    id\n                }\n            }\n        ";
                _context2.next = 3;
                return graphQLFetch(query, {
                  product: product
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addProduct(_x2) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "root-container"
      }, /*#__PURE__*/React.createElement("h2", null, "My Company Inventory"), /*#__PURE__*/React.createElement("div", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
        headings: productTableHeadings,
        products: this.state.products
      }), /*#__PURE__*/React.createElement("div", null, "Add a new Product"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
        addProduct: this.addProduct
      })));
    }
  }]);

  return ProductList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));