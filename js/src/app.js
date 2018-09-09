'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { fetchAllListings } from './actions/listingActions'
import { fetchAllFilters } from './actions/filterActions'
import { getFilterMapFromQueryString } from './actions/sortActions'

import CardList from './components/CardList'
import queryString from 'query-string'

const parsed = queryString.parse(location.search)
const parsedHash = queryString.parse(location.hash)
const store = configureStore()

// backwards compatibility for links using location.hash 'category'
if (Object.keys(parsedHash).length) {
  let category = Object.keys(parsedHash)
  parsed['categories'] = category[0]
}

store.dispatch(fetchAllListings())
store.dispatch(fetchAllFilters())
store.dispatch(getFilterMapFromQueryString(parsed))

ReactDOM.render(
  <Provider store={store}>
    <CardList />
  </Provider>,
  document.getElementById('app'),
)
