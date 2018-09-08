import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import { THEME_URL, LISTING_TYPE, WP_API } from '../constants'

const dataRoute = THEME_URL + WP_API

export function fetchAllFilters() {
  return dispatch => {
    requestAllCategories(dispatch, LISTING_TYPE)
    requestAllAmenities(dispatch, LISTING_TYPE)
    requestAllPrices(dispatch, LISTING_TYPE)
  }
}

export function getEventFilters(listings) {
  let cities = []
  let months = []
  cities = _.uniqBy(
    listings.map(listing => {
      return { name: listing.city[0] }
    }),
    'name',
  )

  cities = _.orderBy(cities, 'name', 'asc')

  months = _.uniqBy(
    listings.map(listing => {
      return { name: listing.month[0], date: listing.startDate }
    }),
    'name',
  )
  months = _.orderBy(
    months,
    month => {
      return new Date(month.date)
    },
    'asc',
  )
  return dispatch => {
    dispatch({ type: types.GET_MONTHS_FILTER, data: months.map(mapOptions) })
    dispatch({ type: types.GET_CITIES_FILTER, data: cities.map(mapOptions) })
  }
}

// TODO: these functions are redundant

function requestAllCategories(dispatch, type) {
  dispatch({ type: types.REQUEST_CATEGORIES, data: type })
  let url = dataRoute + type + '-categories?hide_empty=true&per_page=100'
  fetch(url)
    .catch(error => {
      console.error('Error fetching API page', error)
    })
    .then(response => {
      if (response.status !== 200) {
        return
      }
      return response.json()
    })
    .then(options => {
      dispatch({
        type: types.RECEIVED_CATEGORIES_SUCCESS,
        data: options.map(mapTags),
      })
    })
}

function requestAllAmenities(dispatch, type) {
  dispatch({ type: types.REQUEST_AMENITIES, data: type })
  let url = dataRoute + type + '-amenities?hide_empty=true&per_page=100'
  fetch(url)
    .catch(error => {
      console.error('Error fetching API page', error)
    })
    .then(response => {
      if (response.status !== 200) {
        return
      }
      return response.json()
    })
    .then(options => {
      dispatch({
        type: types.RECEIVED_AMENITIES_SUCCESS,
        data: options.map(mapTags),
      })
    })
}

function requestAllPrices(dispatch, type) {
  dispatch({ type: types.REQUEST_PRICES, data: type })
  let url = dataRoute + type + '-price?hide_empty=true&per_page=100'

  fetch(url)
    .catch(error => {
      console.error('Error fetching API page', error)
    })
    .then(response => {
      if (response.status !== 200) {
        return
      }
      return response.json()
    })
    .then(options => {
      options = options.map(option => {
        let value = option.name.length
        return {
          value,
          label: option.name,
        }
      })

      options = [
        { value: 'price-asc', label: 'Price Low to High' },
        { value: 'price-desc', label: 'Price High to Low' },
      ].concat(options)

      dispatch({
        type: types.RECEIVED_PRICES_SUCCESS,
        data: options,
      })
    })
}

function mapTags(option) {
  return {
    value: option.slug,
    label: option.name.replace('&amp;', '&', option.name),
  }
}

function mapOptions(option) {
  return {
    value: option.name,
    label: option.name,
  }
}
