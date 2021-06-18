/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line import/no-unresolved
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductGallery from './ProductGallery';
import ProductExpandedView from './ProductExpandedView';
import TrackerContext from '../context/Tracker';
import ThemeContext from '../context/Theme';

const ProductCarousel = ({ Photos }) => {
  // hello
  const [currentPhoto, setCurrentPhoto] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoGallery, setPhotoGallery] = useState([]);
  const [photoStyle, setPhotoStyle] = useState();
  const [restrict, setRestrict] = useState('null');
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const { tracking, setTracking } = useContext(TrackerContext);
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    if (!expanded) {
      setZoomed(false);
    }
  }, [expanded]);

  useEffect(async () => {
    if (Photos) {
      let photos = [];
      Photos.forEach((photo, index) => {
        photos = [...photos, { photo, index }];
      });
      setPhotoGallery(photos);
      if (!currentPhoto) {
        setCurrentPhoto(photos[0]);
        setCurrentIndex(0);
      }
      if (photos.length < currentIndex) {
        setCurrentIndex(photos.length - 1);
      }
      setCurrentPhoto(photos[currentIndex]);
    }
  }, [Photos]);

  useEffect(() => {
    if (currentPhoto && currentPhoto.photo && currentPhoto.photo.url !== null) {
      // setPhotoStyle({
      //   backgroundImage: `url(${currentPhoto.url})`,
      //   backgroundSize: 'contain',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundColor: 'transparent',
      // });
      setPhotoStyle(currentPhoto.photo.url);
      if (currentPhoto.index >= photoGallery.length - 1) {
        setRestrict('increment');
      } else if (currentPhoto.index <= 0) {
        setRestrict('decrement');
      } else {
        setRestrict('none');
      }
      setCurrentIndex(currentPhoto.index);
    }
  }, [currentPhoto]);

  const carouselReducer = (direction) => {
    let newIndex = direction;
    if (newIndex < 0) {
      // newIndex = photoGallery.length - 1;
      newIndex = 0;
    } else if (newIndex >= photoGallery.length) {
      // newIndex = 0;
      newIndex = photoGallery.length - 1;
    }
    setCurrentPhoto(photoGallery[newIndex]);
  };

  return (
    <div
      className="transition-basic overview-gallery text-center mx-auto my-4"
      style={!expanded ? { position: 'relative' } : {}}
    >
      { photoStyle && photoStyle !== null ? (
        <>
          <ProductExpandedView
            expanded={expanded}
            setExpanded={setExpanded}
            photoStyle={photoStyle}
            zoomed={zoomed}
            setZoomed={setZoomed}
          />
          <div
            className="overview-carousel "
            style={{
              // backgroundImage: `url(${photoStyle})`,
              // backgroundSize: 'contain',
              // backgroundPosition: 'center',
              // backgroundRepeat: 'no-repeat',
              // transition: 'all .15s ease-out',
            }}
          >
            { currentPhoto && currentPhoto.photo && currentPhoto.photo.url && !expanded ? (
              <>
                <ProductGallery
                  PhotoGallery={photoGallery}
                  CurrentPhoto={currentPhoto}
                  SelectPhoto={setCurrentPhoto}
                />
              </>
            ) : null}
            <div
              onClick={(event) => {
                setExpanded(!expanded);
                const tracked = { element: event.target, time: new Date(), module: `Picture expander. Status: ${!expanded}` };
                setTracking([...tracking, tracked]);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setExpanded(!expanded);
                  const tracked = { element: event.target, time: new Date(), module: `Picture expander. Status: ${!expanded}` };
                  setTracking([...tracking, tracked]);
                }
              }}
              style={{
                color: 'transparent',
                position: 'absolute',
                backgroundColor: 'transparent',
                left: 'min(10em, 20%)',
                right: '0',
                top: '0',
                bottom: '0',
                width: 'calc(100% - min(20em, 40%))',
                cursor: 'zoom-in',
              }}
              role="button"
              aria-label="expand main image"
              tabIndex="0"
            >
              expand image
            </div>
            {restrict !== 'decrement' && !zoomed && restrict !== 'null' ? (
              <button
                aria-label="previous image"
                type="button"
                className="overview-carousel-decrement"
                style={expanded ? { left: '0' } : null}
                onClick={(event) => {
                  carouselReducer(currentPhoto.index - 1);
                  const tracked = { element: event.target, time: new Date(), module: 'Carousel decrement' };
                  setTracking([...tracking, tracked]);
                }}
              >
                <i className="fas fa-chevron-left fa-lg rounded-circle overview-carousel-icon" aria-hidden="true" style={{ overflow: 'hidden', fontSize: '2em' }} />
              </button>
            ) : null}
            {restrict !== 'increment' && !zoomed && restrict !== 'null' ? (
              <button
                type="button"
                aria-label="next image"
                className="overview-carousel-increment"
                style={expanded ? { left: '100%' } : null}
                onClick={(event) => {
                  carouselReducer(currentPhoto.index + 1);
                  const tracked = { element: event.target, time: new Date(), module: 'Carousel increment' };
                  setTracking([...tracking, tracked]);
                }}
              >
                <i className="fas fa-chevron-right fa-lg rounded-circle overview-carousel-icon" aria-hidden="true" style={{ overflow: 'hidden', fontSize: '2em' }} />
              </button>
            ) : null}
          </div>
        </>
      )
        : (
          <div style={{ width: '100%', height: '100%', fontSize: '10em' }} className={`rounded-sm d-flex align-items-center ${themeMode === 'Light' ? 'text-muted bg-light' : 'text-muted-light bg-dark'}`}>
            <span className="mx-auto no-cursor">NO IMAGE</span>
          </div>
        )}

    </div>
  );
};

ProductCarousel.propTypes = {
  Photos: PropTypes.array.isRequired,
};

export default ProductCarousel;
