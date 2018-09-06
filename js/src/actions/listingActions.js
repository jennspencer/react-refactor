import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import { themeURL } from '../constants'

const dataRoute = themeURL + '/wp-json/visitm/v1/'

export function fetchAllListings(type) {
  return dispatch => {
    requestAllListings(dispatch, type)
  }
}

export function requestAllListings(dispatch, type) {
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

      dispatch({ type: types.RECEIVED_ALL_LISTINGS_SUCCESS, data: data })
    })
}
