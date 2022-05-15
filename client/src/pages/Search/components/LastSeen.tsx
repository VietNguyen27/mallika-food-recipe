import { useSelector } from 'react-redux';
import { RecipeList, Recipe } from '@components/Recipe';
import { selectorLastSeen } from '@features/lastseen-slice';

const LastSeen = () => {
  const lastSeenRecipes = useSelector(selectorLastSeen);

  if (lastSeenRecipes && lastSeenRecipes.length) {
    return (
      <div className='pb-4'>
        <h1 className='text-xl font-medium pb-4 px-layout'>Last Seen</h1>
        <RecipeList>
          {lastSeenRecipes.map((recipe) => (
            <Recipe key={recipe._id} {...recipe} />
          ))}
        </RecipeList>
      </div>
    );
  }

  return null;
};

export default LastSeen;
