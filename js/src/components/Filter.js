import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch'
import _ from 'lodash'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.selectedOption ? this.props.selectedOption : '',
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(value) {
    this.setState({ value })
    this.props.filterSelect(this.props.type, value)
  }

  render() {
    const { value } = this.state
    return (
      <div className="filter">
        <Select
          name={this.props.type + '-filter'}
          simpleValue
          value={value}
          onChange={this.handleSelectChange}
          options={this.props.options}
          multi={this.props.multi ? this.props.multi : false}
          removeSelected={
            this.props.removeSelected ? this.props.removeSelected : false
          }
        />
      </div>
    )
  }
}

Filter.propTypes = {
  filterSelect: PropTypes.func,
}

Filter.defaultProps = {
  filterSelect: (type, value) => {
    // console.log('filter default', type, value);
  },
}

function mapStateToProps(state, ownProps) {
  return { options: state.filters[ownProps.type] }
}

export default connect(mapStateToProps)(Filter)
