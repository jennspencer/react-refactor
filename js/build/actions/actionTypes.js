'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypes = undefined;

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionTypes = exports.ActionTypes = (0, _keymirror2.default)({
  // ajax calls
  REQUEST_ALL_LISTINGS: null,
  REQUEST_CATEGORIES: null,
  REQUEST_AMENITIES: null,
  REQUEST_PRICES: null,

  RECEIVED_ALL_LISTINGS_SUCCESS: null,
  RECEIVED_CATEGORIES_SUCCESS: null,
  RECEIVED_AMENITIES_SUCCESS: null,
  RECEIVED_PRICES_SUCCESS: null,

  AJAX_CALL_ERROR: null,

  // filter actions
  GET_MONTHS_FILTER: null,
  GET_CITIES_FILTER: null,
  ADD_TO_FILTERMAP: null,

  CREATE_FILTERMAP_FROM_URL: null
});