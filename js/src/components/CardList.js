import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from './Card'
import FilterBar from './FilterBar'
import _ from 'lodash'
import Visible from 'react-visibility-sensor'
import { NUM_OF_LISTINGS } from '../constants'

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
      offset: NUM_OF_LISTINGS,
      loading: true,
    }

    this.filterSelect = this.filterSelect.bind(this)
    this.lazyLoad = this.lazyLoad.bind(this)
  }

  getPage() {
    this.setState({ loading: true })

    let data = this.props.allListings
    this.setState({
      listings: data.slice(0, NUM_OF_LISTINGS),
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
    if (this.state.sortedListings.length > NUM_OF_LISTINGS && isVisible) {
      let newOffset = this.state.offset + NUM_OF_LISTINGS
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
          offset: NUM_OF_LISTINGS,
          listings: listings.slice(0, NUM_OF_LISTINGS),
          sortedListings: listings,
        })
      },
    )
  }

  render() {
    let listingData = this.state.listings
    return (
      <div className="listings-page wrapper" style={{ paddingBottom: '20px' }}>
        {this.state.loading ? <div className="loading-overlay" /> : ''}

        <FilterBar
          filterSelect={this.filterSelect}
          categories={this.state.categories}
        />
        <div className="row">
          <div className="listings">
            {listingData.length
              ? listingData.map((listing, i) => (
                  <Card listing={listing} key={i} />
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
  }
}

export default connect(mapStateToProps)(CardList)
