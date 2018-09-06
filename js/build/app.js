'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _listingActions = require('./actions/listingActions');

var _CardList = require('./components/CardList');

var _CardList2 = _interopRequireDefault(_CardList);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)();

store.dispatch((0, _listingActions.fetchAllListings)(_constants.listingType));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_CardList2.default, { listingType: _constants.listingType, themeURL: _constants.themeURL })
), document.getElementById('app'));