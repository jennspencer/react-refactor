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

var _difference_in_calendar_months = require('date-fns/difference_in_calendar_months');

var _difference_in_calendar_months2 = _interopRequireDefault(_difference_in_calendar_months);

var _get_month = require('date-fns/get_month');

var _get_month2 = _interopRequireDefault(_get_month);

var _constants = require('../constants');

var _filterActions = require('./filterActions');

var _ajaxStatusActions = require('./ajaxStatusActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataRoute = _constants.THEME_URL + _constants.CUSTOM_API;

function fetchAllListings() {
  return function (dispatch) {
    requestAllListings(dispatch, _constants.LISTING_TYPE);
  };
}

function requestAllListings(dispatch) {
  dispatch((0, _ajaxStatusActions.beginAjaxCall)(_actionTypes.ActionTypes.REQUEST_ALL_LISTINGS, _constants.LISTING_TYPE));

  var url = dataRoute + _constants.LISTING_TYPE;
  fetch(url).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
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
  }).catch(function (error) {
    console.error('Error fetching API page', error);
    dispatch((0, _ajaxStatusActions.ajaxCallError)(error));
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
      // get months for filter if event dates span more than one calendar month
      var monthRange = (0, _difference_in_calendar_months2.default)(listing.endDate, listing.startDate);

      // months in date-fns are zero indexed, so Jan = 0, Dec = 11
      // get number of first month of range
      var firstMonth = (0, _get_month2.default)(listing.startDate);

      // if more than one month
      if (monthRange !== 0) {
        // m = 1 since first month is already accounted for in month array
        for (var m = 1; m <= monthRange; m++) {
          var startYear = (0, _format2.default)(listing.startDate, 'YYYY');
          var endYear = (0, _format2.default)(listing.endDate, 'YYYY');
          var zeroMonth = 0;
          // taking into account events that might span late Dec - early Jan
          // this is all assuming an event doesn't span more than 2 years
          if (m + firstMonth <= 11) {
            listing.month.push((0, _format2.default)(new Date(startYear, m + firstMonth, 1), 'MMMM') + ' ' + startYear);
          } else {
            // else months start from Jan (month 0) of the following year
            listing.month.push((0, _format2.default)(new Date(endYear, zeroMonth, 1), 'MMMM') + ' ' + endYear);
            zeroMonth++;
          }
        }
      }

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