'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllListings = fetchAllListings;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('../constants');

var _filterActions = require('./filterActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataRoute = _constants.THEME_URL + _constants.CUSTOM_API;

function fetchAllListings() {
  return function (dispatch) {
    requestAllListings(dispatch, _constants.LISTING_TYPE);
  };
}

function requestAllListings(dispatch) {
  dispatch({ type: _actionTypes.ActionTypes.REQUEST_ALL_LISTINGS, data: _constants.LISTING_TYPE });

  var url = dataRoute + _constants.LISTING_TYPE;
  fetch(url).catch(function (error) {
    console.error('Error fetching API page', error);
  }).then(function (response) {
    if (response.status !== 200 && response.ok) {
      return;
    }
    return response.json();
  }).then(function (data) {
    if (!data) return;

    // filter out excluded listings
    data = _lodash2.default.filter(data, { excluded: '0' });
    //normalize listing data for display
    data = normalizeListings(data);

    if (_constants.LISTING_TYPE === 'events') {
      data = _lodash2.default.orderBy(data, 'startDate', 'asc');
      // send data off to get event-specific filters
      dispatch((0, _filterActions.getEventFilters)(data));
    } else {
      data = _lodash2.default.shuffle(data);
      data = _lodash2.default.orderBy(data, 'featured', 'desc');
    }

    dispatch({ type: _actionTypes.ActionTypes.RECEIVED_ALL_LISTINGS_SUCCESS, data: data });
  });
}

function normalizeListings(listings) {
  var postType = _constants.LISTING_TYPE;
  var placeType = 'Place';

  switch (postType) {
    case 'dine':
      placeType = 'FoodEstablishment';
      break;
    case 'sip':
      placeType = 'FoodEstablishment';
      break;
    case 'stay':
      placeType = 'LodgingBusiness';
      break;
    case 'activities':
      placeType = 'LocalBusiness';
      break;
    default:
      placeType = 'Place';
  }

  var normalizedListings = listings.slice();

  normalizedListings.map(function (listing) {
    listing.placeType = placeType;
    listing.listingAddress = 'https://www.google.com/maps/search/?api=1&query=' + listing.address1 + ' ' + listing.city + ' OR ' + (listing.zipcode ? listing.zipcode : '');

    // add 'cities' key to make filtering more sane
    listing.cities = listing.city;

    if (listing.startDate) {
      listing.startDate = (0, _moment2.default)(listing.startDate.toString()).format('dddd, MMMM D, YYYY');
      listing.overlayStartDate = (0, _moment2.default)(listing.startDate.toString()).format('MMM DD');
    }

    if (listing.endDate) {
      listing.endDate = (0, _moment2.default)(listing.endDate.toString()).format('dddd, MMMM D, YYYY');
      listing.overlayEndDate = (0, _moment2.default)(listing.endDate.toString()).format('MMM DD');
    }

    listing.niceDate = listing.startDate === listing.endDate ? listing.startDate : listing.startDate + ' - ' + listing.endDate;

    listing.overlayDate = listing.startDate === listing.endDate ? listing.overlayStartDate : listing.overlayStartDate + ' - ' + listing.overlayEndDate;

    var description = listing.description.split(' ');
    listing.longDesc = false;
    if (description.length > _constants.LISTING_DESC_LENGTH) {
      description = description.slice(0, _constants.LISTING_DESC_LENGTH);
      description = description.join(' ');
      listing.description = description + ' ...';
      listing.longDesc = true;
    } else {
      listing.description = description.join(' ');
    }

    if (listing.endDate && (0, _moment2.default)(listing.endDate).isSameOrAfter((0, _moment2.default)(), 'day')) {
      return listing;
    }
  });

  return normalizedListings;
}