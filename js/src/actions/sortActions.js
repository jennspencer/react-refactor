import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'

export function addToFilterMap(filterType, value) {
  return dispatch => {
    dispatch({ type: types.ADD_TO_FILTERMAP, data: { filterType, value } })
  }
}

export function filterListings(listings, filterMap) {
  for (let k in filterMap) {
    if (filterMap[k] && filterMap[k] !== '') {
      if (k !== 'sort') {
        let tags = filterMap[k].split(',')
        let filteredListings = listings.filter(listing => {
          let hasFilters = listing[k].filter(f => tags.includes(f))
          return hasFilters.length === tags.length ? listing : false
        })
        listings = filteredListings
      }
      if (k === 'sort') {
        if (filterMap[k].length > 1) {
          let sorting = filterMap[k].split('-')
          listings = _.orderBy(listings, sorting[0], sorting[1])
        } else {
          listings = _.filter(listings, { price: filterMap[k] })
        }
      }
    }
  }
  return listings
}
