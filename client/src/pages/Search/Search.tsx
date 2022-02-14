import { ChangeEvent, useEffect, useState, useRef } from 'react';
import LastSeen from './components/LastSeen';
import RecentSearch from './components/RecentSearch';
import SearchInput from '@components/Input/SearchInput';
import { ArrowLeft20Filled, Search24Regular } from '@fluentui/react-icons';
import SearchResults from './components/SearchResults';
import useDebounce from '@hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  findRecipesByTitle,
  findRecipesByIngredient,
  findUsersByNameOrEmail,
  searchCookbooksByName,
  clearSearchResults,
} from '@features/search-slice';
import { RootState } from '@redux/reducers';
import axios from 'axios';

const Search = () => {
  const initialLabel = 'recipe';
  const [searchLabel, setSearchLabel] = useState<string>(initialLabel);
  const [searchable, setSearchable] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const cancelToken = useRef<any>(null);
  const dispatch = useDispatch();
  const { outOfResults } = useSelector(({ search }: RootState) => search);
  const loading = useSelector(
    ({ loading }: RootState) => loading.searchLoading
  );
  const searchTypes = {
    recipe: findRecipesByTitle,
    user: findUsersByNameOrEmail,
    ingredient: findRecipesByIngredient,
    cookbook: searchCookbooksByName,
  };
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm.trim());

  useEffect(() => {
    dispatch(clearSearchResults());
    if (debouncedSearchTerm) {
      findRecipesOrUsers(searchLabel, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const findRecipesOrUsers = (label, value) => {
    if (cancelToken.current) {
      cancelToken.current.cancel('Operation canceled due to new request.');
    }
    cancelToken.current = axios.CancelToken.source();
    const searchFn = searchTypes[label];
    dispatch(searchFn({ value, token: cancelToken.current.token }));
  };

  const handleScroll = (e) => {
    const searchFn = searchTypes[searchLabel];
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (isBottom && !loading && !outOfResults) {
      dispatch(
        searchFn({ value: searchTerm.trim(), token: cancelToken.current.token })
      );
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
        {searchable ? (
          <SearchResults
            searchTerm={searchTerm}
            findRecipesOrUsers={findRecipesOrUsers}
            setSearchLabel={setSearchLabel}
            handleScroll={handleScroll}
          />
        ) : (
          <>
            {/* <RecentSearch /> */}
            <LastSeen />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
