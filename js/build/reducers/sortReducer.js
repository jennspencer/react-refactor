'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortReducer;

var _actionTypes = require('../actions/actionTypes');

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.filterMap;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ActionTypes.ADD_TO_FILTERMAP:
      var newMap = Object.assign({}, state);
      newMap[action.data.filterType] = action.data.value;
      return newMap;
    default:
      return state;
  }
}