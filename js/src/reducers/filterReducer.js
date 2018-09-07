import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

export default function filterReducer(state = initialState.filters, action) {
  switch (action.type) {
    case types.GET_CITIES_FILTER:
      return { ...state, cities: action.data }
    case types.GET_MONTHS_FILTER:
      return { ...state, months: action.data }
    case types.RECEIVED_CATEGORIES_SUCCESS:
      return { ...state, categories: action.data }
    case types.RECEIVED_AMENITIES_SUCCESS:
      return { ...state, amenities: action.data }
    case types.RECEIVED_PRICES_SUCCESS:
      return { ...state, sort: state.sort.concat(action.data) }
    default:
      return state
  }
}
