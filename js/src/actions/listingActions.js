import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import moment from 'moment'
import {
  THEME_URL,
  CUSTOM_API,
  LISTING_DESC_LENGTH,
  LISTING_TYPE,
} from '../constants'
import { getEventFilters } from './filterActions'

const dataRoute = THEME_URL + CUSTOM_API

export function fetchAllListings() {
  return dispatch => {
    requestAllListings(dispatch, LISTING_TYPE)
  }
}

function requestAllListings(dispatch) {
  dispatch({ type: types.REQUEST_ALL_LISTINGS, data: LISTING_TYPE })

  let url = dataRoute + LISTING_TYPE
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

      if (LISTING_TYPE === 'events') {
        data = _.orderBy(data, 'startDate', 'asc')
        // send data off to get event-specific filters
        dispatch(getEventFilters(data))
      } else {
        data = _.shuffle(data)
        data = _.orderBy(data, 'featured', 'desc')
      }

      dispatch({ type: types.RECEIVED_ALL_LISTINGS_SUCCESS, data: data })
    })
}

function normalizeListings(listings) {
  let placeType = 'Place'

  switch (LISTING_TYPE) {
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

    if (listing.price) {
      listing.priceDisplay = listing.price
      listing.price = listing.price.length
    }

    if (LISTING_TYPE === 'events') {
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
    }

    let description = listing.description.split(' ')
    listing.longDesc = false
    if (description.length > LISTING_DESC_LENGTH) {
      description = description.slice(0, LISTING_DESC_LENGTH)
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
