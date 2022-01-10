import {
  BowlChopsticks16Regular,
  Clock16Regular,
  Heart16Regular,
} from '@fluentui/react-icons';
import ImageRecipe from '@img/recipe-6.png';

const PopularRecipe = () => {
  return (
    <div className='px-layout mt-8'>
      <h1 className='text-xl mb-3 font-medium'>Popular Recipe</h1>
      <div className='flex items-center justify-between p-3 border border-gray-400 rounded-2xl'>
        <div>
          <p className='text-md mb-2 font-medium'>Kari Daging Sapi</p>
          <div className='text-xs flex items-center text-gray-800 mb-4'>
            <p className='flex'>
              <Heart16Regular className='mr-1 text-red-500 inline-block' />
              <span>4.9</span>
            </p>
            <span className='mx-2'>|</span>
            <p>
              <span className='mr-1'>103</span>
              <span>Reviews</span>
            </p>
          </div>
          <div className='flex gap-3'>
            <div className='inline-flex items-center'>
              <span className='text-gray-600 pr-1'>
                <Clock16Regular />
              </span>
              <p className='text-sm text-gray-800'>40 min</p>
            </div>
            <div className='inline-flex items-center'>
              <span className='text-gray-600 pr-1 -mt-0.5'>
                <BowlChopsticks16Regular />
              </span>
              <p className='text-sm capitalize text-gray-800'>Easy</p>
            </div>
          </div>
        </div>
        <img src={ImageRecipe} alt='s' className='w-24 h-24 rounded-2xl' />
      </div>
    </div>
  );
};

export default PopularRecipe;
