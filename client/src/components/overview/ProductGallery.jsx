/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductGalleryItem from './ProductGalleryItem';
import TrackerContext from '../context/Tracker';

const ProductGallery = ({ PhotoGallery, CurrentPhoto, SelectPhoto }) => {
  const [currentView, setCurrentView] = useState(0);
  const { tracking, setTracking } = useContext(TrackerContext);

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
          aria-label="next gallery"
          onClick={(event) => {
            galleryReducer(currentView + 7);
            const tracked = { element: event.target, time: new Date(), module: 'Gallery Increment' };
            setTracking([...tracking, tracked]);
          }}
          className="overview-gallery-increment"
        >
          <i className="fas fa-chevron-down fa-lg rounded-circle overview-gallery-icon" style={{ overflow: 'hidden', fontSize: '2em' }} />
        </button>
        <button
          type="button"
          aria-label="previous gallery"
          onClick={(event) => {
            galleryReducer(currentView - 7);
            const tracked = { element: event.target, time: new Date(), module: 'Gallery Decrement' };
            setTracking([...tracking, tracked]);
          }}
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
