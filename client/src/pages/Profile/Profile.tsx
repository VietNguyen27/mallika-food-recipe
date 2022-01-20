import React, { ChangeEvent, useState } from 'react';
import Thumbnail from '@img/thumbnail.png';
import RoundedButton, {
  RoundedButtonSizes,
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from '@features/auth-slice';
import { generateBase64Image } from '@helpers/helpers';
import { List20Regular } from '@fluentui/react-icons';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import { Loading } from '@components/Loading/Loading';
import AccountDrawer from './components/AccountDrawer';
import LikedRecipeDrawer from './components/LikedRecipeDrawer';
import NotificationDrawer from './components/NotificationDrawer';
import ReviewList from '@components/Review/ReviewList';
import FeatureCardList from '@components/FeatureCard/FeatureCardList';
import { uiActions } from '@features/ui-slice';
import { featuredCommunityRecipes } from '@pages/Home/components/FeaturedRecipes';
import cx from 'clsx';

import RecipeImage1 from '@img/recipe-1.png';
import RecipeImage2 from '@img/recipe-2.png';
import RecipeImage3 from '@img/recipe-3.png';
import RecipeImage4 from '@img/recipe-4.png';
import RecipeImage5 from '@img/recipe-5.png';
import EditProfileDrawer from './components/EditProfileDrawer';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const user: any = useSelector(selectorUser);
  const profileClassNames = cx(
    'px-4 -mb-6 transition-transform',
    isScrolled ? '-translate-y-10' : 'translate-y-0'
  );
  const tabsClassNames = cx(
    'transition-transform pt-2 bg-white',
    isScrolled ? '-translate-y-24' : 'translate-y-0'
  );

  if (!user) return null;

  const onScroll = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    if (element && element.scrollTop > 0) {
      return setIsScrolled(true);
    }
    return setIsScrolled(false);
  };

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
          variant={RoundedButtonVariants.SECONDARY}
          size={RoundedButtonSizes.SMALL}
          onClick={() => dispatch(uiActions.setAccountDrawerShowing(true))}
        >
          <List20Regular />
        </RoundedButton>
      </div>
      <div className={profileClassNames}>
        <div className='relative bg-white text-center -translate-y-10 rounded-t-2xl'>
          <img
            src={generateBase64Image(user.avatar)}
            className='absolute left-1/2 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2'
            width={90}
            alt='user avatar'
          />
          <h3 className='text-xl font-medium pt-12'>{user.name}</h3>
          <p className='text-gray-800 text-sm'>{user.bio}</p>
          <p className='text-gray-800 text-sm'>0 Followers · 0 Following</p>
        </div>
      </div>
      <Tabs className={tabsClassNames} onTrigger={() => setIsScrolled(false)}>
        <Tab
          label='Posts'
          className={cx(
            'pt-3 px-3 overflow-auto scrollbar-none',
            isScrolled ? 'h-96 pb-10' : 'h-72 pb-8'
          )}
          onScroll={onScroll}
        >
          <FeatureCardList recipes={featuredCommunityRecipes} />
        </Tab>
        <Tab
          label='Reviews'
          className={cx(
            'overflow-auto scrollbar-none',
            isScrolled ? 'h-96 pb-10' : 'h-72 pb-8'
          )}
          onScroll={onScroll}
        >
          <ReviewList reviews={dumbReviews} />
        </Tab>
      </Tabs>
      <AccountDrawer />
      <LikedRecipeDrawer />
      <NotificationDrawer />
      <EditProfileDrawer />
    </>
  );
};

export default Profile;
