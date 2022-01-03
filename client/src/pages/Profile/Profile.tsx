import React from 'react';
import Thumbnail from '@img/thumbnail.png';
import RoundedButton, {
  ButtonSizes,
  ButtonVariants,
} from '@components/Button/RoundedButton';
import { useSelector } from 'react-redux';
import { selectorUser } from '@features/AuthSlice';
import { generateBase64Image } from '@helpers/helpers';
import { List20Regular } from '@fluentui/react-icons';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import { Loading } from '@components/Loading/Loading';

import RecipeImage1 from '@img/recipe-1.png';
import RecipeImage2 from '@img/recipe-2.png';
import RecipeImage3 from '@img/recipe-3.png';
import RecipeImage4 from '@img/recipe-4.png';
import RecipeImage5 from '@img/recipe-5.png';
import Reviews from '@components/Review/Reviews';

const dumbReviews = [
  {
    id: '1',
    recipe: {
      title: 'Resep Masakan Lemang Ikan Mas',
      image: RecipeImage1,
    },
    comment: 'Resepnya menarik mesti dicoba nih, terima kasih bunda',
  },
  {
    id: '2',
    recipe: {
      title: 'Resep Mie Goreng Aceh Enak Sederhana',
      image: RecipeImage2,
    },
    comment: 'Wah ternyata sederhana ya cara masaknya 😃',
  },
  {
    id: '3',
    recipe: {
      title: 'Bebek Goreng Lezat',
      image: RecipeImage3,
    },
    comment: 'Step-stepnya mudah diikuti dan jelas, terima kasih',
  },
  {
    id: '4',
    recipe: {
      title: 'Resep Masakan Lemang Ikan Mas',
      image: RecipeImage4,
    },
    comment: 'Resepnya menarik mesti dicoba nih, terima kasih bunda',
  },
  {
    id: '5',
    recipe: {
      title: 'Resep Mie Goreng Aceh Enak Sederhana',
      image: RecipeImage5,
    },
    comment: 'Step-stepnya mudah diikuti dan jelas, terima kasih',
  },
];

const Profile = () => {
  const user: any = useSelector(selectorUser);

  if (!user) return <Loading />;

  return (
    <>
      <div className='relative h-1/4'>
        <img
          src={Thumbnail}
          className='absolute inset-0 w-full h-full object-cover'
          alt='thumbnail recipe of user'
        />
        <RoundedButton
          className='absolute z-10 top-4 right-3'
          variant={ButtonVariants.Secondary}
          size={ButtonSizes.Small}
        >
          <List20Regular />
        </RoundedButton>
      </div>
      <div className='px-4 -mb-6'>
        <div className='relative bg-white text-center -translate-y-10 rounded-t-2xl'>
          <img
            src={generateBase64Image(user.avatar)}
            className='absolute left-1/2 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2'
            width={90}
            alt='user avatar'
          />
          <h3 className='text-xl font-medium pt-12'>{user.name}</h3>
          <p className='text-gray-800 text-sm'>Description for user</p>
          <p className='text-gray-800 text-sm'>0 Followers · 0 Following</p>
        </div>
      </div>

      <Tabs>
        <Tab label='Posts'>
          <div>posts</div>
        </Tab>
        <Tab label='Reviews' className='h-72 pb-8 overflow-auto scrollbar-none'>
          <Reviews reviews={dumbReviews} />
        </Tab>
      </Tabs>
    </>
  );
};

export default Profile;
