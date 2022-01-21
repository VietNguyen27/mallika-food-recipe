import React from 'react';

export const FeatureCardSkeleton = () => {
  return (
    <li className='mb-8 last:mb-0'>
      <div className='relative w-full h-0 pb-[62.5%] bg-gray-200 animate-pulse rounded-2xl overflow-hidden'></div>
      <div className='my-2 h-6 w-4/5 bg-gray-200 animate-pulse rounded'></div>
      <div className='flex items-center mt-1'>
        <div className='w-10 h-10 bg-gray-200 animate-pulse rounded-full mr-3'></div>
        <div className='flex-1'>
          <div className='w-4/5 w- h-4 bg-gray-200 animate-pulse rounded'></div>
          <div className='w-1/2 h-4 bg-gray-200 animate-pulse rounded mt-1.5'></div>
        </div>
        <div className='w-6 h-6 bg-gray-200 animate-pulse rounded-full'></div>
      </div>
    </li>
  );
};
