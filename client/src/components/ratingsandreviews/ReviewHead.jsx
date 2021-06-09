import React from 'react';
import PropTypes from 'prop-types';

const ReviewHead = ({ rating, reviewerName, date }) => {
  // const verification = (isVerified(reviewerName)) ? (<div className="verification" />) : '';
  return (
    <div className="reviewHead">
      <span>Star Component</span>
      <span className="reviewInfo">
        {/* {verification} */}
        <span>{reviewerName}</span>
        <span>{date}</span>
      </span>
    </div>
  );
};

ReviewHead.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewerName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ReviewHead;