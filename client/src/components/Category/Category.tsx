import React, { ReactChild, ReactChildren } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'clsx';
import { uiActions } from '@features/ui-slice';
import { clearAllRecipes, setFilter } from '@features/recipe-slice';

interface CategoryListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface CategoryProps {
  image: string;
  title: string;
  category: number;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'grid grid-cols-4 gap-2.5';
  const allClassNames = cx(defaultClassName, className);

  return <div className={allClassNames}>{children}</div>;
};

export const Category: React.FC<CategoryProps> = ({
  image,
  title,
  category,
}) => {
  const dispatch = useDispatch();

  const handleFilterByCategory = () => {
    dispatch(clearAllRecipes());
    dispatch(setFilter({ category }));
    dispatch(uiActions.setCommunityDrawerShowing(true));
  };

  return (
    <div
      className='flex flex-col items-center justify-center gap-3 cursor-pointer'
      onClick={handleFilterByCategory}
    >
      <div className='relative w-full h-0 pb-[100%] rounded-xl overflow-hidden'>
        <img
          src={image}
          alt={`${title} category`}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>
      <p className='text-sm line-clamp-1'>{title}</p>
    </div>
  );
};
