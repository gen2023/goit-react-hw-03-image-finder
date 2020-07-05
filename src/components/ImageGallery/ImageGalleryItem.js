import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={largeImageURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
