'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listingReducer;

var _actionTypes = require('../actions/actionTypes');

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.listings;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ActionTypes.NEW_ACTION:
      return state;
    default:
      return state;
  }
}