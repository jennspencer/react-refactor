'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var listing = this.props.listing;
      var listingAddress = 'https://www.google.com/maps/search/?api=1&query=' + listing.address1 + ' ' + listing.city + ' OR ' + (listing.zipcode ? listing.zipcode : '');

      var startDate = listing.startDate ? (0, _moment2.default)(listing.startDate.toString()).format('dddd, MMMM D, YYYY') : null;
      var endDate = listing.endDate ? (0, _moment2.default)(listing.endDate.toString()).format('dddd, MMMM D, YYYY') : null;

      var overlayStartDate = listing.startDate ? (0, _moment2.default)(listing.startDate.toString()).format('MMM DD') : null;
      var overlayEndDate = listing.endDate ? (0, _moment2.default)(listing.endDate.toString()).format('MMM DD') : null;

      var niceDate = startDate === endDate ? startDate : startDate + ' - ' + endDate;
      var overlayDate = startDate === endDate ? overlayStartDate : overlayStartDate + ' - ' + overlayEndDate;

      var description = listing.description.split(' ');
      var longDesc = false;
      if (description.length > 35) {
        description = description.slice(0, 35);
        description = description.join(' ');
        description = description + ' ...';
        longDesc = true;
      } else {
        description = description.join(' ');
      }

      var postType = this.props.listingType;
      var placeType = 'Place';

      switch (postType) {
        case 'dine':
          placeType = 'FoodEstablishment';
          break;
        case 'sip':
          placeType = 'FoodEstablishment';
          break;
        case 'stay':
          placeType = 'LodgingBusiness';
          break;
        case 'activities':
          placeType = 'LocalBusiness';
          break;
        default:
          placeType = 'Place';
      }

      return _react2.default.createElement(
        'div',
        { className: 'card', itemScope: true, itemType: 'http://schema.org/' + placeType },
        _react2.default.createElement(
          'div',
          {
            className: 'card-image',
            itemProp: 'image',
            itemScope: true,
            itemType: 'http://schema.org/ImageObject',
            style: {
              backgroundImage: listing.image !== '' ? 'url("' + listing.image + '")' : 'url("../wp-content/themes/visitmcminn/assets/images/graphic_missing_picture_@2x.png"'
            }
          },
          _react2.default.createElement('img', { itemProp: 'url', src: listing.image }),
          this.props.listingType === 'events' ? _react2.default.createElement(
            'h4',
            { className: 'card-overlay' },
            overlayDate
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-content' },
          _react2.default.createElement(
            'div',
            { className: 'card-title' },
            _react2.default.createElement(
              'span',
              { className: 'card-date' },
              niceDate
            ),
            _react2.default.createElement('h4', { itemProp: 'name', dangerouslySetInnerHTML: { __html: listing.title } }),
            listing.price ? _react2.default.createElement(
              'span',
              { className: 'price-rating' },
              listing.price
            ) : ''
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-details' },
            _react2.default.createElement(
              'div',
              {
                className: 'card-address',
                itemProp: 'address',
                itemScope: true,
                itemType: 'http://schema.org/PostalAddress'
              },
              _react2.default.createElement(
                'a',
                { className: 'map-click', href: listingAddress, rel: 'noopener', target: '_blank' },
                listing.address1 ? _react2.default.createElement(
                  'span',
                  { itemProp: 'streetAddress' },
                  listing.address1,
                  ' ',
                  _react2.default.createElement('br', null),
                  listing.address2 ? _react2.default.createElement(
                    'span',
                    null,
                    listing.address2,
                    ' ',
                    _react2.default.createElement('br', null)
                  ) : null
                ) : null,
                _react2.default.createElement(
                  'span',
                  { itemProp: 'addressLocality' },
                  listing.city
                ),
                ',',
                ' ',
                _react2.default.createElement(
                  'span',
                  { itemProp: 'addressRegion' },
                  'OR'
                ),
                ' ',
                _react2.default.createElement(
                  'span',
                  { itemProp: 'postalCode' },
                  listing.zipcode
                )
              )
            ),
            this.props.listingType !== 'events' ? _react2.default.createElement(
              'div',
              { className: 'card-website' },
              _react2.default.createElement(
                'a',
                {
                  className: 'website-click',
                  itemProp: 'url',
                  href: listing.website,
                  rel: 'noopener',
                  target: '_blank'
                },
                'Website'
              )
            ) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-description' },
            _react2.default.createElement('span', { itemProp: 'description', dangerouslySetInnerHTML: { __html: description } }),
            longDesc || this.props.listingType === 'events' ? _react2.default.createElement(
              'a',
              { href: listing.link, className: 'card-link btn-arrow' },
              'Read More'
            ) : null
          )
        ),
        _react2.default.createElement(
          'a',
          {
            href: '/wp-admin/post.php?post=' + listing.id + '&action=edit',
            className: 'edit-link',
            target: '_blank'
          },
          'Edit Listing'
        )
      );
    }
  }]);

  return Card;
}(_react.Component);

Card.propTypes = {
  listing: _propTypes2.default.object
};

Card.defaultProps = {
  listing: {}
};

exports.default = Card;