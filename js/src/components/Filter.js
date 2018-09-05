import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';
import _ from 'lodash';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectedOption ? this.props.selectedOption : '',
      dataRoute: this.props.themeURL + '/wp-json/wp/v2/' + this.props.listingType,
      options: []
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    if (!['sort', 'city', 'month'].includes(this.props.type)) {
      fetch(this.state.dataRoute + '-' + this.props.type + '?hide_empty=true&per_page=100')
        .then(res => res.json())
        .then(options =>
          this.setState((prevState, props) => {
            return { options: options.map(this.mapTags) };
          })
        );
    } else {
      let alphaOptions = [
        { value: 'asc', label: 'Alphabetical A-Z' },
        { value: 'desc', label: 'Alphabetical Z-A' }
      ];
      this.setState({
        options: alphaOptions
      });
      if (['stay', 'dine'].includes(this.props.listingType)) {
        fetch(this.state.dataRoute + '-price?hide_empty=true')
          .then(res => res.json())
          .then(options =>
            this.setState((prevState, props) => {
              return { options: alphaOptions.concat(options.map(this.mapOptions)) };
            })
          );
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type === 'city') {
      this.setState({
        options: nextProps.cities.map(this.mapOptions)
      });
    }
    if (this.props.type === 'month') {
      this.setState({
        options: nextProps.months.map(this.mapOptions)
      });
    }
  }

  mapTags(option) {
    return {
      value: option.slug,
      label: option.name.replace('&amp;', '&', option.name)
    };
  }

  mapOptions(option) {
    return {
      value: option.name,
      label: option.name
    };
  }

  handleSelectChange(value) {
    // console.log("You've selected:", this.props.type, value);
    this.setState({ value });
    this.props.filterSelect(this.props.type, value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="filter">
        <Select
          name={this.props.type + '-filter'}
          simpleValue
          value={value}
          onChange={this.handleSelectChange}
          options={this.state.options}
          multi={this.props.multi ? this.props.multi : false}
          removeSelected={this.props.removeSelected ? this.props.removeSelected : false}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filterSelect: PropTypes.func
};

Filter.defaultProps = {
  filterSelect: (type, value) => {
    // console.log('filter default', type, value);
  }
};

export default Filter;
