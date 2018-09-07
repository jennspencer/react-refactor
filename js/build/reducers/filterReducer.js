'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterReducer;

var _actionTypes = require('../actions/actionTypes');

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.filters;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ActionTypes.GET_CITIES_FILTER:
      return _extends({}, state, { cities: action.data });
    case _actionTypes.ActionTypes.GET_MONTHS_FILTER:
      return _extends({}, state, { months: action.data });
    case _actionTypes.ActionTypes.RECEIVED_CATEGORIES_SUCCESS:
      return _extends({}, state, { categories: action.data });
    case _actionTypes.ActionTypes.RECEIVED_AMENITIES_SUCCESS:
      return _extends({}, state, { amenities: action.data });
    case _actionTypes.ActionTypes.RECEIVED_PRICES_SUCCESS:
      return _extends({}, state, { sort: state.sort.concat(action.data) });
    default:
      return state;
  }
}