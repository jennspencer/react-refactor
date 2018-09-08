'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { fetchAllListings } from './actions/listingActions'
import { fetchAllFilters } from './actions/filterActions'

import CardList from './components/CardList'

const store = configureStore()

store.dispatch(fetchAllListings())
store.dispatch(fetchAllFilters())

ReactDOM.render(
  <Provider store={store}>
    <CardList />
  </Provider>,
  document.getElementById('app'),
)
