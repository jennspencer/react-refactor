'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllFilters = fetchAllFilters;
exports.getEventFilters = getEventFilters;

var _actionTypes = require('../actions/actionTypes');

var _ajaxStatusActions = require('./ajaxStatusActions');

var _constants = require('../constants');

var _is_same_month = require('date-fns/is_same_month');

var _is_same_month2 = _interopRequireDefault(_is_same_month);

var _is_future = require('date-fns/is_future');

var _is_future2 = _interopRequireDefault(_is_future);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dataRoute = _constants.THEME_URL + _constants.WP_API;

function fetchAllFilters() {
  return function (dispatch) {
    requestAllCategories(dispatch, _constants.LISTING_TYPE);
    requestAllAmenities(dispatch, _constants.LISTING_TYPE);
    requestAllPrices(dispatch, _constants.LISTING_TYPE);
  };
}

function getEventFilters(listings) {
  var cities = [];
  var months = [];

  listings.forEach(function (listing) {
    months = months.concat(listing.month);
    cities = cities.concat(listing.city);
  });

  // remove duplicates
  months = [].concat(_toConsumableArray(new Set(months)));
  cities = [].concat(_toConsumableArray(new Set(cities)));

  cities.sort();

  // filter out past months
  months = months.filter(function (month) {
    return (0, _is_same_month2.default)(month, new Date()) || (0, _is_future2.default)(month);
  });

  return function (dispatch) {
    dispatch({ type: _actionTypes.ActionTypes.GET_MONTHS_FILTER, data: months.map(mapOptions) });
    dispatch({ type: _actionTypes.ActionTypes.GET_CITIES_FILTER, data: cities.map(mapOptions) });
  };
}

// TODO: these functions are redundant

function requestAllCategories(dispatch, type) {
  dispatch((0, _ajaxStatusActions.beginAjaxCall)(_actionTypes.ActionTypes.REQUEST_CATEGORIES, type));
  var url = dataRoute + type + '-categories?hide_empty=true&per_page=100';
  fetch(url).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }).then(function (options) {
    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_CATEGORIES_SUCCESS,
      data: options.map(mapTags)
    });
  }).catch(function (error) {
    console.error('Error fetching API page', error);
    dispatch((0, _ajaxStatusActions.ajaxCallError)(error));
  });
}

function requestAllAmenities(dispatch, type) {
  dispatch((0, _ajaxStatusActions.beginAjaxCall)(_actionTypes.ActionTypes.REQUEST_AMENITIES, type));
  var url = dataRoute + type + '-amenities?hide_empty=true&per_page=100';
  fetch(url).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }).then(function (options) {
    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_AMENITIES_SUCCESS,
      data: options.map(mapTags)
    });
  }).catch(function (error) {
    console.error('Error fetching API page', error);
    dispatch((0, _ajaxStatusActions.ajaxCallError)(error));
  });
}

function requestAllPrices(dispatch, type) {
  dispatch((0, _ajaxStatusActions.beginAjaxCall)(_actionTypes.ActionTypes.REQUEST_PRICES, type));
  var url = dataRoute + type + '-price?hide_empty=true&per_page=100';

  fetch(url).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }).then(function (options) {
    options = options.map(function (option) {
      var value = option.name.length;
      return {
        value: value,
        label: option.name
      };
    });

    options = [{ value: 'price-asc', label: 'Price Low to High' }, { value: 'price-desc', label: 'Price High to Low' }].concat(options);

    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_PRICES_SUCCESS,
      data: options
    });
  }).catch(function (error) {
    console.error('Error fetching API page', error);
    dispatch((0, _ajaxStatusActions.ajaxCallError)(error));
  });
}

function mapTags(option) {
  return {
    value: option.slug,
    label: option.name.replace('&amp;', '&', option.name)
  };
}

function mapOptions(option) {
  return {
    value: option,
    label: option
  };
}