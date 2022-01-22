import { useEffect } from 'react';
import { CardSkeleton } from '@components/Skeleton/Skeleton';
import { Card, CardList } from '@components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeaturedRecipes,
  selectorFeaturedRecipes,
} from '@features/recipe-slice';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';

const FeaturedRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectorFeaturedRecipes);
  const loading = useSelector(
    ({ loading }: RootState) => loading.featuredRecipesLoading
  );
  const featuredRecipes =
    (recipes.length && [...Array(3).keys()].map((item) => recipes[item])) || [];

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getFeaturedRecipes());
    }
  }, [dispatch]);

  return (
    <div className='mt-14'>
      <h2 className='text-xl mb-1 font-semibold'>Featured Community Recipes</h2>
      <p className='text-sm text-gray-800 mb-4'>
        Get lots of recipe inspiration from the community
      </p>

      <CardList>
        {loading
          ? [...Array(3).keys()].map((_, index) => <CardSkeleton key={index} />)
          : featuredRecipes.map((recipe: any) => (
              <Card key={recipe._id} {...recipe} />
            ))}
      </CardList>
      {recipes.length > 3 && (
        <div className='text-center'>
          <button
            type='button'
            className='text-orange mt-8 cursor-pointer'
            onClick={() => dispatch(uiActions.setCommunityDrawerShowing(true))}
          >
            Show All Recipe by Community
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedRecipes;
