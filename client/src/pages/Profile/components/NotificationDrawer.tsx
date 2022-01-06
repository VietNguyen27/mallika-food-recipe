import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import NotificationList from '@components/Notification/NotificationList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { NOTIFICATION_TYPES } from '@config/notification';
import Button from '@components/Button/RoundedButton';
import { ButtonSizes } from '@components/Button/Button';

const dumbNotifications = [
  {
    id: 1,
    title: 'Yeay you got new follower!',
    description: 'Nararaya Susanti has follow you',
    type: NOTIFICATION_TYPES.NEW_FOLLOWER,
    timestamps: Date.now() - 60 * 1000,
    isReaded: true,
  },
  {
    id: 2,
    title: 'Your “Cumi Saus Telur Asin” recipe bookmarked by Arumi',
    description: 'Arumi recently bookmark your recipe',
    type: NOTIFICATION_TYPES.BOOKMARKED,
    timestamps: Date.now() - 520 * 4000,
    isReaded: false,
  },
  {
    id: 3,
    title: 'Arumi like your recipe',
    description: null,
    type: NOTIFICATION_TYPES.LIKED,
    timestamps: Date.now() - 350 * 8400,
    isReaded: false,
  },
  {
    id: 4,
    title: 'New review on Cumi Saus Telur Asin recipe',
    description: 'Arumi write a review “Wah terima kasih bunda” to your recipe',
    type: NOTIFICATION_TYPES.NEW_REVIEW,
    timestamps: Date.now() - 630 * 17000,
    isReaded: true,
  },
  {
    id: 5,
    title: 'Your review liked',
    description:
      'Your review on “Ayam Bakar Sambal Matah” being liked by Yuanita',
    type: NOTIFICATION_TYPES.REVIEW_LIKED,
    timestamps: Date.now() - 1350 * 24000,
    isReaded: false,
  },
];

const NotificationDrawer = () => {
  const dispatch = useDispatch();
  const active = useSelector(
    ({ ui }: RootState) => ui.notificationDrawerShowing
  );

  return (
    <Drawer
      title='Notifications'
      open={active}
      onClose={() => dispatch(uiActions.setNotificationDrawerShowing(false))}
    >
      <div className='relative h-full overflow-auto scrollbar-none'>
        <NotificationList notifications={dumbNotifications} />
        <Button
          className='absolute left-1/2 bottom-1 -translate-x-1/2 px-4'
          size={ButtonSizes.EXTRA_SMALL}
        >
          Mark all as Read
        </Button>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
