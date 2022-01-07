import CategoryImage1 from '@img/landing-page.jfif';
import CategoryImage2 from '@img/splash-1.jfif';
import CategoryImage3 from '@img/splash-2.jfif';
import CategoryImage4 from '@img/splash-3.jfif';
import CategoryItem from '@components/Category/CategoryItem';

interface Categories {
  id: number;
  image: string;
  title: string;
}

const categories: Categories[] = [
  {
    id: 1,
    image: CategoryImage1,
    title: 'Seasonal',
  },
  {
    id: 2,
    image: CategoryImage2,
    title: 'Cakes',
  },
  {
    id: 3,
    image: CategoryImage3,
    title: 'Everyday',
  },
  {
    id: 4,
    image: CategoryImage4,
    title: 'Drinks',
  },
  {
    id: 5,
    image: CategoryImage1,
    title: 'Dessert',
  },
];

const Categories = () => {
  return (
    <>
      <h2 className='text-lg mt-8 font-medium'>Category</h2>
      <div className='overflow-x-auto flex scrollbar-none'>
        {categories.map((category) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </div>
    </>
  );
};

export default Categories;
