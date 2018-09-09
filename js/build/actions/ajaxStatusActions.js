'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginAjaxCall = beginAjaxCall;
exports.ajaxCallError = ajaxCallError;

var _actionTypes = require('./actionTypes');

function beginAjaxCall(type, data) {
  return { type: type, data: data };
}

function ajaxCallError(data) {
  return { type: _actionTypes.ActionTypes.AJAX_CALL_ERROR, data: data };
}