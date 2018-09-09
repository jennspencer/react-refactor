import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
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
  ADD_TO_FILTERMAP: null,

  CREATE_FILTERMAP_FROM_URL: null,
})
