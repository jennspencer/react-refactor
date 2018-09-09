import { combineReducers } from 'redux'
import listings from './listingReducer'
import filters from './filterReducer'
import filterMap from './sortReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'

const rootReducer = combineReducers({
  listings,
  filters,
  filterMap,
  ajaxCallsInProgress,
})

export default rootReducer
