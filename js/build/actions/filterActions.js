'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventFilters = getEventFilters;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEventFilters(listings) {
  var cities = [];
  var months = [];
  cities = _lodash2.default.uniqBy(listings.map(function (listing) {
    return { name: listing.city[0] };
  }), 'name');

  cities = _lodash2.default.orderBy(cities, name, 'asc');
  months = _lodash2.default.uniqBy(listings.map(function (listing) {
    return { name: listing.month[0], date: listing.startDate };
  }), 'name');
  months = _lodash2.default.orderBy(months, function (month) {
    return new _moment2.default(month.date);
  }, 'asc');
  return function (dispatch) {
    dispatch({ type: _actionTypes.ActionTypes.GET_CITIES_FILTER, data: cities });
    dispatch({ type: _actionTypes.ActionTypes.GET_MONTHS_FILTER, data: months });
  };
}