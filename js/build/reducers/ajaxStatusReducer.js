'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ajaxStatusReducer;

var _actionTypes = require('../actions/actionTypes');

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}
function actionTypeStartsWithRequest(type) {
  return type.substring(0, 8) == 'REQUEST_';
}

function ajaxStatusReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default.ajaxCallsInProgress;
  var action = arguments[1];

  if (actionTypeStartsWithRequest(action.type)) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type) || action.type == _actionTypes.ActionTypes.AJAX_CALL_ERROR) {
    return state - 1;
  }

  return state;
}