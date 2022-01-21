import React from 'react';
import { Heart20Filled, Heart24Regular } from '@fluentui/react-icons';
import { generateBase64Image } from '@helpers/helpers';

interface FeatureCardItemProps {
  image: object;
  title: string;
  user: object | any;
  liked_count: number;
  num_reviews: number;
}

const FeatureCardItem: React.FC<FeatureCardItemProps> = ({
  image,
  title,
  user,
  liked_count,
  num_reviews,
}) => {
  return (
    <li className='mb-8 last:mb-0'>
      <div className='relative w-full h-0 pb-[62.5%] border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
        <img
          src={generateBase64Image(image)}
          alt='soup'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
      <h2 className='text-xl my-2 font-medium leading-6'>{title}</h2>
      <div className='flex items-center mt-1 relative'>
        <img
          src={generateBase64Image(user.avatar)}
          alt={`avatar of ${user.name}`}
          className='w-10 h-10 object-cover rounded-full mr-3'
        />
        <div>
          <p className='text-md'>{user.name}</p>
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

export default FeatureCardItem;
