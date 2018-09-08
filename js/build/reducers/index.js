'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _listingReducer = require('./listingReducer');

var _listingReducer2 = _interopRequireDefault(_listingReducer);

var _filterReducer = require('./filterReducer');

var _filterReducer2 = _interopRequireDefault(_filterReducer);

var _sortReducer = require('./sortReducer');

var _sortReducer2 = _interopRequireDefault(_sortReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  listings: _listingReducer2.default,
  filters: _filterReducer2.default,
  filterMap: _sortReducer2.default
});

exports.default = rootReducer;