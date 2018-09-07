'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllFilters = fetchAllFilters;
exports.getEventFilters = getEventFilters;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    dispatch({ type: _actionTypes.ActionTypes.GET_MONTHS_FILTER, data: months.map(mapOptions) });
    dispatch({ type: _actionTypes.ActionTypes.GET_CITIES_FILTER, data: cities.map(mapOptions) });
  };
}

// TODO: these functions are redundant

function requestAllCategories(dispatch, type) {
  dispatch({ type: _actionTypes.ActionTypes.REQUEST_CATEGORIES, data: type });
  var url = dataRoute + type + '-categories?hide_empty=true&per_page=100';
  fetch(url).catch(function (error) {
    console.error('Error fetching API page', error);
  }).then(function (response) {
    if (response.status !== 200) {
      return;
    }
    return response.json();
  }).then(function (options) {
    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_CATEGORIES_SUCCESS,
      data: options.map(mapTags)
    });
  });
}

function requestAllAmenities(dispatch, type) {
  dispatch({ type: _actionTypes.ActionTypes.REQUEST_AMENITIES, data: type });
  var url = dataRoute + type + '-amenities?hide_empty=true&per_page=100';
  fetch(url).catch(function (error) {
    console.error('Error fetching API page', error);
  }).then(function (response) {
    if (response.status !== 200) {
      return;
    }
    return response.json();
  }).then(function (options) {
    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_AMENITIES_SUCCESS,
      data: options.map(mapTags)
    });
  });
}

function requestAllPrices(dispatch, type) {
  dispatch({ type: _actionTypes.ActionTypes.REQUEST_PRICES, data: type });
  var url = dataRoute + type + '-price?hide_empty=true&per_page=100';

  fetch(url).catch(function (error) {
    console.error('Error fetching API page', error);
  }).then(function (response) {
    if (response.status !== 200) {
      return;
    }
    return response.json();
  }).then(function (options) {
    dispatch({
      type: _actionTypes.ActionTypes.RECEIVED_PRICES_SUCCESS,
      data: options.map(mapOptions)
    });
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
    value: option.name,
    label: option.name
  };
}