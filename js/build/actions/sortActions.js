'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToFilterMap = addToFilterMap;
exports.getFilterMapFromQueryString = getFilterMapFromQueryString;
exports.filterListings = filterListings;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addToFilterMap(filter) {
  return function (dispatch) {
    dispatch({ type: _actionTypes.ActionTypes.ADD_TO_FILTERMAP, data: filter });
  };
}

function getFilterMapFromQueryString(queryString) {
  return function (dispatch) {
    dispatch({ type: _actionTypes.ActionTypes.CREATE_FILTERMAP_FROM_URL, data: queryString });
  };
}

function filterListings(listings, filterMap) {
  var _loop = function _loop(k) {
    if (filterMap[k] && filterMap[k] !== '') {
      // filter by categories, amenities, city, month
      if (k !== 'sort') {
        var tags = filterMap[k].split(',');
        var filteredListings = listings.filter(function (listing) {
          // check if listing has all the selected 'tags'
          var hasFilters = listing[k].filter(function (f) {
            return tags.includes(f);
          });
          return hasFilters.length === tags.length ? listing : false;
        });
        listings = filteredListings;
      }
      // sort A-Z, sort by price, filter by price
      if (k === 'sort') {
        if (filterMap[k].length > 1) {
          var sorting = filterMap[k].split('-');
          listings = _lodash2.default.orderBy(listings, sorting[0], sorting[1]);
        } else {
          listings = _lodash2.default.filter(listings, { price: filterMap[k] });
        }
      }
    }
  };

  for (var k in filterMap) {
    _loop(k);
  }
  return listings;
}