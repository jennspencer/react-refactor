import { ActionTypes as types } from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function sortReducer(state = initialState.filterMap, action) {
  switch (action.type) {
    case types.ADD_TO_FILTERMAP:
      let filterMap = { ...state, ...action.data }
      return _.pickBy(filterMap)
    case types.CREATE_FILTERMAP_FROM_URL:
      return { ...state, ...action.data }
    default:
      return state
  }
}
