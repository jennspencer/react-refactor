import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import * as sortActions from '../actions/sortActions'
import { bindActionCreators } from 'redux'
import queryString from 'query-string'

const parsed = queryString.parse(location.search)

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentWillMount() {
    if (parsed !== '') {
      this.setState({
        value: parsed[this.props.type],
      })
    }
  }

  handleSelectChange(value) {
    this.setState({ value })
    let filter = {}
    filter[this.props.type] = value
    this.props.actions.addToFilterMap(filter)
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
