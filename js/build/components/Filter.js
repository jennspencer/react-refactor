'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactRedux = require('react-redux');

var _es6Promise = require('es6-promise');

require('isomorphic-fetch');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter(props) {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

    _this.state = {
      value: _this.props.selectedOption ? _this.props.selectedOption : ''
    };

    _this.handleSelectChange = _this.handleSelectChange.bind(_this);
    return _this;
  }

  _createClass(Filter, [{
    key: 'handleSelectChange',
    value: function handleSelectChange(value) {
      this.setState({ value: value });
      this.props.filterSelect(this.props.type, value);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        'div',
        { className: 'filter' },
        _react2.default.createElement(_reactSelect2.default, {
          name: this.props.type + '-filter',
          simpleValue: true,
          value: value,
          onChange: this.handleSelectChange,
          options: this.props.options,
          multi: this.props.multi ? this.props.multi : false,
          removeSelected: this.props.removeSelected ? this.props.removeSelected : false
        })
      );
    }
  }]);

  return Filter;
}(_react.Component);

Filter.propTypes = {
  filterSelect: _propTypes2.default.func
};

Filter.defaultProps = {
  filterSelect: function filterSelect(type, value) {}
};

function mapStateToProps(state, ownProps) {
  return { options: state.filters[ownProps.type] };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Filter);