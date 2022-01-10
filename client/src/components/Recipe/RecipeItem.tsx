import React from 'react';
import {
  MoreVertical24Filled,
  Clock20Regular,
  BowlChopsticks20Regular,
  Heart12Filled,
} from '@fluentui/react-icons';
import { DIFFICULTY_NAME, RECIPES_BY_TYPE } from '@config/recipe';
import Button from '@components/Button/RoundedButton';
import { ButtonSizes } from '@components/Button/Button';

const RecipeItem = ({ title, image, time, difficulty, type, published }) => {
  const { ME, LIKED } = RECIPES_BY_TYPE;

  return (
    <li className='py-3 px-layout border-b border-gray-400'>
      <div className='flex gap-2'>
        <div className='relative w-14 h-14 flex-shrink-0 mt-1 rounded-lg overflow-hidden'>
          <img
            src={image}
            className='absolute w-full h-full object-cover'
            alt={title}
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-start pb-1'>
            <h3 className='text-sm pr-2'>{title}</h3>
            {type === ME ||
              (type === LIKED && (
                <div className='flex-shrink-0'>
                  <button className='text-gray-600'>
                    <MoreVertical24Filled />
                  </button>
                </div>
              ))}
          </div>
          {!published ? (
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
              <Button
                className='absolute right-0 bg-blue-800 mr-4 inline-flex items-center'
                size={ButtonSizes.EXTRA_SMALL}
              >
                Published
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default RecipeItem;
