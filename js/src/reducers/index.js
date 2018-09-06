import { combineReducers } from 'redux'
import listings from './listingReducer'
import filters from './filterReducer'

const rootReducer = combineReducers({
  listings,
  filters,
})

export default rootReducer
