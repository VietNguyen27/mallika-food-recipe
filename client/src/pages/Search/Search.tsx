import { ChangeEvent, useEffect, useState } from 'react';
import LastSeen from './components/LastSeen';
import RecentSearch from './components/RecentSearch';
import SearchInput from '@components/Input/SearchInput';
import { ArrowLeft20Filled, Search24Regular } from '@fluentui/react-icons';
import SearchResults from './components/SearchResults';
import useDebounce from '@hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchRecipesByTitle,
  searchRecipesByIngredient,
  searchUsersByNameOrEmail,
  clearSearchResults,
} from '@features/search-slice';
import { RootState } from '@redux/reducers';

const Search = () => {
  const initialLabel = 'recipe';
  const [searchLabel, setSearchLabel] = useState<string>(initialLabel);
  const [searchable, setSearchable] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();
  const { loading, outOfResults } = useSelector(
    ({ search }: RootState) => search
  );
  const searchTypes = {
    recipe: searchRecipesByTitle,
    user: searchUsersByNameOrEmail,
    ingredient: searchRecipesByIngredient,
  };
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm.trim());

  useEffect(() => {
    dispatch(clearSearchResults());
    if (debouncedSearchTerm) {
      searchRecipesOrUsers(searchLabel, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const searchRecipesOrUsers = (label, value) => {
    const searchFn = searchTypes[label];
    dispatch(searchFn(value));
  };

  const handleScroll = (e) => {
    const searchFn = searchTypes[searchLabel];
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (isBottom && !loading && !outOfResults) {
      dispatch(searchFn(searchTerm.trim()));
    }
  };

  const onCloseSearchResults = () => {
    setSearchTerm('');
    setSearchable(false);
    setSearchLabel(initialLabel);
    dispatch(clearSearchResults());
  };

  return (
    <div className='h-full pb-16'>
      <div className='flex items-center px-layout pt-4'>
        {searchable && (
          <ArrowLeft20Filled
            className='flex-shrink-0 cursor-pointer mr-3'
            onClick={() => onCloseSearchResults()}
          />
        )}
        <SearchInput
          name='search'
          placeholder={`Search ${searchLabel}`}
          className='px-4 py-3 bg-gray-100'
          containerClassName='w-full'
          value={searchTerm}
          onFocus={() => setSearchable(true)}
          onBlur={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value.trim())
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          suffix={
            <button
              type='submit'
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-800 pointer-events-none'
              tabIndex={-1}
            >
              <Search24Regular />
            </button>
          }
        />
      </div>
      <div className='relative h-9/10 mt-4 overflow-auto scrollbar-none'>
        <RecentSearch />
        <LastSeen />
        {searchable && (
          <SearchResults
            searchTerm={searchTerm}
            searchRecipesOrUsers={searchRecipesOrUsers}
            setSearchLabel={setSearchLabel}
            handleScroll={handleScroll}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
