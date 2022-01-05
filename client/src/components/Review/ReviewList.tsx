import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  return (
    <ul className='flex flex-col items-stretch'>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </ul>
  );
};

export default ReviewList;
