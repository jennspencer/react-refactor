import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  NEW_ACTION: null,

  // ajax calls
  REQUEST_ALL_LISTINGS: null,
  RECEIVED_ALL_LISTINGS_SUCCESS: null,
})
