import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateBase64Image } from '@helpers/helpers';
import { ChevronLeft24Regular } from '@fluentui/react-icons';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import { CardSkeleton } from '@components/Skeleton/Skeleton';
import { Card, CardList } from '@components/Card/Card';
import {
  getOtherUserRecipes,
  selectorOtherRecipes,
} from '@features/recipe-slice';
import { RootState } from '@redux/reducers';
import { Loading } from '@components/Loading/Loading';
import BoxEmpty from '@img/box-empty.png';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '@features/user-slice';

const OtherProfile = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }: RootState) => user);
  const otherRecipes: any = useSelector(selectorOtherRecipes);
  const loading = useSelector(
    ({ loading }: RootState) => loading.ownRecipesLoading
  );

  useEffect(() => {
    if (userId && !user[userId]) {
      dispatch(fetchUserById(userId));
    }
    if (userId && !otherRecipes[userId]) {
      dispatch(getOtherUserRecipes(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (userId && !user[userId]) return <Loading />;

  const { email, avatar, name, bio } = userId && user[userId];

  return (
    <div className='h-full overflow-auto scrollbar-none'>
      <div className='sticky z-10 top-0 bg-white flex items-center gap-4 px-layout'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeft24Regular />
        </button>
        <div className='text-lg -mt-0.5 font-semibold line-clamp-1'>
          {email}
        </div>
      </div>
      <div className='px-layout pt-4'>
        <div className='flex justify-between items-center gap-4'>
          <img
            src={generateBase64Image(avatar)}
            className='w-[72px] h-[72px] object-cover rounded-full'
            alt='user avatar'
          />
          <div className='flex justify-center items-center gap-4 text-gray-800 text-xs text-center whitespace-nowrap pt-2'>
            <div className='flex-1'>
              <span className='block text-black text-lg leading-4 font-semibold'>
                0
              </span>
              Recipes
            </div>
            <div className='flex-1'>
              <span className='block text-black text-lg leading-4 font-semibold'>
                0
              </span>
              Followers
            </div>
            <div className='flex-1'>
              <span className='block text-black text-lg leading-4 font-semibold'>
                0
              </span>
              Following
            </div>
          </div>
        </div>
        <div className='flex flex-col pt-1'>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='text-gray-800 text-sm'>{bio}</p>
        </div>
      </div>
      <Tabs
        className='pt-2 bg-white'
        labelContainerClassName='sticky z-10 top-6 bg-white pt-4'
      >
        <Tab label='Posts' className='pt-3 px-3 pb-8'>
          <>
            <CardList>
              {loading
                ? [...Array(3).keys()].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : userId &&
                  otherRecipes[userId] &&
                  otherRecipes[userId].map((recipe: any) => (
                    <Card key={recipe._id} {...recipe} />
                  ))}
            </CardList>
            {userId && otherRecipes[userId] && !otherRecipes[userId].length && (
              <div className='flex flex-col items-center text-center px-4 pt-4'>
                <img src={BoxEmpty} alt='no ingredients yet' width='150' />
                <h4 className='font-semibold'>No recipes yet!</h4>
                <p>Click the plus button to create some recipes of your own.</p>
              </div>
            )}
          </>
        </Tab>
        <Tab label='Cookbooks' className='pb-8'>
          Cookbooks
        </Tab>
      </Tabs>
    </div>
  );
};

export default OtherProfile;
