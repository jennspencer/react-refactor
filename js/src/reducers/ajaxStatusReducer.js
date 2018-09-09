import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS'
}
function actionTypeStartsWithRequest(type) {
  return type.substring(0, 8) == 'REQUEST_'
}

export default function ajaxStatusReducer(
  state = initialState.ajaxCallsInProgress,
  action,
) {
  if (actionTypeStartsWithRequest(action.type)) {
    return state + 1
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type == types.AJAX_CALL_ERROR
  ) {
    return state - 1
  }

  return state
}
