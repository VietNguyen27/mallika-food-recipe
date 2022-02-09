import React, { ReactChild, ReactChildren } from 'react';
import cx from 'clsx';
import { generateBase64Image } from '@helpers/helpers';
import { Link } from 'react-router-dom';

interface UserListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface UserProps {
  className?: string;
  _id: string;
  avatar: object;
  email: string;
  name: string;
}

export const UserList: React.FC<UserListProps> = ({ className, children }) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const User: React.FC<UserProps> = ({
  className,
  _id,
  avatar,
  email,
  name,
}) => {
  const defaultClassName = 'py-3 px-layout';
  const allClassNames = cx(defaultClassName, className);

  return (
    <li className={allClassNames}>
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
    </li>
  );
};
