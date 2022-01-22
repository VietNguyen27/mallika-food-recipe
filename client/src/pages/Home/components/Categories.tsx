import { CategoryList, Category } from '@components/Category/Category';
import CategoryImage1 from '@img/landing-page.jfif';
import CategoryImage2 from '@img/splash-1.jfif';
import CategoryImage3 from '@img/splash-2.jfif';
import CategoryImage4 from '@img/splash-3.jfif';

interface CategoryType {
  id: number;
  image: string;
  category: string;
  title: string;
}

export const categories: CategoryType[] = [
  {
    id: 1,
    image: CategoryImage1,
    category: 'seasonal',
    title: 'Seasonal',
  },
  {
    id: 2,
    image: CategoryImage2,
    category: 'everyday',
    title: 'Everyday',
  },
  {
    id: 3,
    image: CategoryImage3,
    category: 'drinks',
    title: 'Drinks',
  },
  {
    id: 4,
    image: CategoryImage4,
    category: 'dessert',
    title: 'Dessert',
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
