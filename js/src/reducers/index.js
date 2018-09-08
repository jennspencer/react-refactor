import { combineReducers } from 'redux'
import listings from './listingReducer'
import filters from './filterReducer'
import filterMap from './sortReducer'

const rootReducer = combineReducers({
  listings,
  filters,
  filterMap,
})

export default rootReducer
