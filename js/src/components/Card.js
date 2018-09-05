import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let listing = this.props.listing;
    let listingAddress =
      'https://www.google.com/maps/search/?api=1&query=' +
      listing.address1 +
      ' ' +
      listing.city +
      ' OR ' +
      (listing.zipcode ? listing.zipcode : '');

    let startDate = listing.startDate
      ? moment(listing.startDate.toString()).format('dddd, MMMM D, YYYY')
      : null;
    let endDate = listing.endDate ? moment(listing.endDate.toString()).format('dddd, MMMM D, YYYY') : null;

    let overlayStartDate = listing.startDate ? moment(listing.startDate.toString()).format('MMM DD') : null;
    let overlayEndDate = listing.endDate ? moment(listing.endDate.toString()).format('MMM DD') : null;

    let niceDate = startDate === endDate ? startDate : startDate + ' - ' + endDate;
    let overlayDate = startDate === endDate ? overlayStartDate : overlayStartDate + ' - ' + overlayEndDate;

    let description = listing.description.split(' ');
    let longDesc = false;
    if (description.length > 35) {
      description = description.slice(0, 35);
      description = description.join(' ');
      description = description + ' ...';
      longDesc = true;
    } else {
      description = description.join(' ');
    }

    let postType = this.props.listingType;
    let placeType = 'Place';

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

    return (
      <div className="card" itemScope itemType={'http://schema.org/' + placeType}>
        <div
          className="card-image"
          itemProp="image"
          itemScope
          itemType="http://schema.org/ImageObject"
          style={{
            backgroundImage:
              listing.image !== ''
                ? 'url("' + listing.image + '")'
                : 'url("../wp-content/themes/visitmcminn/assets/images/graphic_missing_picture_@2x.png"'
          }}
        >
          <img itemProp="url" src={listing.image} />
          {this.props.listingType === 'events' ? <h4 className="card-overlay">{overlayDate}</h4> : null}
        </div>
        <div className="card-content">
          <div className="card-title">
            <span className="card-date">{niceDate}</span>
            <h4 itemProp="name" dangerouslySetInnerHTML={{ __html: listing.title }} />
            {listing.price ? <span className="price-rating">{listing.price}</span> : ''}
          </div>
          <div className="card-details">
            <div
              className="card-address"
              itemProp="address"
              itemScope
              itemType="http://schema.org/PostalAddress"
            >
              <a className="map-click" href={listingAddress} rel="noopener" target="_blank">
                {listing.address1 ? (
                  <span itemProp="streetAddress">
                    {listing.address1} <br />
                    {listing.address2 ? (
                      <span>
                        {listing.address2} <br />
                      </span>
                    ) : null}
                  </span>
                ) : null}
                <span itemProp="addressLocality">{listing.city}</span>,{' '}
                <span itemProp="addressRegion">OR</span> <span itemProp="postalCode">{listing.zipcode}</span>
              </a>
            </div>
            {this.props.listingType !== 'events' ? (
              <div className="card-website">
                <a
                  className="website-click"
                  itemProp="url"
                  href={listing.website}
                  rel="noopener"
                  target="_blank"
                >
                  Website
                </a>
              </div>
            ) : null}
          </div>
          <div className="card-description">
            <span itemProp="description" dangerouslySetInnerHTML={{ __html: description }} />
            {longDesc || this.props.listingType === 'events' ? (
              <a href={listing.link} className="card-link btn-arrow">
                Read More
              </a>
            ) : null}
          </div>
        </div>
        <a
          href={'/wp-admin/post.php?post=' + listing.id + '&action=edit'}
          className="edit-link"
          target="_blank"
        >
          Edit Listing
        </a>
      </div>
    );
  }
}

Card.propTypes = {
  listing: PropTypes.object
};

Card.defaultProps = {
  listing: {}
};

export default Card;
