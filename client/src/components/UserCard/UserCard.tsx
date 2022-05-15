import React, { ReactChild, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cx from 'clsx';
import { generateBase64Image } from '@helpers/helpers';
import { selectorUser } from '@features/user-slice';

interface UserCardListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface UserCardProps {
  className?: string;
  _id: string;
  avatar: object;
  email: string;
  name: string;
  onTrigger?: () => void;
}

export const UserCardList: React.FC<UserCardListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const UserCard: React.FC<UserCardProps> = ({
  className,
  _id,
  avatar,
  email,
  name,
  onTrigger,
}) => {
  const defaultClassName = 'py-3 px-layout';
  const allClassNames = cx(defaultClassName, className);
  const currentUser = useSelector(selectorUser);

  return (
    <li className={allClassNames} onClick={onTrigger}>
      {currentUser._id === _id ? (
        <div className='flex items-center gap-3'>
          <div className='relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden'>
            <img
              src={generateBase64Image(avatar)}
              className='absolute w-full h-full object-cover'
              alt={name}
            />
          </div>
          <div className='flex flex-col'>
            <p className='text-xs line-clamp-1'>{email}</p>
            <p className='text-sm line-clamp-1'>{name}</p>
          </div>
        </div>
      ) : (
        <Link to={`/user/${_id}`}>
          <div className='flex items-center gap-3'>
            <div className='relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden'>
              <img
                src={generateBase64Image(avatar)}
                className='absolute w-full h-full object-cover'
                alt={name}
              />
            </div>
            <div className='flex flex-col'>
              <p className='text-xs line-clamp-1'>{email}</p>
              <p className='text-sm line-clamp-1'>{name}</p>
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};
