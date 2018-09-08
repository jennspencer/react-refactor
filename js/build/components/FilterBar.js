'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterBar = function (_Component) {
  _inherits(FilterBar, _Component);

  function FilterBar(props) {
    _classCallCheck(this, FilterBar);

    var _this = _possibleConstructorReturn(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).call(this, props));

    _this.state = {
      openFilters: false
    };

    _this.handleFilterClick = _this.handleFilterClick.bind(_this);
    return _this;
  }

  _createClass(FilterBar, [{
    key: 'handleFilterClick',
    value: function handleFilterClick() {
      this.setState({ openFilters: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var categoryTitle = void 0,
          categoryType = void 0,
          sortTitle = void 0,
          sortType = void 0;

      if (_constants.LISTING_TYPE !== 'events') {
        categoryTitle = 'Category';
        categoryType = 'categories';
        sortTitle = 'Sort';
        sortType = 'sort';
      } else {
        categoryTitle = 'Location';
        categoryType = 'city';
        sortTitle = 'Date';
        sortType = 'month';
      }

      return _react2.default.createElement(
        'section',
        { className: 'listing-filters' },
        _react2.default.createElement(
          'div',
          {
            className: 'row',
            style: { display: this.state.openFilters ? 'none' : '' }
          },
          _react2.default.createElement(
            'div',
            {
              className: 'col-sm-12 filter-listings',
              onClick: this.handleFilterClick
            },
            _react2.default.createElement(
              'h6',
              null,
              _react2.default.createElement('i', { className: 'fas fa-sliders-h slider' }),
              ' Filter Listings',
              ' ',
              _react2.default.createElement('i', { className: 'icon_menu_expand' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'row hide',
            style: { display: this.state.openFilters ? 'block' : '' }
          },
          _react2.default.createElement(
            'div',
            { className: 'category-filter filter-box col-md-3' },
            _react2.default.createElement(
              'h6',
              null,
              categoryTitle
            ),
            _react2.default.createElement(_Filter2.default, { type: categoryType })
          ),
          _react2.default.createElement(
            'div',
            { className: 'price-filter filter-box col-md-3' },
            _react2.default.createElement(
              'h6',
              null,
              sortTitle
            ),
            _react2.default.createElement(_Filter2.default, { type: sortType })
          ),
          _react2.default.createElement(
            'div',
            { className: 'tag-filter filter-box col-md-6' },
            _react2.default.createElement(
              'h6',
              null,
              'Filters'
            ),
            _react2.default.createElement(_Filter2.default, { type: 'amenities', multi: true, removeSelected: true })
          )
        )
      );
    }
  }]);

  return FilterBar;
}(_react.Component);

FilterBar.propTypes = {
  filterSelect: _propTypes2.default.func
};

FilterBar.defaultProps = {
  filterSelect: function filterSelect(type, value) {}
};

exports.default = FilterBar;