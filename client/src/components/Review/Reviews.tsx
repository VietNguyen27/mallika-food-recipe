import React from 'react';
import Review from './Review';

const Reviews = ({ reviews }) => {
  return (
    <ul className='flex flex-col items-stretch'>
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </ul>
  );
};

export default Reviews;
