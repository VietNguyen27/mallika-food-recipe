import React, { useEffect } from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { fetchFollowingById } from '@features/follow-slice';
import { UserCardList, UserCard } from '@components/UserCard/UserCard';
import { UserCardSkeleton } from '@components/Skeleton/Skeleton';
import { Spinner } from '@components/Loading/Loading';
import ListEmpty from '@img/list-empty.png';

interface IFollowingDrawerProps {
  userId: string;
}

const FollowingDrawer: React.FC<IFollowingDrawerProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const active = useSelector(({ ui }: RootState) => ui.followingDrawerShowing);
  const { following } = useSelector(({ follow }: RootState) => follow);
  const loading = useSelector(
    ({ loading }: RootState) => loading.fetchFollowLoading
  );

  useEffect(() => {
    if (active && userId && !following[userId]) {
      dispatch(fetchFollowingById(userId));
    }
  }, [active, userId]);

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (isBottom && !loading && !following[userId].outOfFollowing) {
      dispatch(fetchFollowingById(userId));
    }
  };

  return (
    <Drawer
      title='Following'
      open={active}
      onClose={() => dispatch(uiActions.setFollowingDrawerShowing(false))}
    >
      <div className='h-full pb-8'>
        <div
          className='h-full overflow-auto scrollbar-none'
          onScroll={handleScroll}
        >
          <UserCardList>
            {loading && !following[userId]
              ? [...Array(6).keys()].map((_, index) => {
                  return <UserCardSkeleton key={index} />;
                })
              : following[userId] &&
                following[userId].following.map((user) => (
                  <UserCard
                    key={user._id}
                    onTrigger={() =>
                      dispatch(uiActions.setFollowingDrawerShowing(false))
                    }
                    {...user}
                  />
                ))}
          </UserCardList>
          {loading && following[userId] && (
            <div className='flex justify-center h-7'>
              <Spinner color='var(--color-orange)' />
            </div>
          )}
          {following[userId] && following[userId].following.length === 0 && (
            <div className='flex flex-col items-center text-center pt-8 px-4'>
              <img src={ListEmpty} alt='no following yet' width='180' />
              <h4 className='font-semibold'>No following yet!</h4>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default FollowingDrawer;
