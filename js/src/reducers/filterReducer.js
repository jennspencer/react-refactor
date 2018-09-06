import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

export default function filterReducer(state = initialState.filters, action) {
  switch (action.type) {
    case types.NEW_ACTION:
      return state
    default:
      return state
  }
}
