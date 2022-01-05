import { Search24Regular } from '@fluentui/react-icons';
import LastSeen from './components/LastSeen';
import RecentSearch from './components/RecentSearch';

const Search = () => {
  return (
    <div className='h-full overflow-auto scrollbar-none pb-20'>
      <h1 className='text-xl font-medium py-4 text-center border-b border-gray-400'>
        Search Recipe
      </h1>
      <div className='px-5 mt-4'>
        <div className='relative'>
          <input
            type='text'
            className='p-3 block w-full bg-gray-100 outline-0 rounded-3xl text-sm placeholder-gray-800'
            name='recipe-search'
            placeholder='Recipe Title, Ingredient'
            autoComplete='off'
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-800'
            tabIndex={-1}
          >
            <Search24Regular />
          </button>
        </div>
      </div>
      <RecentSearch />
      <LastSeen />
    </div>
  );
};

export default Search;
