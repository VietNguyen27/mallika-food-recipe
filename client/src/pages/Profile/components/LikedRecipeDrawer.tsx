import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { RecipeList, Recipe } from '@components/Recipe/Recipe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { RECIPES_BY_DIFFICULTY, RECIPES_BY_TYPE } from '@config/recipe';

import RecipeImage5 from '@img/recipe-5.png';
import RecipeImage6 from '@img/recipe-6.png';
import RecipeImage7 from '@img/recipe-7.png';
import RecipeImage8 from '@img/recipe-8.png';

const dumbRecipes = [
  {
    id: '1',
    title: 'Resep Masakan Udang Tahu dengan Bumbu Tauco',
    image: RecipeImage5,
    time: {
      hour: 0,
      minute: 35,
    },
    difficulty: RECIPES_BY_DIFFICULTY.EASY,
    type: RECIPES_BY_TYPE.LIKED,
    published: true,
  },
  {
    id: '2',
    title: 'Resep Mie Sagu Khas Selat Panjang, Nikmatnya Menggoda',
    image: RecipeImage6,
    time: {
      hour: 1,
      minute: 10,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
    published: false,
  },
  {
    id: '3',
    title: 'Resep Be Sisit Ayam Khas Bali',
    image: RecipeImage7,
    time: {
      hour: 0,
      minute: 45,
    },
    difficulty: RECIPES_BY_DIFFICULTY.HARD,
    type: RECIPES_BY_TYPE.LIKED,
    published: true,
  },
  {
    id: '4',
    title: 'Resep Rujak Mie Khas Palembang',
    image: RecipeImage8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
    published: false,
  },
];

const LikedRecipeDrawer = () => {
  const dispatch = useDispatch();
  const active = useSelector(
    ({ ui }: RootState) => ui.likedRecipeDrawerShowing
  );

  return (
    <Drawer
      title='Liked Recipe'
      open={active}
      onClose={() => dispatch(uiActions.setLikedRecipeDrawerShowing(false))}
    >
      <div className='h-full overflow-auto scrollbar-none'>
        <RecipeList>
          {dumbRecipes.map((recipe) => (
            <Recipe key={recipe.id} {...recipe} />
          ))}
        </RecipeList>
      </div>
    </Drawer>
  );
};

export default LikedRecipeDrawer;
