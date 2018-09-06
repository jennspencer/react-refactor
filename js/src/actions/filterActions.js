import { ActionTypes as types } from '../actions/actionTypes'
import _ from 'lodash'
import moment from 'moment'

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
    dispatch({ type: types.GET_CITIES_FILTER, data: cities })
    dispatch({ type: types.GET_MONTHS_FILTER, data: months })
  }
}
