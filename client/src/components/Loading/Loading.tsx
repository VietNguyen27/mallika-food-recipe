import React from 'react';

const Loading = () => {
  return (
    <div className='absolute top-0 bottom-0 w-full flex justify-center items-center'>
      <div className='relative w-20 h-20 -translate-y-1/2'>
        <span className='absolute opacity-100 border-4 border-orange rounded-full animate-ripple-loading'></span>
        <span className='absolute opacity-0 border-4 border-orange rounded-full animate-ripple-loading animation-delay-negative-1000'></span>
      </div>
    </div>
  );
};

export default Loading;
