/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductGalleryItem from './ProductGalleryItem';

const ProductGallery = ({ PhotoGallery, CurrentPhoto, SelectPhoto }) => {
  const [currentView, setCurrentView] = useState(0);

  useEffect(() => {
    if (CurrentPhoto.index > currentView || CurrentPhoto.index < currentView) {
      setCurrentView(Math.floor(CurrentPhoto.index / 7) * 7);
    }
  }, [CurrentPhoto]);

  const generateThumbnails = () => {
    const gallery = [];
    for (let start = currentView, i = 0; start < PhotoGallery.length && i < 7; start += 1, i += 1) {
      const position = i * 13;
      gallery.push(
        <ProductGalleryItem
          position={position}
          photo={PhotoGallery[start]}
          SelectPhoto={SelectPhoto}
          selectedPhoto={PhotoGallery[start] === CurrentPhoto}
          key={`PhotoGallery-${start}`}
        />,
      );
    }
    return gallery;
  };
  const galleryReducer = (direction) => {
    let newIndex = direction;
    if (newIndex < 0) {
      // newIndex = photoGallery.length - 1;
      newIndex = 0;
    } else if (newIndex >= PhotoGallery.length) {
      // newIndex = 0;
      newIndex -= 7;
    }
    setCurrentView(newIndex);
  };
  return (
    <div className="overview-gallery-thumbnails">
      <div className="overview-gallery-thumbnails-wrapper">
        <button
          type="button"
          onClick={() => galleryReducer(currentView + 7)}
          className="overview-gallery-increment"
        >
          <i className="fas fa-chevron-down fa-lg rounded-circle overview-gallery-icon" style={{ overflow: 'hidden', fontSize: '2em' }} />
        </button>
        <button
          type="button"
          onClick={() => galleryReducer(currentView - 7)}
          className="overview-gallery-decrement"
        >
          <i className="fas fa-chevron-up fa-lg rounded-circle overview-gallery-icon" style={{ overflow: 'hidden', fontSize: '2em' }} />
        </button>
        {generateThumbnails()}
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  SelectPhoto: PropTypes.func.isRequired,
  CurrentPhoto: PropTypes.object.isRequired,
  PhotoGallery: PropTypes.array.isRequired,
};

export default ProductGallery;
