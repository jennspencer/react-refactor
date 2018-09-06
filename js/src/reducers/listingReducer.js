import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

export default function listingReducer(state = initialState.listings, action) {
  switch (action.type) {
    case types.RECEIVED_ALL_LISTINGS_SUCCESS:
      return action.data
    default:
      return state
  }
}
