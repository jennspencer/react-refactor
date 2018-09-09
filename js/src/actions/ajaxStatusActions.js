import { ActionTypes as types } from './actionTypes'

export function beginAjaxCall(type, data) {
  return { type, data }
}

export function ajaxCallError(data) {
  return { type: types.AJAX_CALL_ERROR, data: data }
}
