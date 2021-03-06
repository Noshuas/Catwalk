/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './context/Theme';

const StarRatings = ({
  ReviewsRatings = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
  },
}) => {
  const { themeMode } = useContext(ThemeContext);

  const getAvarageRatings = () => {
    const one = ReviewsRatings[1];
    const two = ReviewsRatings[2];
    const three = ReviewsRatings[3];
    const four = ReviewsRatings[4];
    const five = ReviewsRatings[5];
    const total = (1 * parseInt(one, 10)) + (2 * parseInt(two, 10)) + (3 * parseInt(three, 10))
      + (4 * parseInt(four, 10)) + (5 * parseInt(five, 10));
    const weightedtotal = parseInt(one, 10) + parseInt(two, 10) + parseInt(three, 10)
      + parseInt(four, 10) + parseInt(five, 10);
    return total / weightedtotal;
  };
  const average = (Math.round(getAvarageRatings() * 4) / 4).toFixed(2);
  const fullStars = () => {
    const stars = [];
    for (let i = 0; i < Math.floor(average / 1); i += 1) {
      stars.push(<div className={`star-100 star-muted ${themeMode === 'Light' ? '' : 'filter-invert'}`} key={`StarFull-${i}`} />);
    }
    return stars;
  };
  const partialStars = () => {
    const partial = average - (Math.floor(average / 1));
    const stars = [];
    switch (partial) {
      case (0.25):
        stars.push(<div className={`star-25 star-muted ${themeMode === 'Light' ? '' : 'filter-invert'}`} key={`StarPartial-${stars.length}`} />);
        break;
      case (0.5):
        stars.push(<div className={`star-50 star-muted ${themeMode === 'Light' ? '' : 'filter-invert'}`} key={`StarPartial-${stars.length}`} />);
        break;
      case (0.75):
        stars.push(<div className={`star-75 star-muted ${themeMode === 'Light' ? '' : 'filter-invert'}`} key={`StarPartial-${stars.length}`} />);
        break;
      default:
        break;
    }
    for (let i = 0; i < Math.floor(5 - average); i += 1) {
      stars.push(<div className={`star-empty star-muted ${themeMode === 'Light' ? '' : 'filter-invert'}`} key={`StarEmpty-${i}`} />);
    }
    return stars;
  };
  partialStars();
  return (
    <>
      { fullStars() }
      { partialStars() }
    </>
  );
};

StarRatings.propTypes = {
  ReviewsRatings: PropTypes.object.isRequired,
};

export default StarRatings;
