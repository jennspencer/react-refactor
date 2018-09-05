'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CardList from './components/CardList';

let reactOptions = window.reactOptions;

ReactDOM.render(
  <div>
    <CardList listingType={reactOptions.listingType} themeURL={reactOptions.themeURL} />
  </div>,
  document.getElementById('app')
);
