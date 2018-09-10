import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import isFuture from 'date-fns/is_future'
import isEqual from 'date-fns/is_equal'
import format from 'date-fns/format'
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months'
import getMonth from 'date-fns/get_month'
import {
  THEME_URL,
  CUSTOM_API,
  LISTING_DESC_LENGTH,
  LISTING_TYPE,
} from '../constants'
import { getEventFilters } from './filterActions'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

const dataRoute = THEME_URL + CUSTOM_API

export function fetchAllListings() {
  return dispatch => {
    requestAllListings(dispatch, LISTING_TYPE)
  }
}

function requestAllListings(dispatch) {
  dispatch(beginAjaxCall(types.REQUEST_ALL_LISTINGS, LISTING_TYPE))

  let url = dataRoute + LISTING_TYPE
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(data => {
      if (!data) return
      // filter out excluded listings
      data = _.filter(data, { excluded: '0' })
      //normalize listing data for display
      data = normalizeListings(data)

      if (LISTING_TYPE === 'events') {
        data = _.orderBy(
          data,
          listing => {
            return new Date(listing.startDate)
          },
          'asc',
        )
        // send data off to get event-specific filters
        dispatch(getEventFilters(data))
      } else {
        data = _.shuffle(data)
        data = _.orderBy(data, 'featured', 'desc')
      }

      dispatch({ type: types.RECEIVED_ALL_LISTINGS_SUCCESS, data: data })
    })
    .catch(error => {
      console.error('Error fetching API page', error)
      dispatch(ajaxCallError(error))
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

  return listings
    .map(listing => {
      // add approprate placeType for schema.org metadata
      listing.placeType = placeType

      // format address for google maps link
      // TODO: add check for lat/long
      listing.listingAddress =
        'https://www.google.com/maps/search/?api=1&query=' +
        listing.address1 +
        ' ' +
        listing.city +
        ' OR ' +
        (listing.zipcode ? listing.zipcode : '')

      // format price for sorting by price
      if (listing.price) {
        listing.priceDisplay = listing.price
        listing.price = listing.price.length
      }

      // format event dates for display
      if (LISTING_TYPE === 'events') {
        // get months for filter if event dates span more than one calendar month
        let monthRange = differenceInCalendarMonths(
          listing.endDate,
          listing.startDate,
        )

        // months in date-fns are zero indexed, so Jan = 0, Dec = 11
        // get number of first month of range
        let firstMonth = getMonth(listing.startDate)

        // if more than one month
        if (monthRange !== 0) {
          // m = 1 since first month is already accounted for in month array
          for (let m = 1; m <= monthRange; m++) {
            let startYear = format(listing.startDate, 'YYYY')
            let endYear = format(listing.endDate, 'YYYY')
            let zeroMonth = 0
            // taking into account events that might span late Dec - early Jan
            // this is all assuming an event doesn't span more than 2 years
            if (m + firstMonth <= 11) {
              listing.month.push(
                format(new Date(startYear, m + firstMonth, 1), 'MMMM') +
                  ' ' +
                  startYear,
              )
            } else {
              // else months start from Jan (month 0) of the following year
              listing.month.push(
                format(new Date(endYear, zeroMonth, 1), 'MMMM') + ' ' + endYear,
              )
              zeroMonth++
            }
          }
        }

        if (listing.startDate) {
          listing.startDate = format(listing.startDate, 'dddd, MMMM D, YYYY')
          listing.overlayStartDate = format(listing.startDate, 'MMM DD')
        }

        if (listing.endDate) {
          listing.endDate = format(listing.endDate, 'dddd, MMMM D, YYYY')
          listing.overlayEndDate = format(listing.endDate, 'MMM DD')
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

      // format description if longer than LISTING_DESC_LENGTH num of words
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

      return listing
    })
    .filter(listing => {
      // return if no end date exists (not an event)
      if (!listing.endDate) return true
      // return if end date exists and is today or in the future
      return (
        listing.endDate &&
        (isEqual(format(new Date(), 'dddd, MMMM D, YYYY'), listing.endDate) ||
          isFuture(listing.endDate))
      )
    })
}
