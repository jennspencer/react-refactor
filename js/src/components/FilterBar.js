import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import _ from 'lodash';

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterMap: {},
      openFilters: false,
      cities: this.props.cities
    };
    if (this.props.categories) {
      this.state.filterMap['categories'] = this.props.categories;
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cities: nextProps.cities,
      months: nextProps.months
    });
  }

  handleFilterClick() {
    this.setState({ openFilters: true });
  }

  handleFilterSelect(type, value) {
    // console.log('filterbar', type, value);
    let filterMap = this.state.filterMap;
    filterMap[type] = value;
    if (type === 'categories') {
      window.location.hash = value ? value : '';
      console.log(value);
    }
    filterMap = _.pickBy(filterMap, _.identity);
    this.setState({ filterMap });
    this.props.filterSelect(filterMap);
  }

  render() {
    return (
      <section className="listing-filters">
        <div className="row" style={{ display: this.state.openFilters ? 'none' : '' }}>
          <div className="col-sm-12 filter-listings" onClick={this.handleFilterClick}>
            <h6>
              <i className="fas fa-sliders-h slider" /> Filter Listings <i className="icon_menu_expand" />
            </h6>
          </div>
        </div>
        {this.props.listingType != 'events' ? (
          <div className="row hide" style={{ display: this.state.openFilters ? 'block' : '' }}>
            <div className="category-filter filter-box col-md-3">
              <h6>Category</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="categories"
                filterSelect={this.handleFilterSelect}
                selectedOption={this.props.categories}
              />
            </div>
            <div className="price-filter filter-box col-md-3">
              <h6>Sort</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="sort"
                filterSelect={this.handleFilterSelect}
              />
            </div>
            <div className="tag-filter filter-box col-md-6">
              <h6>Filters</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="amenities"
                multi={true}
                removeSelected={true}
                filterSelect={this.handleFilterSelect}
              />
            </div>
          </div>
        ) : (
          <div className="row hide" style={{ display: this.state.openFilters ? 'block' : '' }}>
            <div className="category-filter filter-box col-md-3">
              <h6>Location</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="city"
                filterSelect={this.handleFilterSelect}
                selectedOption={this.props.categories}
                cities={this.state.cities}
              />
            </div>
            <div className="price-filter filter-box col-md-3">
              <h6>Date</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="month"
                filterSelect={this.handleFilterSelect}
                months={this.state.months}
              />
            </div>
            <div className="tag-filter filter-box col-md-6">
              <h6>Filters</h6>
              <Filter
                listingType={this.props.listingType}
                themeURL={this.props.themeURL}
                type="amenities"
                multi={true}
                removeSelected={true}
                filterSelect={this.handleFilterSelect}
              />
            </div>
          </div>
        )}
      </section>
    );
  }
}

FilterBar.propTypes = {
  filterSelect: PropTypes.func
};

FilterBar.defaultProps = {
  filterSelect: (type, value) => {
    // console.log('filterbar default', type, value);
  }
};

export default FilterBar;
