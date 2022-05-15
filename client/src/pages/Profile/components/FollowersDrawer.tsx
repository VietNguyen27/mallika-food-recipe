import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@components/Drawer';
import { UserCardList, UserCard } from '@components/UserCard';
import { UserCardSkeleton } from '@components/Skeleton';
import { Spinner } from '@components/Loading';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { getFollowersById, selectorFollowers } from '@features/follow-slice';
import ListEmpty from '@img/list-empty.png';

interface IFollowersDrawerProps {
  userId: string;
}

const FollowersDrawer: React.FC<IFollowersDrawerProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const active = useSelector(({ ui }: RootState) => ui.followersDrawerShowing);
  const followers = useSelector(selectorFollowers);
  const loading = useSelector(
    ({ loading }: RootState) => loading.getFollowLoading
  );

  useEffect(() => {
    if (active && userId && !followers[userId]) {
      dispatch(getFollowersById(userId));
    }
  }, [active, userId]);

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (loading) return;

    if (isBottom && !loading && !followers[userId].outOfFollowers) {
      dispatch(getFollowersById(userId));
    }
  };

  return (
    <Drawer
      title='Followers'
      open={active}
      onClose={() => dispatch(uiActions.setFollowersDrawerShowing(false))}
    >
      <div className='h-full pb-8'>
        <div
          className='h-full overflow-auto scrollbar-none'
          onScroll={handleScroll}
        >
          <UserCardList>
            {loading && !followers[userId]
              ? [...Array(6).keys()].map((_, index) => {
                  return <UserCardSkeleton key={index} />;
                })
              : followers[userId] &&
                followers[userId].followers.map((user) => (
                  <UserCard
                    key={user._id}
                    onTrigger={() =>
                      dispatch(uiActions.setFollowersDrawerShowing(false))
                    }
                    {...user}
                  />
                ))}
          </UserCardList>
          {loading && followers[userId] && (
            <div className='flex justify-center h-7'>
              <Spinner color='var(--color-orange)' />
            </div>
          )}
          {followers[userId] && followers[userId].followers.length === 0 && (
            <div className='flex flex-col items-center text-center pt-8 px-4'>
              <img src={ListEmpty} alt='no followers yet' width='180' />
              <h4 className='font-semibold'>No followers yet!</h4>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default FollowersDrawer;
