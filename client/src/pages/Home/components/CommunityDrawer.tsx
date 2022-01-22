import React, { useEffect, useState } from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { getAllRecipes, selectorRecipes } from '@features/recipe-slice';
import { CardSmallSkeleton } from '@components/Skeleton/Skeleton';
import { Options20Regular } from '@fluentui/react-icons';
import useToggle from '@hooks/useToggle';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { TagList, Tag } from '@components/Tag/Tag';
import { CardList, CardSmall } from '@components/Card/Card';
import Button from '@components/Button/Button';
import {
  CATEGORY_NAME,
  RECIPES_BY_CATEGORY,
  RECIPES_BY_SORT,
  SORT_NAME,
} from '@config/recipe';
import cx from 'clsx';

const CommunityDrawer = () => {
  const [category, setCategory] = useState<number>(-1);
  const [sort, setSort] = useState<number>(RECIPES_BY_SORT.RECENTLY);
  const [categorySelected, setCategorySelected] = useState<number>(-1);
  const [sortSelected, setSortSelected] = useState<number>(
    RECIPES_BY_SORT.RECENTLY
  );
  const dispatch = useDispatch();
  const { isShowing, toggle } = useToggle();
  const active = useSelector(({ ui }: RootState) => ui.communityDrawerShowing);
  const loading = useSelector(
    ({ loading }: RootState) => loading.allRecipesLoading
  );
  const recipes = useSelector(selectorRecipes);

  useEffect(() => {
    if (active && !recipes.length) {
      dispatch(getAllRecipes());
    }
  }, [dispatch, active]);

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
  };

  const closeOptionDropdown = () => {
    setCategory(categorySelected);
    setSort(sortSelected);
    toggle();
  };

  const handleFilter = () => {
    setCategorySelected(category);
    setSortSelected(sort);
    toggle();
  };

  return (
    <>
      <Drawer
        title='Community'
        open={active}
        onClose={() => dispatch(uiActions.setCommunityDrawerShowing(false))}
      >
        <div className='flex items-stretch border-b border-gray-400'>
          <button
            type='button'
            className='flex items-center gap-1 pl-4 pr-5 py-2 text-sm border-r border-gray-400'
            onClick={toggle}
          >
            <Options20Regular />
            Filter
          </button>
          <div className='flex pl-5 pr-3 py-1'>
            <div className='flex flex-col pr-4'>
              <span className='text-2xs'>Category</span>
              <div className='text-orange -mt-0.5 text-sm'>
                {categorySelected === -1
                  ? 'All'
                  : CATEGORY_NAME[categorySelected]}
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-2xs'>Sort by</span>
              <div className='text-orange -mt-0.5 text-sm'>
                {SORT_NAME[sortSelected]}
              </div>
            </div>
          </div>
        </div>
        <div
          className='h-full px-3 pt-4 pb-8 overflow-auto scrollbar-none'
          onScroll={handleScroll}
        >
          <CardList className='flex-row flex-wrap -mx-1'>
            {loading
              ? [...Array(8).keys()].map((_, index) => (
                  <CardSmallSkeleton key={index} />
                ))
              : recipes.map((recipe: any) => (
                  <CardSmall key={recipe._id} {...recipe} />
                ))}
          </CardList>
        </div>
      </Drawer>
      <Dropdown isShowing={isShowing} onClose={closeOptionDropdown}>
        <h3 className='px-2 text-xl font-semibold'>Category</h3>
        <TagList className='px-2 pt-1.5 pb-4'>
          <>
            <Tag isActive={-1 === category} onClick={() => setCategory(-1)}>
              All
            </Tag>
            {Object.values(RECIPES_BY_CATEGORY).map((categoryItem) => (
              <Tag
                key={categoryItem}
                isActive={categoryItem === category}
                onClick={() => setCategory(categoryItem)}
              >
                {CATEGORY_NAME[categoryItem]}
              </Tag>
            ))}
          </>
        </TagList>
        <h3 className='px-2 text-xl font-semibold'>Sort</h3>
        <>
          {Object.values(RECIPES_BY_SORT).map((sortItem) => (
            <div
              key={sortItem}
              className={cx(
                'px-2 py-1 my-0.5 rounded transition-colors cursor-pointer hover:bg-gray-100',
                sort === sortItem && 'text-orange'
              )}
              onClick={() => setSort(sortItem)}
            >
              {SORT_NAME[sortItem]}
            </div>
          ))}
        </>
        <Button className='mt-4' onClick={handleFilter} fluid>
          Apply
        </Button>
      </Dropdown>
    </>
  );
};

export default CommunityDrawer;
