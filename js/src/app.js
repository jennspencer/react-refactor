'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { fetchAllListings } from './actions/listingActions'

import CardList from './components/CardList'
import { themeURL, listingType } from './constants'

const store = configureStore()

store.dispatch(fetchAllListings(listingType))

ReactDOM.render(
  <Provider store={store}>
    <CardList listingType={listingType} themeURL={themeURL} />
  </Provider>,
  document.getElementById('app'),
)
