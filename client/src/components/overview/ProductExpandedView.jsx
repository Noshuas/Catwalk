import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrackerContext from '../context/Tracker';
import ThemeContext from '../context/Theme';

const ProductExpandedView = ({
  expanded, setExpanded, photoStyle, zoomed, setZoomed,
}) => {
  const [imageStyle, setImageStyle] = useState({
    backgroundImage: `url(${photoStyle})`,
    backgroundSize: zoomed ? 'contain' : 'contain',
    backgroundRepeat: 'no-repeat',
    transform: zoomed ? 'scale(2.5, 2.5)' : '',
  });
  const [mousePosition, setMousePosition] = useState();
  const { tracking, setTracking } = useContext(TrackerContext);
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    setImageStyle({
      backgroundSize: zoomed ? 'contain' : 'contain',
      transform: zoomed ? mousePosition : null,
    });
  }, [zoomed, mousePosition]);

  const trackMouse = (event) => {
    if (zoomed) {
      setMousePosition(`scale(2.5, 2.5) translate(calc(50% + -${event.clientX}px), calc(50% + -${event.clientY}px))`);
    }
  };
  return (
    <div
      className={`mx-auto d-flex justify-content-center overview-carousel-image-wrapper shadow-down
      ${expanded ? 'overview-expanded-carousel' : ''}
      ${zoomed ? 'cursor-minus' : 'cursor-plus'}
      ${themeMode === 'Light' ? 'bg-light' : 'bg-dark'}`}
      onMouseMove={trackMouse}
    >
      <button
        type="button"
        // src={`${photoStyle}`}
        alt="product"
        aria-label="main image"
        style={{ backgroundImage: `url(${photoStyle})`, ...imageStyle }}
        className={`mx-auto rounded-sm overview-carousel-image transition
          ${zoomed ? 'cursor-minus shadow-no' : 'cursor-plus'}
          ${themeMode === 'Light' ? 'bg-light' : 'bg-dark'}
        `}
        onClick={(event) => {
          setZoomed(!zoomed);
          const tracked = { element: event.target, time: new Date(), module: `Picture zoom-in. Status: ${!zoomed}` };
          setTracking([...tracking, tracked]);
        }}
      >
        {/* <img
          alt="product"
          src={photoStyle}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 'inherit',
          }}
        /> */}
      </button>
      <i
        className="fas fa-expand fa-lg overview-expand-icon"
        style={{
          fontSize: '4rem',
          width: 'fit-content',
          height: 'fit-content',
          padding: '.5em',
          paddingRight: '.2em',
          zIndex: '120',
          opacity: '80%',
          position: 'absolute',
          left: 'calc(100% - 2.5em)',
          top: '1rem',
          bottom: '0',
          right: '0',
        }}
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
        role="button"
        aria-label="expand view"
        tabIndex="0"
      >
        &nbsp;
      </i>
    </div>
  );
};

ProductExpandedView.propTypes = {
  expanded: PropTypes.bool.isRequired,
  photoStyle: PropTypes.string.isRequired,
  setExpanded: PropTypes.func.isRequired,
  zoomed: PropTypes.bool.isRequired,
  setZoomed: PropTypes.func.isRequired,
};

export default ProductExpandedView;
