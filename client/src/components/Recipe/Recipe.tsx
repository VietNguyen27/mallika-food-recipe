import React, { ReactChild, ReactChildren } from 'react';
import {
  MoreVertical24Filled,
  Clock20Regular,
  BowlChopsticks20Regular,
  Heart12Filled,
} from '@fluentui/react-icons';
import { DIFFICULTY_NAME, RECIPES_BY_TYPE } from '@config/recipe';
import { generateBase64Image } from '@helpers/helpers';
import { Link } from 'react-router-dom';
import cx from 'clsx';

interface TimeType {
  hour: number;
  minute: number;
}

interface RecipeListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface RecipeProps {
  _id?: string;
  className?: string;
  title: string;
  image: object;
  time: TimeType;
  difficulty: number;
  type: number;
  isPublished?: boolean;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const Recipe: React.FC<RecipeProps> = ({
  _id,
  className,
  title,
  image,
  time,
  difficulty,
  type,
  isPublished,
}) => {
  const defaultClassName = 'py-3 px-layout border-b border-gray-400';
  const allClassNames = cx(defaultClassName, className);
  const { ME, OTHER, LIKED } = RECIPES_BY_TYPE;

  return (
    <li className={allClassNames}>
      <div className='flex gap-2'>
        <Link
          to={`/recipe/${_id}`}
          className='block relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden'
        >
          <img
            src={generateBase64Image(image)}
            className='absolute w-full h-full object-cover'
            alt={title}
          />
        </Link>
        <div className='w-full'>
          <div className='flex justify-between items-start pb-1'>
            <Link to={`/recipe/${_id}`} className='pr-2 leading-5 line-clamp-2'>
              {title}
            </Link>
            <div className='flex-shrink-0'>
              <button className='text-gray-600'>
                <MoreVertical24Filled />
              </button>
            </div>
          </div>
          {type === OTHER || (type === ME && !isPublished) ? (
            <div className='flex gap-3'>
              <div className='inline-flex items-center'>
                <span className='text-gray-600 pr-1'>
                  <Clock20Regular />
                </span>
                <p className='text-sm text-gray-800'>
                  {time.hour ? time.hour + ' hour ' : null}
                  {time.minute ? time.minute + ' min' : null}
                </p>
              </div>
              <div className='inline-flex items-center'>
                <span className='text-gray-600 pr-1 -mt-0.5'>
                  <BowlChopsticks20Regular />
                </span>
                <p className='text-sm capitalize text-gray-800'>
                  {DIFFICULTY_NAME[difficulty]}
                </p>
              </div>
            </div>
          ) : (
            <div className='relative flex items-center text-xs'>
              <p className='inline-flex items-center'>
                <span className='text-orange pr-1'>
                  <Heart12Filled />
                </span>
                <span className='text-gray-800'>4.9</span>
              </p>
              <span className='mx-2'>|</span>
              <p className='inline-flex items-center text-gray-800'>
                <span className='pr-1'>103</span>
                <span>Reviews</span>
              </p>
              <span className='ml-auto bg-blue-800 text-white mr-4 px-2 py-1 inline-flex items-center rounded-2xl'>
                Published
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
