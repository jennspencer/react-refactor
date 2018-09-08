import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch'
import _ from 'lodash'
import * as sortActions from '../actions/sortActions'
import { bindActionCreators } from 'redux'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(value) {
    this.setState({ value })
    this.props.actions.addToFilterMap(this.props.type, value)
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
  filterSelect: (type, value) => {},
}

function mapStateToProps(state, ownProps) {
  return { options: state.filters[ownProps.type] }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sortActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter)
