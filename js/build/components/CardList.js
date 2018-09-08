'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _FilterBar = require('./FilterBar');

var _FilterBar2 = _interopRequireDefault(_FilterBar);

var _reactVisibilitySensor = require('react-visibility-sensor');

var _reactVisibilitySensor2 = _interopRequireDefault(_reactVisibilitySensor);

var _constants = require('../constants');

var _sortActions = require('../actions/sortActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardList = function (_Component) {
  _inherits(CardList, _Component);

  function CardList(props) {
    _classCallCheck(this, CardList);

    var _this = _possibleConstructorReturn(this, (CardList.__proto__ || Object.getPrototypeOf(CardList)).call(this, props));

    _this.state = {
      offset: _constants.NUM_OF_LISTINGS,
      loading: true
    };

    _this.lazyLoad = _this.lazyLoad.bind(_this);
    return _this;
  }

  _createClass(CardList, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(newProps) {
      if (this.props.listings !== newProps.listings) {
        this.setState({
          loading: false,
          offset: _constants.NUM_OF_LISTINGS
        });
      }
    }
  }, {
    key: 'lazyLoad',
    value: function lazyLoad(isVisible) {
      if (this.props.listings.length > _constants.NUM_OF_LISTINGS && isVisible) {
        var newOffset = this.state.offset + _constants.NUM_OF_LISTINGS;
        this.setState({
          offset: newOffset
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var listingData = this.props.listings.slice(0, this.state.offset);
      return _react2.default.createElement(
        'div',
        { className: 'listings-page wrapper', style: { paddingBottom: '20px' } },
        this.state.loading ? _react2.default.createElement('div', { className: 'loading-overlay' }) : '',
        _react2.default.createElement(_FilterBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'listings' },
            listingData.length ? listingData.map(function (listing, i) {
              return _react2.default.createElement(_Card2.default, { listing: listing, key: i });
            }) : null
          ),
          _react2.default.createElement(_reactVisibilitySensor2.default, {
            onChange: this.lazyLoad,
            delayedCall: true,
            partialVisibility: true
          })
        ),
        listingData.length === 0 ? _react2.default.createElement(
          'div',
          {
            style: { display: this.state.loading ? 'none' : 'block' },
            className: 'no-results'
          },
          'No results found.'
        ) : null
      );
    }
  }]);

  return CardList;
}(_react.Component);

CardList.propTypes = {
  listings: _propTypes2.default.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    listings: (0, _sortActions.filterListings)(state.listings, state.filterMap)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CardList);