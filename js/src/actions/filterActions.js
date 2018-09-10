import { ActionTypes as types } from '../actions/actionTypes'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import { THEME_URL, LISTING_TYPE, WP_API } from '../constants'
import isSameMonth from 'date-fns/is_same_month'
import isFuture from 'date-fns/is_future'

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

  listings.forEach(listing => {
    months = months.concat(listing.month)
    cities = cities.concat(listing.city)
  })

  // remove duplicates
  months = [...new Set(months)]
  cities = [...new Set(cities)]

  cities.sort()

  // filter out past months
  months = months.filter(month => {
    return isSameMonth(month, new Date()) || isFuture(month)
  })

  return dispatch => {
    dispatch({ type: types.GET_MONTHS_FILTER, data: months.map(mapOptions) })
    dispatch({ type: types.GET_CITIES_FILTER, data: cities.map(mapOptions) })
  }
}

// TODO: these functions are redundant

function requestAllCategories(dispatch, type) {
  dispatch(beginAjaxCall(types.REQUEST_CATEGORIES, type))
  let url = dataRoute + type + '-categories?hide_empty=true&per_page=100'
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(options => {
      dispatch({
        type: types.RECEIVED_CATEGORIES_SUCCESS,
        data: options.map(mapTags),
      })
    })
    .catch(error => {
      console.error('Error fetching API page', error)
      dispatch(ajaxCallError(error))
    })
}

function requestAllAmenities(dispatch, type) {
  dispatch(beginAjaxCall(types.REQUEST_AMENITIES, type))
  let url = dataRoute + type + '-amenities?hide_empty=true&per_page=100'
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(options => {
      dispatch({
        type: types.RECEIVED_AMENITIES_SUCCESS,
        data: options.map(mapTags),
      })
    })
    .catch(error => {
      console.error('Error fetching API page', error)
      dispatch(ajaxCallError(error))
    })
}

function requestAllPrices(dispatch, type) {
  dispatch(beginAjaxCall(types.REQUEST_PRICES, type))
  let url = dataRoute + type + '-price?hide_empty=true&per_page=100'

  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
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
    .catch(error => {
      console.error('Error fetching API page', error)
      dispatch(ajaxCallError(error))
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
    value: option,
    label: option,
  }
}
