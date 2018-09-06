import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from './Card'
import FilterBar from './FilterBar'
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch'
import _ from 'lodash'
import moment from 'moment'
import Visible from 'react-visibility-sensor'

class CardList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sortedListings: [],
      listings: [],
      categories: window.location.hash.substring(1)
        ? window.location.hash.substring(1)
        : null,
      filterMap: {},
      offset: 24,
      loading: true,
    }

    this.filterSelect = this.filterSelect.bind(this)
    this.lazyLoad = this.lazyLoad.bind(this)
  }

  getPage() {
    this.setState({ loading: true })

    let data = this.props.allListings
    this.setState({
      listings: data.slice(0, 24),
      sortedListings: data,
      loading: false,
    })
    if (
      this.state.filterMap['categories'] === undefined &&
      this.state.categories &&
      this.state.categories !== ''
    ) {
      this.filterSelect({ categories: this.state.categories })
    }
  }

  componentDidUpdate(newProps) {
    if (this.props.allListings !== newProps.allListings) {
      this.getPage()
    }
  }

  lazyLoad(isVisible) {
    if (this.state.sortedListings.length > 24 && isVisible) {
      let newOffset = this.state.offset + 24
      let nextListings = this.state.sortedListings.slice(
        this.state.offset,
        newOffset,
      )
      this.setState({
        offset: newOffset,
        listings: this.state.listings.concat(nextListings),
      })
    }
  }

  filterSelect(filterMap) {
    this.setState(
      {
        filterMap,
      },
      () => {
        let listings = this.props.allListings
        if (!_.isEmpty(this.state.filterMap)) {
          let filters = this.state.filterMap
          for (let k in filters) {
            if (filters[k] && filters[k] !== '') {
              if (k !== 'sort') {
                let tags = filters[k].split(',')
                let filteredListings = listings.filter(listing => {
                  let hasFilters = listing[k].filter(f => tags.includes(f))
                  return hasFilters.length === tags.length ? listing : false
                })
                listings = filteredListings
              }
              if (k === 'sort') {
                if (filters[k] === 'desc' || filters[k] === 'asc') {
                  listings = _.orderBy(listings, 'title', [filters[k]])
                } else if (filters[k] && filters[k] !== '') {
                  listings = _.filter(listings, { price: filters[k] })
                }
              }
            }
          }
        }
        this.setState({
          offset: 24,
          listings: listings.slice(0, 24),
          sortedListings: listings,
        })
      },
    )
  }

  render() {
    let listingData = this.state.listings
    return (
      <div className="listings-page wrapper" style={{ paddingBottom: '20px' }}>
        <div
          className="loading-overlay"
          style={{ display: this.state.loading ? 'block' : 'none' }}
        />
        <FilterBar
          filterSelect={this.filterSelect}
          listingType={this.props.listingType}
          themeURL={this.props.themeURL}
          categories={this.state.categories}
          cities={this.props.filters.cities}
          months={this.props.filters.months}
        />
        <div className="row">
          <div className="listings">
            {listingData.length
              ? listingData.map((listing, i) => (
                  <Card
                    listing={listing}
                    key={i}
                    listingType={this.props.listingType}
                  />
                ))
              : null}
          </div>
          <Visible
            onChange={this.lazyLoad}
            delayedCall={true}
            partialVisibility={true}
          />
        </div>
        {listingData.length === 0 ? (
          <div
            style={{ display: this.state.loading ? 'none' : 'block' }}
            className="no-results"
          >
            No results found.
          </div>
        ) : null}
      </div>
    )
  }
}

CardList.propTypes = {
  filterSelect: PropTypes.func,
}

CardList.defaultProps = {
  filterSelect: () => {},
}

function mapStateToProps(state, ownProps) {
  return {
    allListings: state.listings,
    filters: state.filters,
  }
}

export default connect(mapStateToProps)(CardList)
