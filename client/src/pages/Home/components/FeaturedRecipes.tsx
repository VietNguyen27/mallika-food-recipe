import { useEffect } from 'react';
import FeatureCardList from '@components/FeatureCard/FeatureCardList';
import { FeatureCardSkeleton } from '@components/Skeleton/Skeleton';
import FeatureCardItem from '@components/FeatureCard/FeatureCardItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeaturedRecipes,
  selectorFeaturedRecipes,
} from '@features/recipe-slice';
import { RootState } from '@redux/reducers';

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
      <h1 className='text-xl mb-1 font-medium'>Featured Community Recipes</h1>
      <p className='text-sm text-gray-800 mb-4'>
        Get lots of recipe inspiration from the community
      </p>

      <FeatureCardList>
        {loading
          ? [...Array(3).keys()].map((_, index) => (
              <FeatureCardSkeleton key={index} />
            ))
          : featuredRecipes.map((recipe: any) => (
              <FeatureCardItem key={recipe._id} {...recipe} />
            ))}
      </FeatureCardList>
      {recipes.length > 3 && (
        <div className='text-center'>
          <button type='button' className='text-orange mt-8 cursor-pointer'>
            Show All Recipe by Community
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedRecipes;
