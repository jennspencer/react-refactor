import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from './Filter'
import _ from 'lodash'
import { LISTING_TYPE } from '../constants'

class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openFilters: false,
    }

    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  handleFilterClick() {
    this.setState({ openFilters: true })
  }

  render() {
    let categoryTitle, categoryType, sortTitle, sortType

    if (LISTING_TYPE !== 'events') {
      categoryTitle = 'Category'
      categoryType = 'categories'
      sortTitle = 'Sort'
      sortType = 'sort'
    } else {
      categoryTitle = 'Location'
      categoryType = 'city'
      sortTitle = 'Date'
      sortType = 'month'
    }

    return (
      <section className="listing-filters">
        <div
          className="row"
          style={{ display: this.state.openFilters ? 'none' : '' }}
        >
          <div
            className="col-sm-12 filter-listings"
            onClick={this.handleFilterClick}
          >
            <h6>
              <i className="fas fa-sliders-h slider" /> Filter Listings{' '}
              <i className="icon_menu_expand" />
            </h6>
          </div>
        </div>

        <div
          className="row hide"
          style={{ display: this.state.openFilters ? 'block' : '' }}
        >
          <div className="category-filter filter-box col-md-3">
            <h6>{categoryTitle}</h6>
            <Filter type={categoryType} />
          </div>

          <div className="price-filter filter-box col-md-3">
            <h6>{sortTitle}</h6>
            <Filter type={sortType} />
          </div>

          <div className="tag-filter filter-box col-md-6">
            <h6>Filters</h6>
            <Filter type="amenities" multi={true} removeSelected={true} />
          </div>
        </div>
      </section>
    )
  }
}

FilterBar.propTypes = {
  filterSelect: PropTypes.func,
}

FilterBar.defaultProps = {
  filterSelect: (type, value) => {},
}

export default FilterBar
