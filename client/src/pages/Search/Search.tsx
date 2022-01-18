import LastSeen from './components/LastSeen';
import RecentSearch from './components/RecentSearch';
import SearchInput from '@components/Input/SearchInput';
import { Search24Regular } from '@fluentui/react-icons';
import { useForm } from 'react-hook-form';

const Search = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='h-full overflow-auto scrollbar-none pb-20'>
      <h1 className='text-xl font-medium py-4 text-center border-b border-gray-400'>
        Search Recipe
      </h1>
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
      <RecentSearch />
      <LastSeen />
    </div>
  );
};

export default Search;
