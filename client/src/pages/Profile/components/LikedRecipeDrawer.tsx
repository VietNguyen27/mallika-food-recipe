import React, { useEffect } from 'react';
import Drawer from '@components/Drawer/Drawer';
import { RecipeList, Recipe } from '@components/Recipe/Recipe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { getAllLikedRecipes } from '@features/liked-slice';
import { RecipeSkeleton } from '@components/Skeleton/Skeleton';
import { Spinner } from '@components/Loading/Loading';
import BoxEmpty from '@img/box-empty.png';

const LikedRecipeDrawer = () => {
  const dispatch = useDispatch();
  const active = useSelector(
    ({ ui }: RootState) => ui.likedRecipeDrawerShowing
  );
  const loading = useSelector(
    ({ loading }: RootState) => loading.allLikedRecipesLoading
  );
  const { recipes: likedRecipes, outOfRecipe }: any = useSelector(
    ({ liked }: RootState) => liked
  );

  useEffect(() => {
    if (active && !likedRecipes) {
      dispatch(getAllLikedRecipes());
    }
  }, [dispatch, active]);

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;

    if (loading) return;

    if (isBottom && !loading && !outOfRecipe) {
      dispatch(getAllLikedRecipes());
    }
  };

  return (
    <Drawer
      title='Liked Recipe'
      open={active}
      onClose={() => dispatch(uiActions.setLikedRecipeDrawerShowing(false))}
    >
      <div
        className='h-full overflow-auto scrollbar-none pb-4'
        onScroll={handleScroll}
      >
        <RecipeList>
          {loading && !likedRecipes
            ? [...Array(8).keys()].map((recipe) => (
                <RecipeSkeleton key={recipe} />
              ))
            : likedRecipes &&
              likedRecipes.map(({ _id, recipe, type }) => (
                <Recipe key={_id} type={type} {...recipe} />
              ))}
        </RecipeList>
        <div className='flex justify-center h-7 pt-2'>
          {loading && likedRecipes && likedRecipes.length && (
            <Spinner color='var(--color-orange)' />
          )}
        </div>
        {likedRecipes && !likedRecipes.length && (
          <div className='flex flex-col items-center text-center px-4 mt-10'>
            <img src={BoxEmpty} alt='no ingredients yet' width='150' />
            <h4 className='font-semibold'>No recipes yet!</h4>
            <p>
              Click the heart icon to add some recipes to your favorite recipes.
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default LikedRecipeDrawer;
