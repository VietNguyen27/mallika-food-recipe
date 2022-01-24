import React from 'react';
import { RecipeList, Recipe } from '@components/Recipe/Recipe';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

const SearchRecipe = () => {
  const { results } = useSelector(({ search }: RootState) => search);

  return (
    <RecipeList>
      {results.map((recipe) => (
        <Recipe key={recipe._id} {...recipe} />
      ))}
    </RecipeList>
  );
};

export default SearchRecipe;
