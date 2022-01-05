import React from 'react';
import cx from 'clsx';
import { NOTIFICATION_TYPES, NOTIFICATION_NAMES } from '@config/notification';
import { timeSince } from '@helpers/helpers';
import {
  Bookmark16Regular,
  Comment16Regular,
  Heart16Regular,
  PersonAvailable16Regular,
  ThumbLike16Regular,
} from '@fluentui/react-icons';

const Icons = Object.freeze({
  [NOTIFICATION_TYPES.NEW_FOLLOWER]: <PersonAvailable16Regular />,
  [NOTIFICATION_TYPES.BOOKMARKED]: <Bookmark16Regular />,
  [NOTIFICATION_TYPES.LIKED]: <Heart16Regular />,
  [NOTIFICATION_TYPES.NEW_REVIEW]: <Comment16Regular />,
  [NOTIFICATION_TYPES.REVIEW_LIKED]: <ThumbLike16Regular />,
});

const NotificationItem = ({
  title,
  description,
  type,
  timestamps,
  isReaded,
}) => {
  const defaultClassName = 'relative p-3 pl-9';
  const allClassNames = cx(
    defaultClassName,
    isReaded ? 'bg-beige' : 'bg-transparent'
  );

  return (
    <li className={allClassNames}>
      <span className='absolute top-3.5 left-3 text-orange'>{Icons[type]}</span>
      <div className='flex justify-between items-center pb-1'>
        <span className='text-xs text-gray-800 capitalize'>
          {NOTIFICATION_NAMES[type]}
        </span>
        <span className='text-xs text-gray-800'>
          {timeSince(new Date(timestamps))}
        </span>
      </div>
      <p className='text-sm font-semibold'>{title}</p>
      <p className='text-sm text-gray-800'>{description}</p>
    </li>
  );
};

export default NotificationItem;
