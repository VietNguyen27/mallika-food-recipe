import React from 'react';
import { useSelector } from 'react-redux';
import { UserCardList, UserCard } from '@components/UserCard';
import { RootState } from '@redux/reducers';

const SearchUser = () => {
  const { results } = useSelector(({ search }: RootState) => search);

  return (
    <UserCardList>
      {results.map((user) => (
        <UserCard key={user._id} {...user} />
      ))}
    </UserCardList>
  );
};

export default SearchUser;
