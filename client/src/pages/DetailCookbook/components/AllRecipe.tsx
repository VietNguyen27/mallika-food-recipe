import { TextSortAscending20Regular } from '@fluentui/react-icons';
import { RECIPES_BY_DIFFICULTY, RECIPES_BY_TYPE } from '@config/recipe';
import RecipeList from '@components/Recipe/RecipeList';

import RecipeImage5 from '@img/recipe-5.png';
import RecipeImage6 from '@img/recipe-6.png';
import RecipeImage7 from '@img/recipe-7.png';
import RecipeImage8 from '@img/recipe-8.png';

const dumbRecipes = [
  {
    id: '1',
    title: 'Buncis Kuah Santan',
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
    title: 'Ayam Kecap Manis',
    image: RecipeImage6,
    time: {
      hour: 1,
      minute: 10,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
    published: true,
  },
  {
    id: '3',
    title: 'Cumi Saus Telur Asin',
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
    title: 'Nasi Magelangan',
    image: RecipeImage8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
  },
  {
    id: '5',
    title: 'Sambal Goreng Kentang',
    image: RecipeImage8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
  },
  {
    id: '6',
    title: 'Resep Ayam Geprek Jogja',
    image: RecipeImage8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
  },
  {
    id: '7',
    title: 'Sup Makaroni Daging Ayam Kampung',
    image: RecipeImage8,
    time: {
      hour: 1,
      minute: 30,
    },
    difficulty: RECIPES_BY_DIFFICULTY.MEDIUM,
    type: RECIPES_BY_TYPE.LIKED,
    published: true,
  },
];

const AllRecipe = () => {
  return (
    <div className='mt-8 relative'>
      <h1 className='px-layout text-xl mb-3 font-medium'>All Recipe (7)</h1>
      <button className='absolute top-0 right-0 z-10 text-gray-600 px-layout cursor-pointer'>
        <TextSortAscending20Regular />
      </button>
      <div className='h-full overflow-auto scrollbar-none'>
        <RecipeList recipes={dumbRecipes} />
      </div>
    </div>
  );
};

export default AllRecipe;
