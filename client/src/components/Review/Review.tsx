import React, { ReactChild, ReactChildren } from 'react';
import { Heart24Regular, MoreVertical24Filled } from '@fluentui/react-icons';
import cx from 'clsx';

interface RecipeType {
  image: string;
  title: string;
}

interface ReviewListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface ReviewProps {
  className?: string;
  recipe: RecipeType;
  comment: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const Review: React.FC<ReviewProps> = ({ recipe, comment }) => {
  return (
    <li className='px-layout py-3 border-b border-gray-400'>
      <div className='flex gap-2'>
        <div className='relative w-12 h-12 flex-shrink-0 mt-1 rounded-lg overflow-hidden'>
          <img
            src={recipe.image}
            className='absolute w-full h-full object-cover'
            alt={recipe.title}
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-center pb-1'>
            <h3 className='text-gray-800 text-xs pr-2'>{recipe.title}</h3>
            <div className='flex gap-1 w-14 flex-shrink-0'>
              <button className='text-gray-600'>
                <Heart24Regular />
              </button>
              <button className='text-gray-600'>
                <MoreVertical24Filled />
              </button>
            </div>
          </div>
          <p className='leading-5'>{comment}</p>
        </div>
      </div>
    </li>
  );
};
