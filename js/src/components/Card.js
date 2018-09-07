import React from 'react'
import PropTypes from 'prop-types'
import { listingType } from '../constants'

const Card = props => {
  let {
    id,
    placeType,
    image,
    overlayDate,
    niceDate,
    title,
    price,
    listingAddress,
    address1,
    address2,
    city,
    zipcode,
    website,
    description,
    link,
    longDesc,
  } = props.listing

  return (
    <div className="card" itemScope itemType={'http://schema.org/' + placeType}>
      <div
        className="card-image"
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
        style={{
          backgroundImage:
            image !== ''
              ? 'url("' + image + '")'
              : 'url("../wp-content/themes/visitmcminn/assets/images/graphic_missing_picture_@2x.png"',
        }}
      >
        <img itemProp="url" src={image} />
        {listingType === 'events' ? (
          <h4 className="card-overlay">{overlayDate}</h4>
        ) : null}
      </div>
      <div className="card-content">
        <div className="card-title">
          <span className="card-date">{niceDate}</span>
          <h4 itemProp="name" dangerouslySetInnerHTML={{ __html: title }} />
          {price ? <span className="price-rating">{price}</span> : ''}
        </div>
        <div className="card-details">
          <div
            className="card-address"
            itemProp="address"
            itemScope
            itemType="http://schema.org/PostalAddress"
          >
            <a
              className="map-click"
              href={listingAddress}
              rel="noopener"
              target="_blank"
            >
              {address1 ? (
                <span itemProp="streetAddress">
                  {address1} <br />
                  {address2 ? (
                    <span>
                      {address2} <br />
                    </span>
                  ) : null}
                </span>
              ) : null}
              <span itemProp="addressLocality">{city}</span>,{' '}
              <span itemProp="addressRegion">OR</span>{' '}
              <span itemProp="postalCode">{zipcode}</span>
            </a>
          </div>
          {listingType !== 'events' ? (
            <div className="card-website">
              <a
                className="website-click"
                itemProp="url"
                href={website}
                rel="noopener"
                target="_blank"
              >
                Website
              </a>
            </div>
          ) : null}
        </div>
        <div className="card-description">
          <span
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {longDesc || listingType === 'events' ? (
            <a href={link} className="card-link btn-arrow">
              Read More
            </a>
          ) : null}
        </div>
      </div>
      {/* <a
        href={'/wp-admin/post.php?post=' + id + '&action=edit'}
        className="edit-link"
        target="_blank"
      >
        Edit Listing
      </a> */}
    </div>
  )
}

Card.propTypes = {
  listing: PropTypes.object,
}

Card.defaultProps = {
  listing: {},
}

export default Card
