'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _listingReducer = require('./listingReducer');

var _listingReducer2 = _interopRequireDefault(_listingReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  listings: _listingReducer2.default
});

exports.default = rootReducer;