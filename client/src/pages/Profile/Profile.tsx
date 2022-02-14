import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from '@features/user-slice';
import { convertNumber, generateBase64Image } from '@helpers/helpers';
import { List20Filled } from '@fluentui/react-icons';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import { CardSkeleton, ProfileSkeleton } from '@components/Skeleton/Skeleton';
import { Card, CardList } from '@components/Card/Card';
import { uiActions } from '@features/ui-slice';
import AccountDrawer from './components/AccountDrawer';
import LikedRecipeDrawer from './components/LikedRecipeDrawer';
import NotificationDrawer from './components/NotificationDrawer';
import EditProfileDrawer from './components/EditProfileDrawer';
import FollowingDrawer from './components/FollowingDrawer';
import FollowersDrawer from './components/FollowersDrawer';
import { getRecipesByUserId, selectorOwnRecipes } from '@features/recipe-slice';
import { RootState } from '@redux/reducers';
import BoxEmpty from '@img/box-empty.png';
import { Spinner } from '@components/Loading/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  const user: any = useSelector(selectorUser);
  const ownRecipes: any = useSelector(selectorOwnRecipes);
  const loading = useSelector(
    ({ loading }: RootState) => loading.ownRecipesLoading
  );

  useEffect(() => {
    if (ownRecipes && !ownRecipes[user._id]) {
      dispatch(getRecipesByUserId(user._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleScroll = (e) => {
    const { outOfRecipes } = ownRecipes[user._id];
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (isBottom && !loading && !outOfRecipes) {
      dispatch(getRecipesByUserId(user._id));
    }
  };

  if (!user) return <ProfileSkeleton />;

  const { email, avatar, name, bio, numRecipes, numFollowers, numFollowing } =
    user;

  return (
    <div className='h-full pb-8'>
      <div
        className='h-full overflow-auto scrollbar-none'
        onScroll={handleScroll}
      >
        <div className='sticky z-10 top-0 bg-white flex justify-between items-center gap-4 px-layout'>
          <div className='text-lg font-semibold line-clamp-1'>{email}</div>
          <button
            onClick={() => dispatch(uiActions.setAccountDrawerShowing(true))}
          >
            <List20Filled />
          </button>
        </div>
        <div className='px-layout pt-4'>
          <div className='flex justify-between items-center gap-4'>
            <img
              src={generateBase64Image(avatar)}
              className='w-[72px] h-[72px] flex-shrink-0 object-cover rounded-full'
              alt='user avatar'
            />
            <div className='flex justify-center items-center gap-4 text-gray-800 text-xs text-center whitespace-nowrap pt-2'>
              <div className='flex-1'>
                <span className='block text-black text-lg leading-4 font-semibold'>
                  {convertNumber(numRecipes)}
                </span>
                Recipes
              </div>
              <div
                className='flex-1 cursor-pointer'
                onClick={() =>
                  dispatch(uiActions.setFollowersDrawerShowing(true))
                }
              >
                <span className='block text-black text-lg leading-4 font-semibold'>
                  {convertNumber(numFollowers)}
                </span>
                Followers
              </div>
              <div
                className='flex-1 cursor-pointer'
                onClick={() =>
                  dispatch(uiActions.setFollowingDrawerShowing(true))
                }
              >
                <span className='block text-black text-lg leading-4 font-semibold'>
                  {convertNumber(numFollowing)}
                </span>
                Following
              </div>
            </div>
          </div>
          <div className='flex flex-col pt-1'>
            <h3 className='text-lg font-semibold line-clamp-2'>{name}</h3>
            <p className='text-gray-800 text-sm line-clamp-2'>{bio}</p>
          </div>
        </div>
        <Tabs
          className='pt-2 bg-white'
          labelClassName='flex-1'
          labelContainerClassName='sticky z-10 top-6 bg-white pt-4'
        >
          <Tab label='Posts' className='pt-3 px-3 pb-12'>
            <>
              <CardList>
                {loading && !ownRecipes[user._id]
                  ? [...Array(3).keys()].map((_, index) => (
                      <CardSkeleton key={index} />
                    ))
                  : ownRecipes &&
                    ownRecipes[user._id] &&
                    ownRecipes[user._id].recipes.map((recipe: any) => (
                      <Card key={recipe._id} {...recipe} />
                    ))}
              </CardList>
              {loading && ownRecipes[user._id] && (
                <div className='flex justify-center h-7 pt-2'>
                  <Spinner color='var(--color-orange)' />
                </div>
              )}
              {ownRecipes &&
                ownRecipes[user._id] &&
                !ownRecipes[user._id].recipes.length && (
                  <div className='flex flex-col items-center text-center px-4 pt-4'>
                    <img src={BoxEmpty} alt='no ingredients yet' width='150' />
                    <h4 className='font-semibold'>No recipes yet!</h4>
                    <p>
                      Click the plus button to create some recipes of your own.
                    </p>
                  </div>
                )}
            </>
          </Tab>
          <Tab label='Cookbooks' className='pb-12'>
            <div className='p-layout'>
              This featured is not completed. Please try this later!
            </div>
          </Tab>
        </Tabs>
      </div>
      <AccountDrawer />
      <LikedRecipeDrawer />
      <NotificationDrawer />
      <EditProfileDrawer />
      <FollowersDrawer userId={user._id} />
      <FollowingDrawer userId={user._id} />
    </div>
  );
};

export default Profile;
