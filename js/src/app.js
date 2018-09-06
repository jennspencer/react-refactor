'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/configureStore'

import CardList from './components/CardList'

let reactOptions = window.reactOptions

ReactDOM.render(
  <Provider store={store}>
    <CardList
      listingType={reactOptions.listingType}
      themeURL={reactOptions.themeURL}
    />
  </Provider>,
  document.getElementById('app'),
)
