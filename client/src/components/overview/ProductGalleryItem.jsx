/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrackerContext from '../context/Tracker';
import ThemeContext from '../context/Theme';

const ProductGalleryItem = ({
  position, photo, selectedPhoto, SelectPhoto,
}) => {
  const { tracking, setTracking } = useContext(TrackerContext);
  const { themeMode } = useContext(ThemeContext);
  const [selectedColor, setSelectedColor] = useState('bg-primary');

  useEffect(() => {
    if (themeMode === 'Light') {
      setSelectedColor('bg-primary border-primary');
    } else {
      setSelectedColor('bg-tertiary border-tertiary');
    }
  }, [themeMode]);

  const boilerThumbnail = {
    position: 'absolute',
    height: '10%',
    left: '20%',
  };
  return (
    <div
      className="overview-gallery-thumbnail"
      style={{
        ...boilerThumbnail,
        // backgroundImage: `url(${PhotoGallery[start].photo.thumbnail_url})`,
        // backgroundSize: 'contain',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundColor: 'transparent',
        top: `calc(${position}% + 5%)`,
      }}
      onClick={(event) => {
        SelectPhoto(photo);
        const tracked = { element: event.target, time: new Date(), module: 'Gallery Icon Selector' };
        setTracking([...tracking, tracked]);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          SelectPhoto(photo);
          const tracked = { element: event.target, time: new Date(), module: 'Gallery Icon Selector' };
          setTracking([...tracking, tracked]);
        }
      }}
      role="button"
      tabIndex="0"
    >
      <img
        src={photo.photo.thumbnail_url}
        alt="product thumbnail"
        className={`shadow btn rounded-sm overview-gallery-thumbnail-picture ${selectedPhoto ? `border text-primary overview-gallery-selected ${selectedColor}` : null}`}
      />
    </div>
  );
};

ProductGalleryItem.propTypes = {
  position: PropTypes.number.isRequired,
  photo: PropTypes.object.isRequired,
  selectedPhoto: PropTypes.bool.isRequired,
  SelectPhoto: PropTypes.func.isRequired,
};

export default ProductGalleryItem;
