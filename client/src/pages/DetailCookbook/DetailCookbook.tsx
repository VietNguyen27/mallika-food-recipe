import LandingImage from '@img/landing-page.jfif';
import PopularRecipe from './components/PopularRecipe';
import AllRecipe from './components/AllRecipe';
import SearchInput from '@components/Input/SearchInput';
import { useForm } from 'react-hook-form';
import {
  ChevronLeft24Regular,
  Edit24Regular,
  Search24Regular,
} from '@fluentui/react-icons';
import RoundedButton, {
  RoundedButtonSizes,
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';

const DetailCookbook = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='relative h-full overflow-auto scrollbar-none pb-20'>
      <RoundedButton
        className='absolute z-10 top-4 left-3 cursor-pointer'
        variant={RoundedButtonVariants.SECONDARY}
        size={RoundedButtonSizes.MEDIUM}
      >
        <ChevronLeft24Regular />
      </RoundedButton>
      <RoundedButton
        className='absolute z-10 right-3 top-4 cursor-pointer'
        variant={RoundedButtonVariants.SECONDARY}
        size={RoundedButtonSizes.MEDIUM}
      >
        <Edit24Regular />
      </RoundedButton>
      <img src={LandingImage} alt='recipe soup' />
      <div className='relative w-full -mt-14 flex items-center justify-center'>
        <div className='rounded-2xl flex items-center justify-center flex-col text-center border border-gray-400 h-full mb-auto bg-white p-5 mx-4'>
          <h1 className='text-xl mb-3 font-medium'>Menu ayam spesial</h1>
          <p className='text-sm text-gray-800 mb-3'>
            Keep it easy with these simple but delicious recipes.
          </p>
          <div className='relative before:absolute before:top-0 before:bottom-0 before:bg-gray-400 before:w-px flex justify-around text-center font-medium w-full items-center'>
            <div>
              <span className='mr-3'>1,3k</span>
              <span>Likes</span>
            </div>
            <div>
              <span className='mr-3'>7</span>
              <span>Recipes</span>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className='px-layout pt-4'>
        <SearchInput
          placeholder='Recipe Title, Ingredient'
          className='px-4 py-3 bg-gray-100'
          {...register('search')}
          suffix={
            <button
              type='submit'
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-800'
              tabIndex={-1}
            >
              <Search24Regular />
            </button>
          }
        />
      </form>
      <PopularRecipe />
      <AllRecipe />
    </div>
  );
};

export default DetailCookbook;
