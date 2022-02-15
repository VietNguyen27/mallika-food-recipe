import { CategoryList, Category } from '@components/Category/Category';
import { RECIPES_BY_CATEGORY } from '@config/recipe';
import CategoryBreakfast from '@img/landing-page.jfif';
import CategoryLunch from '@img/recipe-8.png';
import CategoryDinner from '@img/recipe-7.png';
import CategoryAppetizer from '@img/recipe-9.png';
import CategorySalad from '@img/recipe-6.png';
import CategorySnack from '@img/recipe-11.png';
import CategorySoup from '@img/recipe-4.png';
import CategoryVegetarian from '@img/splash-3.jfif';
import CategoryDessert from '@img/splash-2.jfif';
import CategoryDrinks from '@img/recipe-10.png';

interface CategoryType {
  id: number;
  image: string;
  category: number;
  title: string;
}

export const categories: CategoryType[] = [
  {
    id: 1,
    image: CategoryBreakfast,
    category: RECIPES_BY_CATEGORY.BREAKFAST,
    title: 'Breakfast',
  },
  {
    id: 2,
    image: CategoryLunch,
    category: RECIPES_BY_CATEGORY.LUNCH,
    title: 'Lunch',
  },
  {
    id: 3,
    image: CategoryDinner,
    category: RECIPES_BY_CATEGORY.DINNER,
    title: 'Dinner',
  },
  {
    id: 4,
    image: CategoryAppetizer,
    category: RECIPES_BY_CATEGORY.APPETIZER,
    title: 'Appetizer',
  },
  {
    id: 5,
    image: CategorySalad,
    category: RECIPES_BY_CATEGORY.SALAD,
    title: 'Salad',
  },
  {
    id: 6,
    image: CategorySnack,
    category: RECIPES_BY_CATEGORY.SNACK,
    title: 'Snack',
  },
  {
    id: 7,
    image: CategorySoup,
    category: RECIPES_BY_CATEGORY.SOUP,
    title: 'Soup',
  },
  {
    id: 8,
    image: CategoryVegetarian,
    category: RECIPES_BY_CATEGORY.VEGETARIAN,
    title: 'Vegetarian',
  },
  {
    id: 9,
    image: CategoryDessert,
    category: RECIPES_BY_CATEGORY.DESSERT,
    title: 'Dessert',
  },
  {
    id: 10,
    image: CategoryDrinks,
    category: RECIPES_BY_CATEGORY.DRINKS,
    title: 'Drinks',
  },
];

const Categories = () => {
  return (
    <div className='pb-6'>
      <h2 className='text-xl mt-8 mb-3 font-semibold'>Category</h2>
      <CategoryList>
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </CategoryList>
    </div>
  );
};

export default Categories;
