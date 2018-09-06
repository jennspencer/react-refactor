import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

export default function listingReducer(state = initialState.listings, action) {
  switch (action.type) {
    case types.NEW_ACTION:
      return state
    default:
      return state
  }
}
