import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import moment from 'moment'
import { themeURL, listingType, wpApiUrl } from '../constants'

const dataRoute = themeURL + wpApiUrl

export function fetchAllFilters() {
  return dispatch => {
    requestAllCategories(dispatch, listingType)
    requestAllAmenities(dispatch, listingType)
    requestAllPrices(dispatch, listingType)
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

  cities = _.orderBy(cities, name, 'asc')
  months = _.uniqBy(
    listings.map(listing => {
      return { name: listing.month[0], date: listing.startDate }
    }),
    'name',
  )
  months = _.orderBy(
    months,
    month => {
      return new moment(month.date)
    },
    'asc',
  )
  return dispatch => {
    dispatch({ type: types.GET_MONTHS_FILTER, data: months.map(mapOptions) })
    dispatch({ type: types.GET_CITIES_FILTER, data: cities.map(mapOptions) })
  }
}

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
      dispatch({
        type: types.RECEIVED_PRICES_SUCCESS,
        data: options.map(mapOptions),
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
