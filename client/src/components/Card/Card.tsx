import React, { ReactChild, ReactChildren } from 'react';
import {
  Heart20Filled,
  Heart20Regular,
  Heart24Regular,
} from '@fluentui/react-icons';
import { generateBase64Image } from '@helpers/helpers';
import cx from 'clsx';

interface CardListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface CardProps {
  className?: string;
  image: object;
  title: string;
  user: object | any;
  liked_count: number;
  num_reviews: number;
}

interface CardSmallProps {
  className?: string;
  image: object;
  title: string;
  user: object | any;
  liked_count: number;
  num_reviews: number;
}

export const CardList: React.FC<CardListProps> = ({ className, children }) => {
  const isFlexRow = className && className.includes('flex-row');
  const defaultClassName = 'flex items-stretch list-none';
  const allClassNames = cx(
    defaultClassName,
    isFlexRow ? 'flex-row' : 'flex-col',
    className
  );

  return <ul className={allClassNames}>{children}</ul>;
};

export const Card: React.FC<CardProps> = ({
  className,
  image,
  title,
  user,
  liked_count,
  num_reviews,
}) => {
  const defaultClassName = 'mb-8 last:mb-0';
  const allClassNames = cx(defaultClassName, className);

  return (
    <li className={allClassNames}>
      <div className='relative w-full h-0 pb-[62.5%] border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
        <img
          src={generateBase64Image(image)}
          alt='soup'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
      <h2 className='text-xl my-2 font-medium leading-6 line-clamp-2'>
        {title}
      </h2>
      <div className='flex items-center mt-1 relative'>
        <img
          src={generateBase64Image(user.avatar)}
          alt={`avatar of ${user.name}`}
          className='w-10 h-10 object-cover rounded-full mr-3'
        />
        <div>
          <p className='text-md line-clamp-1'>{user.name}</p>
          <div className='text-xs flex items-center text-gray-800'>
            <p className='flex items-center'>
              <Heart20Filled className='mr-1 text-orange inline-block' />
              <span>{liked_count}</span>
            </p>
            <span className='mx-2'>·</span>
            <p>
              <span className='mr-1'>{num_reviews}</span>
              <span>{num_reviews > 1 ? 'Reviews' : 'Review'}</span>
            </p>
          </div>
        </div>
        <Heart24Regular className='text-orange absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer' />
      </div>
    </li>
  );
};

export const CardSmall: React.FC<CardSmallProps> = ({
  className,
  image,
  title,
  user,
  num_reviews,
}) => {
  const defaultClassName = 'w-1/2 mb-5 px-1';
  const allClassNames = cx(defaultClassName, className);

  return (
    <li className={allClassNames}>
      <div className='relative w-full h-0 pb-[85%] border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
        <img
          src={generateBase64Image(image)}
          alt='soup'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
      <h2 className='text-md mt-1 font-medium leading-5 line-clamp-2'>
        {title}
      </h2>
      <div className='flex items-center mt-1 relative'>
        <img
          src={generateBase64Image(user.avatar)}
          alt={`avatar of ${user.name}`}
          className='w-8 h-8 object-cover rounded-full mr-1.5'
        />
        <div className='relative flex-1'>
          <p className='text-xs line-clamp-1'>{user.name}</p>
          <p className='text-xs text-gray-800 mr-1'>
            <span className='mr-1'>{num_reviews}</span>
            <span>{num_reviews > 1 ? 'Reviews' : 'Review'}</span>
          </p>
          <button className='absolute -bottom-0.5 right-1 text-orange'>
            <Heart20Regular />
          </button>
        </div>
      </div>
    </li>
  );
};
