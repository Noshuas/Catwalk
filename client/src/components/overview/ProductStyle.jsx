/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrackerContext from '../context/Tracker';
import ThemeContext from '../context/Theme';

const ProductStyle = ({ Style, setCurrentStyle, CurrentStyle }) => {
  const { tracking, setTracking } = useContext(TrackerContext);
  const [altDivs, setAltDivs] = useState(<span>Test</span>);
  const [currentClass, setCurrentClass] = useState('styles-icon no-clicker shadow d-flex align-items-center');
  const { themeMode } = useContext(ThemeContext);
  useEffect(() => {
    if (!Style.photos[0].thumbnail_url && Style && Style.name) {
      const split = Style.name.split(' & ');
      const [[a], [b]] = split;
      let [c, d] = split;
      c = c.split(' ')[0].toLowerCase();
      d = d.split(' ')[0].toLowerCase();
      if (b) {
        setAltDivs(
          <span className="mx-auto">
            <span className="h3" style={{ color: c, opacity: '60%', filter: 'brightness(90%)' }}>{a}</span>
            <span className="h3 text-dark" style={{ opacity: '90%' }}>&</span>
            <span className="h3" style={{ color: d, opacity: '60%', filter: 'brightness(90%)' }}>{b}</span>
          </span>,
        );
      } else {
        setAltDivs(
          <span style={{ color: c }}>{a}</span>,
        );
      }
    }
    // {`styles-icon no-clicker shadow d-flex align-items-center
    //       ${Style.style_id === CurrentStyle.style_id ? 'styles-selected' : popStyle}
    //       ${themeMode === 'Light' ? 'bg-light-dark' :
    // 'bg-dark-light styles-selected-dark-mode'}`}
  }, [Style]);

  useEffect(() => {
    if (Style.style_id === CurrentStyle.style_id) {
      if (themeMode === 'Light') {
        setCurrentClass('styles-icon no-clicker shadow d-flex align-items-center styles-selected bg-light-dark');
      } else {
        setCurrentClass('styles-icon no-clicker shadow d-flex align-items-center styles-selected-dark-mode bg-dark-light');
      }
    } else if (Style.style_id !== CurrentStyle.style_id) {
      if (themeMode === 'Light') {
        setCurrentClass('styles-icon no-clicker shadow d-flex align-items-center styles-pop bg-dark-light');
      } else {
        setCurrentClass('styles-icon no-clicker shadow d-flex align-items-center styles-pop-light bg-dark-light');
      }
    }
  }, [CurrentStyle, themeMode]);

  return (
    <button
      type="button"
      className={`styles-wrapper cursor-pointer py-2 rounded-circle ${themeMode === 'Light' ? 'btn-focus-light' : 'btn-focus-dark'}`}
      onClick={(event) => {
        setCurrentStyle(Style);
        const tracked = { element: event.target, time: new Date(), module: 'Product Style Selector' };
        setTracking([...tracking, tracked]);
      }}
      aria-label={`style ${Style.name}`}
    >
      <div
        className={currentClass}
        alt="thumbnail preview"
        style={{
          backgroundImage: `url("${Style.photos[0].thumbnail_url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* { Style.photos[0].thumbnail_url === null
          ? (<span
              className={`mx-auto h3
              ${themeMode === 'Light' ? 'text-muted' : 'text-muted-light'}`}
            >
              {altName}
            </span>
          ) : null} */}
        { Style.photos[0].thumbnail_url === null
          ? (
            altDivs
          ) : null}
      </div>
    </button>
  );
};

ProductStyle.propTypes = {
  Style: PropTypes.object.isRequired,
  setCurrentStyle: PropTypes.func.isRequired,
  CurrentStyle: PropTypes.object.isRequired,
};

export default ProductStyle;
