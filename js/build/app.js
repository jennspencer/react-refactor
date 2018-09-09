'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _listingActions = require('./actions/listingActions');

var _filterActions = require('./actions/filterActions');

var _sortActions = require('./actions/sortActions');

var _CardList = require('./components/CardList');

var _CardList2 = _interopRequireDefault(_CardList);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parsed = _queryString2.default.parse(location.search);
var store = (0, _configureStore2.default)();

store.dispatch((0, _listingActions.fetchAllListings)());
store.dispatch((0, _filterActions.fetchAllFilters)());
store.dispatch((0, _sortActions.getFilterMapFromQueryString)(parsed));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_CardList2.default, null)
), document.getElementById('app'));