'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _CardList = require('./components/CardList');

var _CardList2 = _interopRequireDefault(_CardList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reactOptions = window.reactOptions;

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _configureStore2.default },
  _react2.default.createElement(_CardList2.default, {
    listingType: reactOptions.listingType,
    themeURL: reactOptions.themeURL
  })
), document.getElementById('app'));