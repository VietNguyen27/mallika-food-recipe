import { RecipeList, Recipe } from '@components/Recipe/Recipe';
import { RECIPES_BY_DIFFICULTY, RECIPES_BY_TYPE } from '@config/recipe';
import ImageRecipe5 from '@img/recipe-5.png';
import ImageRecipe6 from '@img/recipe-6.png';
import ImageRecipe7 from '@img/recipe-7.png';
import ImageRecipe8 from '@img/recipe-8.png';

const lastSeenItem = [
  {
    id: '1',
    title: 'Resep Masakan Udang Tahu dengan Bumbu Tauco',
    image: ImageRecipe5,
    time: {
      hour: 0,
      minute: 40,
    },
    difficulty: RECIPES_BY_DIFFICULTY.EASY,
    type: RECIPES_BY_TYPE.OTHER,
    isPublished: true,
  },
  {
    id: '2',
    title: 'Resep Mie Sagu Khas Selat Panjang, Nikmatnya Menggoda',
    image: ImageRecipe6,
    time: {
      hour: 1,
      minute: 10,
    },
    difficulty: RECIPES_BY_DIFFICULTY.EASY,
    type: RECIPES_BY_TYPE.OTHER,
    isPublished: false,
  },
  {
    id: '3',
    title: 'Resep Be Sisit Ayam Khas Bali',
    image: ImageRecipe7,
    time: {
      hour: 0,
      minute: 45,
    },
    difficulty: RECIPES_BY_DIFFICULTY.EASY,
    type: RECIPES_BY_TYPE.OTHER,
    isPublished: false,
  },
  {
    id: '4',
    title: 'Resep Rujak Mie Khas Palembang',
    image: ImageRecipe8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.EASY,
    type: RECIPES_BY_TYPE.OTHER,
    isPublished: true,
  },
];

const LastSeen = () => {
  return (
    <div className='mt-4'>
      <h1 className='text-xl font-medium py-4 px-layout'>Last Seen</h1>
      <RecipeList>
        {lastSeenItem.map((recipe) => (
          <Recipe key={recipe.id} {...recipe} />
        ))}
      </RecipeList>
    </div>
  );
};

export default LastSeen;
