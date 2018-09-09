'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllListings = fetchAllListings;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is_future = require('date-fns/is_future');

var _is_future2 = _interopRequireDefault(_is_future);

var _is_equal = require('date-fns/is_equal');

var _is_equal2 = _interopRequireDefault(_is_equal);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

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
      data = _lodash2.default.orderBy(data, function (listing) {
        return new Date(listing.startDate);
      }, 'asc');
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
  var placeType = 'Place';

  switch (_constants.LISTING_TYPE) {
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

  return listings.map(function (listing) {
    // add approprate placeType for schema.org metadata
    listing.placeType = placeType;

    // format address for google maps link
    // TODO: add check for lat/long
    listing.listingAddress = 'https://www.google.com/maps/search/?api=1&query=' + listing.address1 + ' ' + listing.city + ' OR ' + (listing.zipcode ? listing.zipcode : '');

    // format price for sorting by price
    if (listing.price) {
      listing.priceDisplay = listing.price;
      listing.price = listing.price.length;
    }

    // format event dates for display
    if (_constants.LISTING_TYPE === 'events') {
      if (listing.startDate) {
        listing.startDate = (0, _format2.default)(listing.startDate, 'dddd, MMMM D, YYYY');
        listing.overlayStartDate = (0, _format2.default)(listing.startDate, 'MMM DD');
      }

      if (listing.endDate) {
        listing.endDate = (0, _format2.default)(listing.endDate, 'dddd, MMMM D, YYYY');
        listing.overlayEndDate = (0, _format2.default)(listing.endDate, 'MMM DD');
      }

      listing.niceDate = listing.startDate === listing.endDate ? listing.startDate : listing.startDate + ' - ' + listing.endDate;

      listing.overlayDate = listing.startDate === listing.endDate ? listing.overlayStartDate : listing.overlayStartDate + ' - ' + listing.overlayEndDate;
    }

    // format description if longer than LISTING_DESC_LENGTH num of words
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

    return listing;
  }).filter(function (listing) {
    // return if no end date exists (not an event)
    if (!listing.endDate) return true;
    // return if end date exists and is today or in the future
    return listing.endDate && ((0, _is_equal2.default)((0, _format2.default)(new Date(), 'dddd, MMMM D, YYYY'), listing.endDate) || (0, _is_future2.default)(listing.endDate));
  });
}