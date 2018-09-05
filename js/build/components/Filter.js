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
      value: _this.props.selectedOption ? _this.props.selectedOption : '',
      dataRoute: _this.props.themeURL + '/wp-json/wp/v2/' + _this.props.listingType,
      options: []
    };

    _this.handleSelectChange = _this.handleSelectChange.bind(_this);
    return _this;
  }

  _createClass(Filter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!['sort', 'city', 'month'].includes(this.props.type)) {
        fetch(this.state.dataRoute + '-' + this.props.type + '?hide_empty=true&per_page=100').then(function (res) {
          return res.json();
        }).then(function (options) {
          return _this2.setState(function (prevState, props) {
            return { options: options.map(_this2.mapTags) };
          });
        });
      } else {
        var alphaOptions = [{ value: 'asc', label: 'Alphabetical A-Z' }, { value: 'desc', label: 'Alphabetical Z-A' }];
        this.setState({
          options: alphaOptions
        });
        if (['stay', 'dine'].includes(this.props.listingType)) {
          fetch(this.state.dataRoute + '-price?hide_empty=true').then(function (res) {
            return res.json();
          }).then(function (options) {
            return _this2.setState(function (prevState, props) {
              return { options: alphaOptions.concat(options.map(_this2.mapOptions)) };
            });
          });
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
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
  }, {
    key: 'mapTags',
    value: function mapTags(option) {
      return {
        value: option.slug,
        label: option.name.replace('&amp;', '&', option.name)
      };
    }
  }, {
    key: 'mapOptions',
    value: function mapOptions(option) {
      return {
        value: option.name,
        label: option.name
      };
    }
  }, {
    key: 'handleSelectChange',
    value: function handleSelectChange(value) {
      // console.log("You've selected:", this.props.type, value);
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
          options: this.state.options,
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
  filterSelect: function filterSelect(type, value) {
    // console.log('filter default', type, value);
  }
};

exports.default = Filter;