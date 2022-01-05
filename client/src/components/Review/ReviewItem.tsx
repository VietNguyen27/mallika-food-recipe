import React from 'react';
import { Heart24Regular, MoreVertical24Filled } from '@fluentui/react-icons';

const ReviewItem = ({ recipe, comment }) => {
  return (
    <li className='px-2 py-3 border-b border-gray-400'>
      <div className='flex gap-2'>
        <div className='relative w-12 h-12 flex-shrink-0 mt-1 rounded-lg overflow-hidden'>
          <img
            src={recipe.image}
            className='absolute w-full h-full object-cover'
            alt={recipe.title}
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-center pb-1'>
            <h3 className='text-gray-800 text-xs pr-2'>{recipe.title}</h3>
            <div className='flex gap-1 w-14 flex-shrink-0'>
              <button className='text-gray-600'>
                <Heart24Regular />
              </button>
              <button className='text-gray-600'>
                <MoreVertical24Filled />
              </button>
            </div>
          </div>
          <p className='leading-5'>{comment}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
