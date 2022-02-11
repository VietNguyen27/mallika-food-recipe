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

export const RecipeSkeleton = () => {
  return (
    <li className='py-3 px-layout border-b border-gray-400'>
      <div className='relative flex gap-2'>
        <div className='w-14 h-14 flex-shrink-0 bg-gray-200 animate-pulse rounded-lg overflow-hidden'></div>
        <div className='w-full'>
          <div className='w-4/5 h-3.5 bg-gray-200 animate-pulse rounded-sm'></div>
          <div className='w-3/5 h-3.5 bg-gray-200 animate-pulse mt-1 rounded-sm'></div>
          <div className='flex mt-2'>
            <div className='w-16 h-3.5 bg-gray-200 animate-pulse rounded-sm'></div>
            <div className='w-12 h-3.5 bg-gray-200 animate-pulse ml-3 rounded-sm'></div>
          </div>
        </div>
        <div className='absolute top-0 right-2 w-2 h-6 bg-gray-200 animate-pulse rounded-sm'></div>
      </div>
    </li>
  );
};

export const RecipeDetailSkeleton = () => {
  return (
    <div className='h-full overflow-scroll scrollbar-none'>
      <div className='h-[150%]'>
        <div className='relative h-[30%] bg-gray-100'>
          <div className='absolute top-4 left-4 w-12 h-12 bg-gray-200 animate-pulse rounded-full'></div>
          <div className='absolute top-4 right-4 w-12 h-12 bg-gray-200 animate-pulse rounded-full'></div>
          <div className='absolute bottom-0 left-0 w-full h-12 px-layout'>
            <div className='h-full rounded-t-2xl bg-white'></div>
          </div>
        </div>
        <div className='flex flex-col gap-3 h-[43%] px-layout -mt-12'>
          <div className='h-3/5 bg-gray-200 animate-pulse rounded-2xl'></div>
          <div className='h-2/5 bg-gray-200 animate-pulse rounded-2xl'></div>
        </div>
        <div className='h-1/2 bg-gray-200 animate-pulse mt-4'></div>
      </div>
    </div>
  );
};

export const ReviewSkeleton = () => {
  return (
    <li className='px-layout py-3'>
      <div className='flex gap-2'>
        <div className='relative w-8 h-8 flex-shrink-0 mt-1 bg-gray-200 animate-pulse rounded-full'></div>
        <div className='w-full'>
          <div className='flex justify-between items-center pb-1'>
            <div className='w-4/5 h-3 bg-gray-200 animate-pulse rounded-sm'></div>
            <div className='flex-shrink-0 w-2 h-6 bg-gray-200 animate-pulse rounded-sm'></div>
          </div>
          <div className='flex w-[68px] h-2 -mt-1.5 mb-1.5 bg-gray-200 animate-pulse rounded-sm'></div>
          <div className='w-full h-3 bg-gray-200 mb-1 animate-pulse rounded-sm'></div>
          <div className='w-24 h-2 bg-gray-200 animate-pulse rounded-sm'></div>
        </div>
      </div>
    </li>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className='h-full overflow-scroll scrollbar-none'>
      <div className='h-[150%]'>
        <div className='px-layout'>
          <div className='h-6 bg-gray-200 animate-pulse rounded'></div>
          <div className='pt-4'>
            <div className='flex justify-between items-center gap-4'>
              <div className='w-[72px] h-[72px] flex-shrink-0 bg-gray-200 animate-pulse rounded-full'></div>
              <div className='w-[180px] h-12 bg-gray-200 animate-pulse rounded'></div>
            </div>
          </div>
          <div className='flex flex-col items-start pt-2'>
            <div className='w-2/3 h-6 bg-gray-200 animate-pulse rounded'></div>
            <div className='w-full h-4 bg-gray-200 animate-pulse rounded mt-2'></div>
            <div className='w-1/3 h-4 bg-gray-200 animate-pulse rounded mt-2'></div>
          </div>
          <div className='flex gap-3 pb-2 pt-4'>
            <div className='relative h-9 py-1.5 px-2 rounded-3xl flex-1 bg-gray-200 animate-pulse'></div>
            <div className='relative h-9 py-1.5 px-2 rounded-3xl flex-1 bg-gray-200 animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserCardSkeleton = () => {
  return (
    <div className='py-3 px-layout'>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex-shrink-0 rounded-full bg-gray-200 animate-pulse'></div>
        <div className='w-full flex flex-col gap-1'>
          <div className='w-4/5 h-3 bg-gray-200 animate-pulse rounded-sm'></div>
          <div className='w-1/2 h-4 bg-gray-200 animate-pulse rounded-sm'></div>
        </div>
      </div>
    </div>
  );
};
