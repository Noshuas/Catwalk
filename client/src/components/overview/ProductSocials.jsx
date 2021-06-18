/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import ThemeContext from '../context/Theme';
import TrackerContext from '../context/Tracker';

const ProductSocials = () => {
  const { tracking, setTracking } = useContext(TrackerContext);
  const { themeMode } = useContext(ThemeContext);
  const handleFacebook = (event) => {
    // when we deploy. only difference is the u
    // window.open(`https://www.facebook.com/sharer.php?u=${window.location.href}`, '_blank');
    const tracked = { element: event.target, time: new Date(), module: 'Share to Facebook' };
    setTracking([...tracking, tracked]);
    window.open(`https://www.facebook.com/sharer.php?${window.location.href}`, '_blank');
  };
  const handleTwitter = (event) => {
    const tracked = { element: event.target, time: new Date(), module: 'Share to Twitter' };
    setTracking([...tracking, tracked]);
    window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=From Hack Reactor Student Front End Capstone Project!&hashtags=FEC,HackReactor,Bootcamp,Student`, '_blank');
  };
  const handlePinterest = (event) => {
    const tracked = { element: event.target, time: new Date(), module: 'Share to Pintrest' };
    setTracking([...tracking, tracked]);
    window.open(`http://pinterest.com/pin/create/button/?url=${window.location.href}&description=Hack Reactor Student FEC`, '_blank');
  };
  return (
    <div className="d-flex mt-2 border-tertiary">
      <button
        type="button"
        className={`btn text-light social-icon bg-transparent shadow cursor-pointer ${themeMode === 'Light' ? 'border-primary btn-focus' : 'border-tertiary btn-focus-dark'}`}
        onClick={handleFacebook}
        aria-label="share to facebook"
        style={{ fontSize: '2rem' }}
      >
        <i className="fab fa-facebook-square fa-lg fb-text-color" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`btn text-light social-icon bg-transparent shadow cursor-pointer ${themeMode === 'Light' ? 'border-primary btn-focus' : 'border-tertiary btn-focus-dark'}`}
        onClick={handleTwitter}
        aria-label="share to twitter"
        style={{ fontSize: '2rem' }}
      >
        <i className="fab fa-twitter-square fa-lg twtr-text-color cursor-pointer" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`btn text-light social-icon bg-transparent shadow  ${themeMode === 'Light' ? 'border-primary btn-focus' : 'border-tertiary btn-focus-dark'}`}
        onClick={handlePinterest}
        aria-label="share to pintrest"
        style={{ fontSize: '2rem' }}
      >
        <i className="fab fa-pinterest-square fa-lg pins-text-color cursor-pointer" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProductSocials;
