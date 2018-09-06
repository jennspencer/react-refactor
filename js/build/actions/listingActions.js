'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllListings = fetchAllListings;
exports.requestAllListings = requestAllListings;

var _actionTypes = require('../actions/actionTypes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataRoute = _constants.themeURL + '/wp-json/visitm/v1/';

function fetchAllListings(type) {
  return function (dispatch) {
    requestAllListings(dispatch, type);
  };
}

function requestAllListings(dispatch, type) {
  dispatch({ type: _actionTypes.ActionTypes.REQUEST_ALL_LISTINGS, data: type });

  var url = dataRoute + type;
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

    dispatch({ type: _actionTypes.ActionTypes.RECEIVED_ALL_LISTINGS_SUCCESS, data: data });
  });
}