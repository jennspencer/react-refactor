'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function Card(props) {
  var _props$listing = props.listing,
      id = _props$listing.id,
      placeType = _props$listing.placeType,
      image = _props$listing.image,
      overlayDate = _props$listing.overlayDate,
      niceDate = _props$listing.niceDate,
      title = _props$listing.title,
      price = _props$listing.price,
      listingAddress = _props$listing.listingAddress,
      address1 = _props$listing.address1,
      address2 = _props$listing.address2,
      city = _props$listing.city,
      zipcode = _props$listing.zipcode,
      website = _props$listing.website,
      description = _props$listing.description,
      link = _props$listing.link,
      longDesc = _props$listing.longDesc;


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
          backgroundImage: image !== '' ? 'url("' + image + '")' : 'url("../wp-content/themes/visitmcminn/assets/images/graphic_missing_picture_@2x.png"'
        }
      },
      _react2.default.createElement('img', { itemProp: 'url', src: image }),
      _constants.listingType === 'events' ? _react2.default.createElement(
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
        _react2.default.createElement('h4', { itemProp: 'name', dangerouslySetInnerHTML: { __html: title } }),
        price ? _react2.default.createElement(
          'span',
          { className: 'price-rating' },
          price
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
            {
              className: 'map-click',
              href: listingAddress,
              rel: 'noopener',
              target: '_blank'
            },
            address1 ? _react2.default.createElement(
              'span',
              { itemProp: 'streetAddress' },
              address1,
              ' ',
              _react2.default.createElement('br', null),
              address2 ? _react2.default.createElement(
                'span',
                null,
                address2,
                ' ',
                _react2.default.createElement('br', null)
              ) : null
            ) : null,
            _react2.default.createElement(
              'span',
              { itemProp: 'addressLocality' },
              city
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
              zipcode
            )
          )
        ),
        _constants.listingType !== 'events' ? _react2.default.createElement(
          'div',
          { className: 'card-website' },
          _react2.default.createElement(
            'a',
            {
              className: 'website-click',
              itemProp: 'url',
              href: website,
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
        _react2.default.createElement('span', {
          itemProp: 'description',
          dangerouslySetInnerHTML: { __html: description }
        }),
        longDesc || _constants.listingType === 'events' ? _react2.default.createElement(
          'a',
          { href: link, className: 'card-link btn-arrow' },
          'Read More'
        ) : null
      )
    )
  );
};

Card.propTypes = {
  listing: _propTypes2.default.object
};

Card.defaultProps = {
  listing: {}
};

exports.default = Card;