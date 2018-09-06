import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import moment from 'moment'
import { themeURL, listingType, apiURL } from '../constants'
import { getEventFilters } from './filterActions'

const dataRoute = themeURL + apiURL

export function fetchAllListings(type) {
  return dispatch => {
    requestAllListings(dispatch, type)
  }
}

function requestAllListings(dispatch, type) {
  dispatch({ type: types.REQUEST_ALL_LISTINGS, data: type })

  let url = dataRoute + type
  fetch(url)
    .catch(error => {
      console.error('Error fetching API page', error)
    })
    .then(response => {
      if (response.status !== 200 && response.ok) {
        return
      }
      return response.json()
    })
    .then(data => {
      if (!data) return

      // filter out excluded listings
      data = _.filter(data, { excluded: '0' })

      //normalize listing data for display
      data = normalizeListings(data)

      if (type === 'events') {
        data = _.orderBy(data, 'startDate', 'asc')
      } else {
        data = _.shuffle(data)
        data = _.orderBy(data, 'featured', 'desc')
      }

      dispatch({ type: types.RECEIVED_ALL_LISTINGS_SUCCESS, data: data })

      // send data off to get event-specific filters
      if (type === 'events') {
        dispatch(getEventFilters(data))
      }
    })
}

function normalizeListings(listings) {
  let postType = listingType
  let placeType = 'Place'

  switch (postType) {
    case 'dine':
      placeType = 'FoodEstablishment'
      break
    case 'sip':
      placeType = 'FoodEstablishment'
      break
    case 'stay':
      placeType = 'LodgingBusiness'
      break
    case 'activities':
      placeType = 'LocalBusiness'
      break
    default:
      placeType = 'Place'
  }

  let normalizedListings = listings.slice()

  normalizedListings.map(listing => {
    listing.placeType = placeType
    listing.listingAddress =
      'https://www.google.com/maps/search/?api=1&query=' +
      listing.address1 +
      ' ' +
      listing.city +
      ' OR ' +
      (listing.zipcode ? listing.zipcode : '')

    if (listing.startDate) {
      listing.startDate = moment(listing.startDate.toString()).format(
        'dddd, MMMM D, YYYY',
      )
      listing.overlayStartDate = moment(listing.startDate.toString()).format(
        'MMM DD',
      )
    }

    if (listing.endDate) {
      listing.endDate = moment(listing.endDate.toString()).format(
        'dddd, MMMM D, YYYY',
      )
      listing.overlayEndDate = moment(listing.endDate.toString()).format(
        'MMM DD',
      )
    }

    listing.niceDate =
      listing.startDate === listing.endDate
        ? listing.startDate
        : listing.startDate + ' - ' + listing.endDate

    listing.overlayDate =
      listing.startDate === listing.endDate
        ? listing.overlayStartDate
        : listing.overlayStartDate + ' - ' + listing.overlayEndDate

    let description = listing.description.split(' ')
    listing.longDesc = false
    if (description.length > 35) {
      description = description.slice(0, 35)
      description = description.join(' ')
      listing.description = description + ' ...'
      listing.longDesc = true
    } else {
      listing.description = description.join(' ')
    }

    if (
      listing.endDate &&
      moment(listing.endDate).isSameOrAfter(moment(), 'day')
    ) {
      return listing
    }
  })

  return normalizedListings
}
