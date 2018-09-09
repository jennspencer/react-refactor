'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = sortReducer;

var _actionTypes = require('../actions/actionTypes');

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.filterMap;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ActionTypes.ADD_TO_FILTERMAP:
      var filterMap = _extends({}, state, action.data);
      return _lodash2.default.pickBy(filterMap);
    case _actionTypes.ActionTypes.CREATE_FILTERMAP_FROM_URL:
      return _extends({}, state, action.data);
    default:
      return state;
  }
}