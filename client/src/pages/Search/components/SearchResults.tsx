import React, { useState } from 'react';
import Recipe from './SearchRecipe';
import User from './SearchUser';
import Cookbook from './SearchCookbook';
import cx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/reducers';
import { clearSearchResults } from '@features/search-slice';

interface SearchResultsProps {
  searchTerm: string;
  findRecipesOrUsers: (label: string, value: string) => void;
  setSearchLabel: (label: string) => void;
  handleScroll: (e: any) => void;
}

const searchTabs = [
  {
    label: 'recipe',
    component: Recipe,
  },
  {
    label: 'user',
    component: User,
  },
  {
    label: 'ingredient',
    component: Recipe,
  },
  {
    label: 'cookbook',
    component: Cookbook,
  },
];

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  findRecipesOrUsers,
  setSearchLabel,
  handleScroll,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const dispatch = useDispatch();
  const { outOfResults } = useSelector(({ search }: RootState) => search);
  const loading = useSelector(
    ({ loading }: RootState) => loading.searchLoading
  );

  const onChangeTab = (label, index) => {
    dispatch(clearSearchResults());
    setSearchLabel(label);
    setCurrentTab(index);

    if (searchTerm) {
      findRecipesOrUsers(label, searchTerm);
    }
  };

  return (
    <div className='absolute top-0 w-full h-full pt-2 bg-white'>
      <ul className='relative flex border-b border-gray-200'>
        {searchTabs.map(({ label }, index) => (
          <li
            className={cx(
              'flex-1 capitalize text-xs text-center cursor-pointer pt-2 pb-3',
              index === currentTab
                ? 'text-black font-semibold'
                : 'text-gray-600'
            )}
            key={index}
            onClick={() => onChangeTab(label, index)}
          >
            {label}
          </li>
        ))}
        <div
          className='absolute left-0 bottom-0 w-20 border-b-2 border-black transition-transform'
          style={{ transform: `translateX(${currentTab * 100}%)` }}
        ></div>
      </ul>
      <div
        className='h-9/10 overflow-auto scrollbar-none pb-4'
        onScroll={handleScroll}
      >
        {searchTabs.map(({ component: Component }, index) => {
          if (index === currentTab) {
            return <Component key={index} />;
          }
          return null;
        })}
        {loading && (
          <p className='text-center pt-2'>Search for "{searchTerm}"</p>
        )}
        {outOfResults && <p className='text-center pt-2'>No more results</p>}
      </div>
    </div>
  );
};

export default SearchResults;
