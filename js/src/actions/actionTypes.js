import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  NEW_ACTION: null,

  // ajax calls
  REQUEST_ALL_LISTINGS: null,
  REQUEST_CATEGORIES: null,
  REQUEST_AMENITIES: null,
  REQUEST_PRICES: null,

  RECEIVED_ALL_LISTINGS_SUCCESS: null,
  RECEIVED_CATEGORIES_SUCCESS: null,
  RECEIVED_AMENITIES_SUCCESS: null,
  RECEIVED_PRICES_SUCCESS: null,

  // filter actions
  GET_MONTHS_FILTER: null,
  GET_CITIES_FILTER: null,
})
