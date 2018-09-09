import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'

export function addToFilterMap(filter) {
  return dispatch => {
    dispatch({ type: types.ADD_TO_FILTERMAP, data: filter })
  }
}

export function getFilterMapFromQueryString(queryString) {
  return dispatch => {
    dispatch({ type: types.CREATE_FILTERMAP_FROM_URL, data: queryString })
  }
}

export function filterListings(listings, filterMap) {
  for (let k in filterMap) {
    if (filterMap[k] && filterMap[k] !== '') {
      // filter by categories, amenities, city, month
      if (k !== 'sort') {
        let tags = filterMap[k].split(',')
        let filteredListings = listings.filter(listing => {
          // check if listing has all the selected 'tags'
          let hasFilters = listing[k].filter(f => tags.includes(f))
          return hasFilters.length === tags.length ? listing : false
        })
        listings = filteredListings
      }
      // sort A-Z, sort by price, filter by price
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
