import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from './Card'
import FilterBar from './FilterBar'
import Visible from 'react-visibility-sensor'
import { NUM_OF_LISTINGS } from '../constants'
import { bindActionCreators } from 'redux'
import * as sortActions from '../actions/sortActions'
import queryString from 'query-string'

class CardList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: NUM_OF_LISTINGS,
      loading: true,
    }

    this.lazyLoad = this.lazyLoad.bind(this)
  }

  componentDidUpdate(newProps) {
    // TODO: move query string manipulation out of component
    if (this.props.filterMap !== newProps.filterMap) {
      window.history.replaceState(
        null,
        null,
        '?' + queryString.stringify(this.props.filterMap),
      )
    }
    if (this.props.listings !== newProps.listings) {
      this.setState({
        loading: false,
        offset: NUM_OF_LISTINGS,
      })
    }
  }

  lazyLoad(isVisible) {
    if (this.props.listings.length > NUM_OF_LISTINGS && isVisible) {
      let newOffset = this.state.offset + NUM_OF_LISTINGS
      this.setState({
        offset: newOffset,
      })
    }
  }

  render() {
    let listingData = this.props.listings.slice(0, this.state.offset)
    return (
      <div className="listings-page wrapper" style={{ paddingBottom: '20px' }}>
        {this.state.loading ? <div className="loading-overlay" /> : ''}

        <FilterBar />
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
  listings: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    listings: sortActions.filterListings(state.listings, state.filterMap),
    filterMap: state.filterMap,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sortActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList)
