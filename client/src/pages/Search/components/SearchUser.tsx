import React from 'react';
import { UserList, User } from '@components/User/User';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

const SearchUser = () => {
  const { results } = useSelector(({ search }: RootState) => search);

  return (
    <UserList>
      {results.map((user) => (
        <User key={user._id} {...user} />
      ))}
    </UserList>
  );
};

export default SearchUser;
