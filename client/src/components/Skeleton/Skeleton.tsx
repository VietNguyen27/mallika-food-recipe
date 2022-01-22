export const CardSkeleton = () => {
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

export const CardSmallSkeleton = () => {
  return (
    <li className='w-1/2 mb-5 px-1 last:mb-0'>
      <div className='relative w-full h-0 pb-[85%] bg-gray-200 animate-pulse rounded-2xl overflow-hidden'></div>
      <div className='mt-2 h-3.5 bg-gray-200 animate-pulse rounded-sm'></div>
      <div className='mt-1 h-3.5 w-3/5 bg-gray-200 animate-pulse rounded-sm'></div>
      <div className='flex items-center mt-2 relative'>
        <div className='w-8 h-8 bg-gray-200 animate-pulse rounded-full mr-1.5'></div>
        <div className='flex-1'>
          <div className='w-4/5 h-3 bg-gray-200 animate-pulse rounded-sm mb-1'></div>
          <div className='w-2/5 h-3 bg-gray-200 animate-pulse rounded-sm'></div>
        </div>
      </div>
    </li>
  );
};
