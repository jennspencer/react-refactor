import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'

export default function sortReducer(state = initialState.filterMap, action) {
  switch (action.type) {
    case types.ADD_TO_FILTERMAP:
      let newMap = Object.assign({}, state)
      newMap[action.data.filterType] = action.data.value
      return newMap
    default:
      return state
  }
}
