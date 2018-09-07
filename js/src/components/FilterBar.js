import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Filter from './Filter'
import _ from 'lodash'
import { LISTING_TYPE } from '../constants'

class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterMap: {},
      openFilters: false,
    }
    if (this.props.categories) {
      this.state.filterMap['categories'] = this.props.categories
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  handleFilterClick() {
    this.setState({ openFilters: true })
  }

  handleFilterSelect(type, value) {
    let filterMap = this.state.filterMap
    filterMap[type] = value
    if (type === 'categories') {
      window.location.hash = value ? value : ''
    }
    filterMap = _.pickBy(filterMap, _.identity)
    this.setState({ filterMap })
    this.props.filterSelect(filterMap)
  }

  render() {
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
        {LISTING_TYPE != 'events' ? (
          <div
            className="row hide"
            style={{ display: this.state.openFilters ? 'block' : '' }}
          >
            <div className="category-filter filter-box col-md-3">
              <h6>Category</h6>
              <Filter
                type="categories"
                filterSelect={this.handleFilterSelect}
                selectedOption={this.props.categories}
              />
            </div>
            <div className="price-filter filter-box col-md-3">
              <h6>Sort</h6>
              <Filter type="sort" filterSelect={this.handleFilterSelect} />
            </div>
            <div className="tag-filter filter-box col-md-6">
              <h6>Filters</h6>
              <Filter
                type="amenities"
                multi={true}
                removeSelected={true}
                filterSelect={this.handleFilterSelect}
              />
            </div>
          </div>
        ) : (
          <div
            className="row hide"
            style={{ display: this.state.openFilters ? 'block' : '' }}
          >
            <div className="category-filter filter-box col-md-3">
              <h6>Location</h6>
              <Filter
                type="cities"
                filterSelect={this.handleFilterSelect}
                selectedOption={this.props.categories}
              />
            </div>
            <div className="price-filter filter-box col-md-3">
              <h6>Date</h6>
              <Filter type="months" filterSelect={this.handleFilterSelect} />
            </div>
            <div className="tag-filter filter-box col-md-6">
              <h6>Filters</h6>
              <Filter
                type="amenities"
                multi={true}
                removeSelected={true}
                filterSelect={this.handleFilterSelect}
              />
            </div>
          </div>
        )}
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
