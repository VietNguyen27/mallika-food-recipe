import CategoryImage1 from '@img/landing-page.jfif';
import CategoryImage2 from '@img/splash-1.jfif';
import CategoryImage3 from '@img/splash-2.jfif';
import CategoryImage4 from '@img/splash-3.jfif';
import CategoryItem from '@components/Category/CategoryItem';

interface Categories {
  image: string;
  title: string;
}

const categories: Categories[] = [
  {
    image: CategoryImage1,
    title: 'Seasonal',
  },
  {
    image: CategoryImage2,
    title: 'Cakes',
  },
  {
    image: CategoryImage3,
    title: 'Everyday',
  },
  {
    image: CategoryImage4,
    title: 'Drinks',
  },
  {
    image: CategoryImage1,
    title: 'Dessert',
  },
];

const Categories = () => {
  return (
    <>
      <h2 className='text-lg mt-8 font-medium'>Category</h2>
      <div className='overflow-x-auto flex scrollbar-none'>
        {categories.map((categoryItem) => (
          <CategoryItem {...categoryItem} />
        ))}
      </div>
    </>
  );
};

export default Categories;
