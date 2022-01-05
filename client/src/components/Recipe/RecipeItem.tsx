import React from 'react';
import {
  MoreVertical24Filled,
  Clock20Regular,
  BowlChopsticks20Regular,
} from '@fluentui/react-icons';
import { DIFFICULTY_NAME, RECIPES_BY_TYPE } from '@config/recipe';

const RecipeItem = ({ title, image, time, difficulty, type }) => {
  const { ME, LIKED } = RECIPES_BY_TYPE;

  return (
    <li className='px-2 py-3 border-b border-gray-400'>
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
        </div>
      </div>
    </li>
  );
};

export default RecipeItem;
