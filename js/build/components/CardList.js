'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _FilterBar = require('./FilterBar');

var _FilterBar2 = _interopRequireDefault(_FilterBar);

var _es6Promise = require('es6-promise');

require('isomorphic-fetch');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactVisibilitySensor = require('react-visibility-sensor');

var _reactVisibilitySensor2 = _interopRequireDefault(_reactVisibilitySensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardList = function (_Component) {
  _inherits(CardList, _Component);

  function CardList(props) {
    _classCallCheck(this, CardList);

    var _this = _possibleConstructorReturn(this, (CardList.__proto__ || Object.getPrototypeOf(CardList)).call(this, props));

    _this.state = {
      allListings: [],
      sortedListings: [],
      listings: [],
      dataRoute: _this.props.themeURL + '/wp-json/visitm/v1/',
      categories: window.location.hash.substring(1) ? window.location.hash.substring(1) : null,
      filterMap: {},
      offset: 24,
      loading: true,
      cities: [],
      months: []
    };

    _this.filterSelect = _this.filterSelect.bind(_this);
    _this.lazyLoad = _this.lazyLoad.bind(_this);
    return _this;
  }

  _createClass(CardList, [{
    key: 'getPage',
    value: function getPage() {
      var _this2 = this;

      this.setState({ loading: true });
      var url = this.state.dataRoute + this.props.listingType;
      var cities = [];
      var months = [];
      fetch(url).catch(function (error) {
        console.error('Error fetching API page', thisPage, error);
      }).then(function (response) {
        if (response.status !== 200 && response.ok) {
          return;
        }
        return response.json();
      }).then(function (data) {
        if (!data) return;
        data = _lodash2.default.filter(data, { excluded: '0' });
        if (_this2.props.listingType === 'events') {
          cities = _lodash2.default.uniqBy(_lodash2.default.map(data, function (listing) {
            return { name: listing.city[0] };
          }), 'name');
          data = _lodash2.default.filter(data, function (listing) {
            if ((0, _moment2.default)(listing.endDate).isSameOrAfter((0, _moment2.default)(), 'day')) return listing;
          });
          data = _lodash2.default.orderBy(data, 'startDate', 'asc');
          months = _lodash2.default.uniqBy(_lodash2.default.map(data, function (listing) {
            return { name: listing.month[0], date: listing.startDate };
          }), 'name');
          months = _lodash2.default.orderBy(months, function (month) {
            return new _moment2.default(month.date);
          }, 'asc');
        } else {
          data = _lodash2.default.shuffle(data);
          data = _lodash2.default.orderBy(data, 'featured', 'desc');
        }
        _this2.setState({
          allListings: data,
          listings: data.slice(0, 24),
          cities: cities,
          months: months,
          sortedListings: data,
          loading: false
        });
      }).then(function () {
        if (_this2.state.filterMap['categories'] === undefined && _this2.state.categories && _this2.state.categories !== '') {
          _this2.filterSelect({ categories: _this2.state.categories });
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getPage();
    }
  }, {
    key: 'lazyLoad',
    value: function lazyLoad(isVisible) {
      if (this.state.sortedListings.length > 24 && isVisible) {
        var newOffset = this.state.offset + 24;
        var nextListings = this.state.sortedListings.slice(this.state.offset, newOffset);
        this.setState({ offset: newOffset, listings: this.state.listings.concat(nextListings) });
      }
    }
  }, {
    key: 'filterSelect',
    value: function filterSelect(filterMap) {
      var _this3 = this;

      this.setState({
        filterMap: filterMap
      }, function () {
        var listings = _this3.state.allListings;
        if (!_lodash2.default.isEmpty(_this3.state.filterMap)) {
          var filters = _this3.state.filterMap;
          // console.log(filters);

          var _loop = function _loop(k) {
            if (filters[k] && filters[k] !== '') {
              if (k !== 'sort') {
                var tags = filters[k].split(',');
                var filteredListings = listings.filter(function (listing) {
                  var hasFilters = listing[k].filter(function (f) {
                    return tags.includes(f);
                  });
                  return hasFilters.length === tags.length ? listing : false;
                });
                listings = filteredListings;
              }
              if (k === 'sort') {
                if (filters[k] === 'desc' || filters[k] === 'asc') {
                  listings = _lodash2.default.orderBy(listings, 'title', [filters[k]]);
                } else if (filters[k] && filters[k] !== '') {
                  listings = _lodash2.default.filter(listings, { price: filters[k] });
                }
              }
            }
          };

          for (var k in filters) {
            _loop(k);
          }
        }
        _this3.setState({
          offset: 24,
          listings: listings.slice(0, 24),
          sortedListings: listings
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var listingData = this.state.listings;
      // console.log(listingData);
      return _react2.default.createElement(
        'div',
        { className: 'listings-page wrapper', style: { paddingBottom: '20px' } },
        _react2.default.createElement('div', { className: 'loading-overlay', style: { display: this.state.loading ? 'block' : 'none' } }),
        _react2.default.createElement(_FilterBar2.default, {
          filterSelect: this.filterSelect,
          listingType: this.props.listingType,
          themeURL: this.props.themeURL,
          categories: this.state.categories,
          cities: this.state.cities,
          months: this.state.months
        }),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'listings' },
            listingData.length ? listingData.map(function (listing, i) {
              return _react2.default.createElement(_Card2.default, { listing: listing, key: i, listingType: _this4.props.listingType });
            }) : null
          ),
          _react2.default.createElement(_reactVisibilitySensor2.default, { onChange: this.lazyLoad, delayedCall: true, partialVisibility: true })
        ),
        listingData.length === 0 ? _react2.default.createElement(
          'div',
          { style: { display: this.state.loading ? 'none' : 'block' }, className: 'no-results' },
          'No results found.'
        ) : null
      );
    }
  }]);

  return CardList;
}(_react.Component);

CardList.propTypes = {
  filterSelect: _propTypes2.default.func
};

CardList.defaultProps = {
  filterSelect: function filterSelect() {}
};

exports.default = CardList;