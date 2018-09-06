'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _index = require('../reducers/index');

var _index2 = _interopRequireDefault(_index);

var _reduxLogger = require('redux-logger');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger.createLogger)({
  collapsed: true
});

function configureStore(initialState) {
  return (0, _redux.createStore)(_index2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, logger));
}