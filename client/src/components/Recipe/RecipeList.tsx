import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes }) => {
  return (
    <ul className='flex flex-col items-stretch'>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
};

export default RecipeList;
